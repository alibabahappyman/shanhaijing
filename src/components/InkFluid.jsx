import { useEffect, useRef } from 'react'

// WebGL 水墨流体背景：Navier-Stokes 简化求解器 + 自主游走墨源
// 移植自单文件 demo；适配项目主题（纸色/墨色取自 global.css 变量）
// - 常驻背景模式：鼠标划过拖墨、点击炸墨花
// - burst(pos)：对外暴露的"强力注入"，供开场动画调用
// - 低性能设备 / prefers-reduced-motion：静默降级为静态纸底
export default function InkFluid({ opacity = 1, burstRef }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const gl = canvas.getContext('webgl2', { alpha: true, antialias: false })
    if (!gl) return // 不支持 WebGL2：直接不渲染，纸底由 CSS 兜底

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return

    const extColorBufferFloat = gl.getExtension('EXT_color_buffer_float')
    if (!extColorBufferFloat) {
      console.warn('InkFluid: 缺少浮点渲染扩展，水墨效果降级关闭')
      return
    }

    // ---- 主题色（与 global.css 对齐）----
    const PAPER = [0xef / 255, 0xe6 / 255, 0xd5 / 255] // --paper #efe6d5
    const INK = [0x3a / 255, 0x31 / 255, 0x28 / 255] // --ink   #3a3128

    // ==========================================
    // 着色器
    // ==========================================
    const baseVertexShader = `#version 300 es
    precision highp float;
    in vec2 aPosition;
    out vec2 vUv;
    out vec2 vL; out vec2 vR; out vec2 vT; out vec2 vB;
    uniform vec2 texelSize;
    void main() {
        vUv = aPosition * 0.5 + 0.5;
        vL = vUv - vec2(texelSize.x, 0.0);
        vR = vUv + vec2(texelSize.x, 0.0);
        vT = vUv + vec2(0.0, texelSize.y);
        vB = vUv - vec2(0.0, texelSize.y);
        gl_Position = vec4(aPosition, 0.0, 1.0);
    }`

    const header = `#version 300 es
    precision highp float;
    precision highp sampler2D;
    in vec2 vUv;
    in vec2 vL; in vec2 vR; in vec2 vT; in vec2 vB;
    out vec4 fragColor;`

    function compile(type, src) {
      const s = gl.createShader(type)
      gl.shaderSource(s, src)
      gl.compileShader(s)
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(s))
        return null
      }
      return s
    }

    function program(vs, fs) {
      const p = gl.createProgram()
      gl.attachShader(p, compile(gl.VERTEX_SHADER, vs))
      gl.attachShader(p, compile(gl.FRAGMENT_SHADER, fs))
      gl.linkProgram(p)
      const uniforms = {}
      const n = gl.getProgramParameter(p, gl.ACTIVE_UNIFORMS)
      for (let i = 0; i < n; i++) {
        const name = gl.getActiveUniform(p, i).name
        uniforms[name] = gl.getUniformLocation(p, name)
      }
      return { program: p, uniforms }
    }

    const clearProgram = program(baseVertexShader, `${header}
    uniform sampler2D uTexture; uniform float value;
    void main() { fragColor = value * texture(uTexture, vUv); }`)

    const splatProgram = program(baseVertexShader, `${header}
    uniform sampler2D uTarget; uniform float aspectRatio;
    uniform vec4 color; uniform vec2 point; uniform float radius;
    void main() {
        vec2 p = vUv - point; p.x *= aspectRatio;
        fragColor = texture(uTarget, vUv) + exp(-dot(p, p) / radius) * color;
    }`)

    const advectionProgram = program(baseVertexShader, `${header}
    uniform sampler2D uVelocity; uniform sampler2D uSource;
    uniform vec2 texelSize; uniform float dt; uniform float dissipation;
    void main() {
        vec2 coord = vUv - dt * texture(uVelocity, vUv).xy * texelSize;
        fragColor = dissipation * texture(uSource, coord);
    }`)

    const divergenceProgram = program(baseVertexShader, `${header}
    uniform sampler2D uVelocity;
    void main() {
        float L = texture(uVelocity, vL).x;
        float R = texture(uVelocity, vR).x;
        float T = texture(uVelocity, vT).y;
        float B = texture(uVelocity, vB).y;
        vec2 C = texture(uVelocity, vUv).xy;
        if (vL.x < 0.0) L = -C.x;
        if (vR.x > 1.0) R = -C.x;
        if (vT.y > 1.0) T = -C.y;
        if (vB.y < 0.0) B = -C.y;
        fragColor = vec4(0.5 * (R - L + T - B), 0.0, 0.0, 1.0);
    }`)

    const curlProgram = program(baseVertexShader, `${header}
    uniform sampler2D uVelocity;
    void main() {
        float L = texture(uVelocity, vL).y;
        float R = texture(uVelocity, vR).y;
        float T = texture(uVelocity, vT).x;
        float B = texture(uVelocity, vB).x;
        fragColor = vec4(0.5 * ((R - L) - (T - B)), 0.0, 0.0, 1.0);
    }`)

    const vorticityProgram = program(baseVertexShader, `${header}
    uniform sampler2D uVelocity; uniform sampler2D uCurl;
    uniform float curl; uniform float dt;
    void main() {
        float L = texture(uCurl, vL).x;
        float R = texture(uCurl, vR).x;
        float T = texture(uCurl, vT).x;
        float B = texture(uCurl, vB).x;
        float C = texture(uCurl, vUv).x;
        vec2 force = 0.5 * vec2(abs(T) - abs(B), abs(R) - abs(L));
        force /= length(force) + 1e-4;
        force *= curl * C; force.y *= -1.0;
        vec2 vel = texture(uVelocity, vUv).xy;
        vel += force * dt;
        vel = clamp(vel, -1000.0, 1000.0);
        fragColor = vec4(vel, 0.0, 1.0);
    }`)

    const pressureProgram = program(baseVertexShader, `${header}
    uniform sampler2D uPressure; uniform sampler2D uDivergence;
    void main() {
        float L = texture(uPressure, vL).x;
        float R = texture(uPressure, vR).x;
        float T = texture(uPressure, vT).x;
        float B = texture(uPressure, vB).x;
        float d = texture(uDivergence, vUv).x;
        fragColor = vec4((L + R + B + T - d) * 0.25, 0.0, 0.0, 1.0);
    }`)

    const gradientSubtractProgram = program(baseVertexShader, `${header}
    uniform sampler2D uPressure; uniform sampler2D uVelocity;
    void main() {
        float L = texture(uPressure, vL).x;
        float R = texture(uPressure, vR).x;
        float T = texture(uPressure, vT).x;
        float B = texture(uPressure, vB).x;
        vec2 vel = texture(uVelocity, vUv).xy;
        vel -= vec2(R - L, T - B);
        fragColor = vec4(vel, 0.0, 1.0);
    }`)

    // 输出合成：透明底（alpha 随墨量），叠在纸色页面上
    const renderProgram = program(baseVertexShader, `${header}
    uniform sampler2D uDye;
    uniform vec3 ink;
    uniform float gamma;
    uniform float shading;
    uniform float uInkAlpha;
    void main() {
        vec4 dye = texture(uDye, vUv);
        float alpha = clamp(dye.a, 0.0, 1.0);
        vec3 hue = dye.rgb / max(dye.a, 1e-4);
        vec3 col = mix(vec3(0.0), hue, pow(alpha, gamma));
        if (shading > 0.5) {
            float dx = texture(uDye, vR).a - texture(uDye, vL).a;
            float dy = texture(uDye, vT).a - texture(uDye, vB).a;
            col -= clamp(length(vec2(dx, dy)) * 2.2, 0.0, 1.0) * 0.06;
        }
        // 墨越浓越实；alpha 上限压住，稀薄处透出纸色，避免淤成实心黑块
        fragColor = vec4(col, pow(alpha, gamma * 0.8) * uInkAlpha);
    }`)

    // ==========================================
    // 全屏 quad
    // ==========================================
    const renderQuad = (() => {
      gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer())
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, -1, 1, 1, 1, 1, -1]), gl.STATIC_DRAW)
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, gl.createBuffer())
      gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array([0, 1, 2, 0, 2, 3]), gl.STATIC_DRAW)
      gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0)
      gl.enableVertexAttribArray(0)
      return (targetFBO) => {
        gl.bindFramebuffer(gl.FRAMEBUFFER, targetFBO ? targetFBO.fbo : null)
        gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0)
      }
    })()

    // ==========================================
    // FBO
    // ==========================================
    function createFBO(w, h, internalFormat, format, type, filter) {
      gl.activeTexture(gl.TEXTURE0)
      const texture = gl.createTexture()
      gl.bindTexture(gl.TEXTURE_2D, texture)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, filter)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, filter)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
      gl.texImage2D(gl.TEXTURE_2D, 0, internalFormat, w, h, 0, format, type, null)
      const fbo = gl.createFramebuffer()
      gl.bindFramebuffer(gl.FRAMEBUFFER, fbo)
      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0)
      gl.viewport(0, 0, w, h)
      return {
        texture, fbo, w, h,
        attach(unit) {
          gl.activeTexture(gl.TEXTURE0 + unit)
          gl.bindTexture(gl.TEXTURE_2D, texture)
          return unit
        },
      }
    }

    function createDoubleFBO(w, h, internalFormat, format, type, filter) {
      let a = createFBO(w, h, internalFormat, format, type, filter)
      let b = createFBO(w, h, internalFormat, format, type, filter)
      return {
        get read() { return a },
        set read(v) { a = v },
        get write() { return b },
        set write(v) { b = v },
        swap() { const t = a; a = b; b = t },
      }
    }

    const config = {
      SIM_RESOLUTION: 128, // 背景用，比 demo 256 再低一档省电
      DYE_RESOLUTION: 512,
      DENSITY_DISSIPATION: 0.965, // 墨消散更快，不淤成大黑块
      VELOCITY_DISSIPATION: 0.95,
      PRESSURE_ITERATIONS: 16,
      CURL: 22,
      INK_SIZE: 0.0012, // 笔触细一圈
      INK_SPEED: 0.0005,
      AGENT_TURNING_STRENGTH: 0.01,
      AGENT_FORCE_MULTIPLIER: 1800, // 推力收敛，拖尾不糊成一片
      PERSISTENT_INK_COUNT: 1,
      SHADING: 0.8,
      GAMMA: 1.1, // 提伽马：中低浓度压暗变慢，淡墨更多层次
      INK_ALPHA: 0.55, // 整体不透明度上限：背景墨要透出纸色
    }

    let densityFBO, velocityFBO, divergenceFBO, curlFBO, pressureFBO

    function initFramebuffers() {
      const t = gl.HALF_FLOAT
      densityFBO = createDoubleFBO(config.DYE_RESOLUTION, config.DYE_RESOLUTION, gl.RGBA16F, gl.RGBA, t, gl.LINEAR)
      velocityFBO = createDoubleFBO(config.SIM_RESOLUTION, config.SIM_RESOLUTION, gl.RG16F, gl.RG, t, gl.LINEAR)
      divergenceFBO = createFBO(config.SIM_RESOLUTION, config.SIM_RESOLUTION, gl.R16F, gl.RED, t, gl.NEAREST)
      curlFBO = createFBO(config.SIM_RESOLUTION, config.SIM_RESOLUTION, gl.R16F, gl.RED, t, gl.NEAREST)
      pressureFBO = createDoubleFBO(config.SIM_RESOLUTION, config.SIM_RESOLUTION, gl.R16F, gl.RED, t, gl.NEAREST)
    }

    function resize(force) {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
      const w = Math.floor(canvas.clientWidth * dpr)
      const h = Math.floor(canvas.clientHeight * dpr)
      if (force || canvas.width !== w || canvas.height !== h) {
        canvas.width = w
        canvas.height = h
        initFramebuffers()
      }
    }

    // 墨色：主题墨色 + 每次随机深浅
    function inkColor() {
      const f = 0.7 + Math.random() * 0.45
      return [Math.min(1, INK[0] * f), Math.min(1, INK[1] * f), Math.min(1, INK[2] * f)]
    }

    // ==========================================
    // 交互 / 自主墨源
    // ==========================================
    function splat(x, y, dx, dy, color, radius = config.INK_SIZE) {
      gl.viewport(0, 0, config.SIM_RESOLUTION, config.SIM_RESOLUTION)
      gl.useProgram(splatProgram.program)
      gl.uniform1i(splatProgram.uniforms.uTarget, velocityFBO.read.attach(0))
      gl.uniform1f(splatProgram.uniforms.aspectRatio, canvas.width / canvas.height)
      gl.uniform2f(splatProgram.uniforms.point, x, y)
      gl.uniform4f(splatProgram.uniforms.color, dx, dy, 0.0, 1.0)
      gl.uniform1f(splatProgram.uniforms.radius, radius)
      renderQuad(velocityFBO.write)
      velocityFBO.swap()

      gl.viewport(0, 0, config.DYE_RESOLUTION, config.DYE_RESOLUTION)
      gl.uniform1i(splatProgram.uniforms.uTarget, densityFBO.read.attach(0))
      gl.uniform4f(splatProgram.uniforms.color, color[0], color[1], color[2], 1.0)
      renderQuad(densityFBO.write)
      densityFBO.swap()
    }

    // 强力注入：中心浓墨 + 八方向冲击（开场落墨 / 点击炸墨）
    // 背景模式下收敛用量，墨花小而透，不糊屏
    function injectBurst(x, y, color) {
      splat(x, y, 0, 0, [color[0] * 1.6, color[1] * 1.6, color[2] * 1.6], 0.0035)
      splat(x, y, 0, 0, color, 0.008)
      const force = 7000
      for (let i = 0; i < 8; i++) {
        const a = (i / 8) * Math.PI * 2 + Math.random() * 0.2
        splat(x, y, Math.cos(a) * force, Math.sin(a) * force, color, 0.005)
      }
    }

    class InkAgent {
      constructor() {
        this.x = 0.5
        this.y = 0.62
        this.angle = Math.random() * Math.PI * 2
        this.angularVelocity = 0
        this.color = inkColor()
        this.prevX = this.x
        this.prevY = this.y
        this.inject()
      }
      inject() { injectBurst(this.x, this.y, this.color) }
      update() {
        const speed = config.INK_SPEED * (0.8 + Math.random() * 0.4)
        this.angularVelocity += (Math.random() - 0.5) * config.AGENT_TURNING_STRENGTH
        this.angularVelocity *= 0.92
        this.angle += this.angularVelocity
        this.prevX = this.x; this.prevY = this.y
        this.x += Math.cos(this.angle) * speed
        this.y += Math.sin(this.angle) * speed
        const m = 0.08
        if (this.x < m || this.x > 1 - m) { this.angle = Math.PI - this.angle; this.x = Math.max(m, Math.min(1 - m, this.x)) }
        if (this.y < m || this.y > 1 - m) { this.angle = -this.angle; this.y = Math.max(m, Math.min(1 - m, this.y)) }
        splat(this.x, this.y, (this.x - this.prevX) * config.AGENT_FORCE_MULTIPLIER, (this.y - this.prevY) * config.AGENT_FORCE_MULTIPLIER, this.color, config.INK_SIZE)
      }
    }

    let agents = []

    // ==========================================
    // 主循环
    // ==========================================
    let rafId = 0
    let lastTime = Date.now()
    let running = true

    function frame() {
      if (!running) return
      resize()
      const now = Date.now()
      const dt = Math.min((now - lastTime) / 1000, 0.016)
      lastTime = now

      agents.forEach((a) => a.update())

      gl.viewport(0, 0, config.SIM_RESOLUTION, config.SIM_RESOLUTION)

      gl.useProgram(curlProgram.program)
      gl.uniform2f(curlProgram.uniforms.texelSize, 1 / config.SIM_RESOLUTION, 1 / config.SIM_RESOLUTION)
      gl.uniform1i(curlProgram.uniforms.uVelocity, velocityFBO.read.attach(0))
      renderQuad(curlFBO)

      gl.useProgram(vorticityProgram.program)
      gl.uniform2f(vorticityProgram.uniforms.texelSize, 1 / config.SIM_RESOLUTION, 1 / config.SIM_RESOLUTION)
      gl.uniform1i(vorticityProgram.uniforms.uVelocity, velocityFBO.read.attach(0))
      gl.uniform1i(vorticityProgram.uniforms.uCurl, curlFBO.attach(1))
      gl.uniform1f(vorticityProgram.uniforms.curl, config.CURL)
      gl.uniform1f(vorticityProgram.uniforms.dt, dt)
      renderQuad(velocityFBO.write)
      velocityFBO.swap()

      gl.useProgram(divergenceProgram.program)
      gl.uniform2f(divergenceProgram.uniforms.texelSize, 1 / config.SIM_RESOLUTION, 1 / config.SIM_RESOLUTION)
      gl.uniform1i(divergenceProgram.uniforms.uVelocity, velocityFBO.read.attach(0))
      renderQuad(divergenceFBO)

      gl.useProgram(clearProgram.program)
      gl.uniform1i(clearProgram.uniforms.uTexture, pressureFBO.read.attach(0))
      gl.uniform1f(clearProgram.uniforms.value, 0.8)
      renderQuad(pressureFBO.write)
      pressureFBO.swap()

      gl.useProgram(pressureProgram.program)
      gl.uniform2f(pressureProgram.uniforms.texelSize, 1 / config.SIM_RESOLUTION, 1 / config.SIM_RESOLUTION)
      gl.uniform1i(pressureProgram.uniforms.uDivergence, divergenceFBO.attach(0))
      for (let i = 0; i < config.PRESSURE_ITERATIONS; i++) {
        gl.uniform1i(pressureProgram.uniforms.uPressure, pressureFBO.read.attach(1))
        renderQuad(pressureFBO.write)
        pressureFBO.swap()
      }

      gl.useProgram(gradientSubtractProgram.program)
      gl.uniform2f(gradientSubtractProgram.uniforms.texelSize, 1 / config.SIM_RESOLUTION, 1 / config.SIM_RESOLUTION)
      gl.uniform1i(gradientSubtractProgram.uniforms.uPressure, pressureFBO.read.attach(0))
      gl.uniform1i(gradientSubtractProgram.uniforms.uVelocity, velocityFBO.read.attach(1))
      renderQuad(velocityFBO.write)
      velocityFBO.swap()

      gl.useProgram(advectionProgram.program)
      gl.uniform2f(advectionProgram.uniforms.texelSize, 1 / config.SIM_RESOLUTION, 1 / config.SIM_RESOLUTION)
      gl.uniform1i(advectionProgram.uniforms.uVelocity, velocityFBO.read.attach(0))
      gl.uniform1i(advectionProgram.uniforms.uSource, velocityFBO.read.attach(0))
      gl.uniform1f(advectionProgram.uniforms.dt, dt)
      gl.uniform1f(advectionProgram.uniforms.dissipation, config.VELOCITY_DISSIPATION)
      renderQuad(velocityFBO.write)
      velocityFBO.swap()

      gl.viewport(0, 0, config.DYE_RESOLUTION, config.DYE_RESOLUTION)
      gl.useProgram(advectionProgram.program)
      gl.uniform2f(advectionProgram.uniforms.texelSize, 1 / config.SIM_RESOLUTION, 1 / config.SIM_RESOLUTION)
      gl.uniform1i(advectionProgram.uniforms.uVelocity, velocityFBO.read.attach(0))
      gl.uniform1i(advectionProgram.uniforms.uSource, densityFBO.read.attach(1))
      gl.uniform1f(advectionProgram.uniforms.dt, dt)
      gl.uniform1f(advectionProgram.uniforms.dissipation, config.DENSITY_DISSIPATION)
      renderQuad(densityFBO.write)
      densityFBO.swap()

      gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight)
      gl.useProgram(renderProgram.program)
      gl.uniform2f(renderProgram.uniforms.texelSize, 1 / gl.drawingBufferWidth, 1 / gl.drawingBufferHeight)
      gl.uniform1i(renderProgram.uniforms.uDye, densityFBO.read.attach(0))
      gl.uniform3fv(renderProgram.uniforms.ink, INK)
      gl.uniform1f(renderProgram.uniforms.gamma, config.GAMMA)
      gl.uniform1f(renderProgram.uniforms.shading, config.SHADING)
      gl.uniform1f(renderProgram.uniforms.uInkAlpha, config.INK_ALPHA)
      renderQuad(null)

      rafId = requestAnimationFrame(frame)
    }

    // ==========================================
    // 指针交互
    // ==========================================
    const pointer = { x: 0, y: 0, color: inkColor() }
    let firstMove = true

    function toUv(cx, cy) {
      const r = canvas.getBoundingClientRect()
      return [(cx - r.left) / r.width, 1 - (cy - r.top) / r.height]
    }

    function onMove(e) {
      const [x, y] = toUv(e.clientX, e.clientY)
      const dx = (x - pointer.x) * 5000
      const dy = (y - pointer.y) * 5000
      const first = firstMove
      pointer.x = x; pointer.y = y
      firstMove = false
      if (first || Math.abs(dx) > 0 || Math.abs(dy) > 0) {
        splat(x, y, dx, dy, pointer.color, config.INK_SIZE * 1.5)
      }
    }

    function onDown(e) {
      pointer.color = inkColor()
      const [x, y] = toUv(e.clientX, e.clientY)
      injectBurst(x, y, pointer.color)
    }

    function onTouch(e) {
      if (e.touches[0]) onMove(e.touches[0])
    }

    // 页面切走暂停，回来恢复（省电）
    function onVisibility() {
      if (document.hidden) {
        running = false
        cancelAnimationFrame(rafId)
      } else if (!running) {
        running = true
        lastTime = Date.now()
        rafId = requestAnimationFrame(frame)
      }
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mousedown', onDown)
    window.addEventListener('touchmove', onTouch, { passive: true })
    document.addEventListener('visibilitychange', onVisibility)

    // 启动（force：首帧 canvas 尺寸还没布局好时 FBO 可能未初始化，强制建一次）
    resize(true)
    if (burstRef) burstRef.current = (x = 0.5, y = 0.62, fresh = true) => {
      const c = fresh ? inkColor() : agents[0]?.color || inkColor()
      injectBurst(x, y, c)
    }
    agents = [new InkAgent()]
    rafId = requestAnimationFrame(frame)

    // 卸载清理
    return () => {
      running = false
      cancelAnimationFrame(rafId)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('touchmove', onTouch)
      document.removeEventListener('visibilitychange', onVisibility)
      if (burstRef) burstRef.current = null
      // WebGL 资源随上下文销毁；显式丢弃引用
      densityFBO = velocityFBO = divergenceFBO = curlFBO = pressureFBO = null
    }
  }, [burstRef])

  return <canvas ref={canvasRef} className="ink-fluid" aria-hidden style={{ opacity }} />
}
