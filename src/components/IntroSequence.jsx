import { useEffect, useRef } from 'react'
import gsap from 'gsap'

// 首页开场序列（独立覆盖层）：落墨 → 题名 → 展卷
// - 覆盖在首页内容之上，播完整体淡出、交还首页（onDone）
// - 右上角"跳过"随时可点；8s 兜底强制结束，绝不卡在片头
// - 落墨直接复用首页 InkFluid 游走墨源的开局炸墨，不另起 WebGL 上下文
// - sessionStorage 记录，本会话不再重播
const INTRO_KEY = 'shx-intro-done'

export default function IntroSequence({ onDone }) {
  const rootRef = useRef(null)
  const doneRef = useRef(false)
  const finishRef = useRef(() => {})

  useEffect(() => {
    const finish = () => {
      if (doneRef.current) return
      doneRef.current = true
      sessionStorage.setItem(INTRO_KEY, '1')
      gsap.to(rootRef.current, { opacity: 0, duration: 0.6, ease: 'power1.out', onComplete: onDone })
    }
    finishRef.current = finish

    // 动效敏感用户：直接终态
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      finish()
      return
    }

    const root = rootRef.current
    const tl = gsap.timeline()
    // 题名逐字从墨里"洇"出来（模糊 → 清晰）
    tl.fromTo(
      root.querySelectorAll('.intro-char'),
      { opacity: 0, filter: 'blur(14px)', scale: 1.15 },
      { opacity: 1, filter: 'blur(0px)', scale: 1, duration: 1.0, stagger: 0.22, ease: 'power2.out' },
      0.4
    )
    // 朱印盖下：加速落下 + 微旋
    tl.fromTo(
      root.querySelector('.intro-seal'),
      { opacity: 0, scale: 1.8, rotate: -10 },
      { opacity: 1, scale: 1, rotate: -3, duration: 0.32, ease: 'power3.in' },
      2.2
    )
    // 副标题
    tl.fromTo(root.querySelector('.intro-tagline'), { opacity: 0 }, { opacity: 1, duration: 0.8, ease: 'power1.out' }, 2.9)
    // 跳过按钮提示
    tl.fromTo(root.querySelector('.intro-skip'), { opacity: 0 }, { opacity: 0.65, duration: 0.5 }, 1.0)
    // 收尾停留后交还首页
    tl.add(() => finishRef.current(), 4.8)

    const safety = setTimeout(() => finishRef.current(), 8000) // 兜底：动画异常也不白屏
    return () => {
      tl.kill()
      clearTimeout(safety)
    }
  }, [onDone])

  return (
    <div className="intro-seq" ref={rootRef}>
      <h1 className="intro-title">
        {'山海经'.split('').map((c, i) => (
          <span key={i} className="intro-char">
            {c}
          </span>
        ))}
      </h1>
      <span className="intro-seal">行旅</span>
      <p className="intro-tagline">五经滚动长卷 · 数字地理志</p>
      <button className="intro-skip" onClick={() => finishRef.current()}>
        跳过开场 →
      </button>
    </div>
  )
}
