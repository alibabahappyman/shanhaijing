import { useEffect, useMemo, useRef, useState } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import gsap from 'gsap'
import MiniOverview from './MiniOverview.jsx'
import MapBackdrop, { nodeWorldX } from './MapBackdrop.jsx'
import ScenePanel from './ScenePanel.jsx'
import BeastSpot from './BeastSpot.jsx'
import DetailSpots from './DetailSpots.jsx'
import InkCursor from './InkCursor.jsx'
import GodDivider from './GodDivider.jsx'
import FinaleSeal from './FinaleSeal.jsx'
import ScrollMileage from './ScrollMileage.jsx'

gsap.registerPlugin(ScrollTrigger)

const STEP_VH = 220 // 每个场景站占用的原生滚动高度（滚一格翻一景的落定感）

export default function ScrollScroll({ data, meta, jingList }) {
  const stageRef = useRef(null)
  const [step, setStep] = useState(0) // 当前所在的站（浮点，用于插值）

  // 站点表：hero + 14 大场景 + finale
  // zoom 分站变焦：大场景贴近（2.5），站间过渡由插值自然产生呼吸感
  const stops = useMemo(() => {
    const list = []
    // hero：全景俯瞰整条山系
    const seg0 = data.segments[0]
    const n0 = seg0.nodes[0]
    list.push({ id: 'hero', type: 'hero', cam: { x: nodeWorldX(0, n0) + 1800, y: 350 }, zoom: 0.09, seg: 0, route: seg0.nodes.map(() => 0) })

    data.scenes.forEach((sc) => {
      const si = sc.seg
      const seg = data.segments[si]
      const idx = seg.nodes.findIndex((n) => n.name === sc.node)
      const node = seg.nodes[Math.max(0, idx)]
      // 该段路线生长到这个节点为止
      const route = data.segments.map((s, k) => {
        if (k < si) return 1
        if (k > si) return 0
        return Math.min(1, (Math.max(0, idx) + 0.5) / s.nodes.length)
      })
      list.push({
        id: sc.id,
        type: 'scene',
        scene: sc,
        segIndex: si,
        node,
        cam: { x: nodeWorldX(si, node), y: node.y },
        zoom: 1, // zoom 1 视野约 357 地图单位：一座山占满一屏
        route,
      })
    })

    const lastSeg = data.segments.length - 1
    const lastNode = data.segments[lastSeg].nodes[data.segments[lastSeg].nodes.length - 1]
    list.push({
      id: 'finale',
      type: 'finale',
      cam: { x: nodeWorldX(lastSeg, lastNode) + 1200, y: 350 },
      zoom: 0.24, // 尾屏拉远，全图尽收
      seg: lastSeg,
      route: data.segments.map(() => 1),
    })
    return list
  }, [data])

  // 原生滚动：pinned 舞台 + 手势驱动精准停靠
  // 不用 snap（快速滚动会跳站），改为劫持滚轮：一次手势 = 精确行进到上一站/下一站，
  // 补间滚动条位置，动画期间加锁丢弃后续手势（与 CGTN《千里江山图》同构）
  const stepRef = useRef(0) // 实时 step（供手势计算目标站）
  const animatingRef = useRef(false)

  useEffect(() => {
    const st = ScrollTrigger.create({
      trigger: stageRef.current,
      start: 'top top',
      end: () => `+=${stops.length * STEP_VH}%`,
      pin: true,
      scrub: 0.9,
      onUpdate: (self) => {
        const s = self.progress * (stops.length - 1)
        stepRef.current = s
        setStep(s)
      },
    })

    const n = stops.length - 1
    const goTo = (target) => {
      animatingRef.current = true
      const proxy = { y: window.scrollY }
      gsap.to(proxy, {
        y: st.start + (target / n) * (st.end - st.start),
        duration: 0.9,
        ease: 'power2.inOut',
        onUpdate: () => window.scrollTo({ top: proxy.y, behavior: 'instant' }),
        onComplete: () => (animatingRef.current = false),
      })
    }

    const onWheel = (e) => {
      // 不在舞台滚动区间内（如页首 hero 之前/页尾之后）不劫持
      if (window.scrollY < st.start - 2 || window.scrollY > st.end + 2) return
      e.preventDefault()
      if (animatingRef.current) return
      const dir = e.deltaY > 0 ? 1 : -1
      const target = Math.min(n, Math.max(0, Math.round(stepRef.current) + dir))
      if (target !== Math.round(stepRef.current)) goTo(target)
      else animatingRef.current = false
    }

    // 触屏：一次滑动 = 一站
    let touchY = null
    const onTouchStart = (e) => (touchY = e.touches[0].clientY)
    const onTouchEnd = (e) => {
      if (touchY == null) return
      const dy = touchY - e.changedTouches[0].clientY
      touchY = null
      if (Math.abs(dy) < 40 || animatingRef.current) return
      if (window.scrollY < st.start - 2 || window.scrollY > st.end + 2) return
      const dir = dy > 0 ? 1 : -1
      const target = Math.min(n, Math.max(0, Math.round(stepRef.current) + dir))
      if (target !== Math.round(stepRef.current)) goTo(target)
    }

    window.addEventListener('wheel', onWheel, { passive: false })
    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchend', onTouchEnd, { passive: true })
    return () => {
      st.kill()
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchend', onTouchEnd)
    }
  }, [stops])

  // 在相邻两站之间插值：相机 / zoom / 路线进度
  const i0 = Math.min(stops.length - 1, Math.floor(step))
  const i1 = Math.min(stops.length - 1, i0 + 1)
  const t = Math.min(1, Math.max(0, step - i0))
  const ease = t * t * (3 - 2 * t) // smoothstep
  const a = stops[i0]
  const b = stops[i1]
  const camX = a.cam.x + (b.cam.x - a.cam.x) * ease
  const camY = a.cam.y + (b.cam.y - a.cam.y) * ease
  const zoom = a.zoom + (b.zoom - a.zoom) * ease
  const routeProgress = a.route.map((v, k) => v + ((b.route[k] ?? v) - v) * ease)

  const activeSceneId = stops[Math.round(step)]?.type === 'scene' ? stops[Math.round(step)].id : null
  const nearest = stops[Math.round(step)]
  const segTitle = nearest?.type === 'scene' ? data.segments[nearest.segIndex].title : nearest?.type === 'finale' ? '终 · 归墟' : data.title

  // 墨晕过渡：翻站途中（t 0→1）墨薄膜浮起再散去，站心为 0
  const inkWash = Math.sin(Math.PI * t) * 0.5

  return (
    <div className="scroll-engine">
      {/* 原生滚动高度撑开区（pinned 舞台固定在视口） */}
      <div ref={stageRef} className="stage" style={{ height: '100vh', background: 'var(--paper)' }}>
        {/* 古地图底层（连续，随站行进） */}
        <MapBackdrop
          data={data}
          camX={camX}
          camY={camY}
          zoom={zoom}
          routeProgress={routeProgress}
          activeSeg={nearest?.segIndex ?? 0}
          sceneNode={nearest?.type === 'scene' ? { segIndex: nearest.segIndex, name: nearest.scene.node } : null}
        />

        {/* 站点内容层 */}
        <div className="scene-layer">
          {stops.map((s, i) => {
            if (s.type === 'hero') {
              const on = Math.round(step) === i
              return (
                <section key="hero" className={`scene-panel hero-scene ${on ? 'active' : ''}`}>
                  <h1 aria-label={data.title}>
                    {data.title.split('').map((c, i) => (
                      <span key={i} aria-hidden className="hero-char" style={{ transitionDelay: `${0.15 + i * 0.12}s` }}>
                        {c}
                      </span>
                    ))}
                  </h1>
                  <p className="tagline">{data.tagline}</p>
                  <p className="scroll-hint">滚动滚轮，向东行 →</p>
                </section>
              )
            }
            if (s.type === 'scene') {
              // 本站局部进度：站心 0，向前后两站 ±1（驱动题跋流动/显影）
              const local = Math.max(-1, Math.min(1, step - i))
              // 本站异兽图鉴数据（sc.beast 是兽 id，图鉴在 seg.beasts 里）
              const beast = s.scene.beast
                ? data.segments[s.segIndex].beasts?.find((b) => b.id === s.scene.beast)
                : null
              return (
                <>
                  <ScenePanel
                    key={s.id}
                    scene={s.scene}
                    seg={data.segments[s.segIndex]}
                    active={activeSceneId === s.id}
                    progress={local}
                  />
                  {beast && activeSceneId === s.id && <BeastSpot beast={beast} />}
                  {activeSceneId === s.id && <DetailSpots sceneId={s.id} />}
                </>
              )
            }
            // finale
            const on = Math.round(step) === i
            return (
              <section key="finale" className={`scene-panel finale-scene ${on ? 'active' : ''}`}>
                <div className="gods-row">
                  {data.finale.gods.map((g) => (
                    <GodDivider key={g.name} god={{ ...g, desc: g.name }} compact active />
                  ))}
                </div>
                <p className="finale-note">{data.finale.note}</p>
                <FinaleSeal />
                <p className="finale-note" style={{ fontSize: '0.8rem' }}>{data.finale.quote}</p>
                <button className="back-map" onClick={() => (window.location.hash = '#/')}>
                  返回五经
                </button>
              </section>
            )
          })}
        </div>

        {/* 墨晕过渡薄膜：翻站瞬间浮起，站心散去 */}
        <div className="ink-wash" style={{ opacity: inkWash }} aria-hidden />
        {/* 宣纸颗粒层：全局极轻噪点，让纸底有纤维毛感 */}
        <div className="paper-grain" aria-hidden />

        <MiniOverview jingList={jingList} activeId={meta.id} />
        <InkCursor />
        <ScrollMileage
          jingTitle={data.title}
          tagline={data.tagline}
          segTitle={segTitle}
          step={step}
          total={stops.length}
        />
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${(step / (stops.length - 1)) * 100}%` }} />
        </div>
      </div>
    </div>
  )
}
