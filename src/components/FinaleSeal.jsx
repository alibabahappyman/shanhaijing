import { useEffect, useRef, useState } from 'react'

// 朱砂钤印：finale 滚动到位时盖下（GSAP once 时间线）
// 三段：顿落(scale 1.6→1, 快) → 回弹微震 → 印泥墨渍晕开(opacity 扩散)
// feTurbulence 做旧印缘；prefers-reduced-motion 直接落定不播动画
export default function FinaleSeal({ text = '山海经' }) {
  const sealRef = useRef(null)
  const [stained, setStained] = useState(false)

  useEffect(() => {
    const el = sealRef.current
    if (!el) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      el.classList.add('seal-stamped')
      setStained(true)
      return
    }
    let tween
    import('gsap').then(({ default: gsap }) => {
      const tl = gsap.timeline({ paused: true })
      tl.fromTo(
        el,
        { scale: 1.7, opacity: 0, rotation: -7 },
        { scale: 1, opacity: 1, rotation: -3, duration: 0.38, ease: 'power3.in' } // 顿落
      )
        .to(el, { scale: 1.06, duration: 0.12, ease: 'power2.out' }) // 回弹
        .to(el, { scale: 1, duration: 0.2, ease: 'power2.inOut' })
        .call(() => setStained(true)) // 墨渍晕开
      tl.play(0)
    })
    return () => tween?.kill()
  }, [])

  return (
    <div className="finale-seal-wrap" aria-hidden>
      <svg ref={sealRef} className="finale-seal" viewBox="0 0 120 120">
        <filter id="seal-rough">
          <feTurbulence type="fractalNoise" baseFrequency="0.09" numOctaves="3" seed="7" result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="4" />
        </filter>
        <g filter="url(#seal-rough)">
          <rect x="8" y="8" width="104" height="104" rx="10" fill="none" stroke="var(--accent)" strokeWidth="7" />
          {[0, 1, 2].map((r) =>
            [0, 1, 2].map((c) => (
              <text
                key={`${r}${c}`}
                x={26 + c * 34}
                y={46 + r * 34}
                fontSize="30"
                fontWeight="700"
                fill="var(--accent)"
                textAnchor="middle"
                fontFamily="inherit"
              >
                {text[r * 3 + c] || ''}
              </text>
            ))
          )}
        </g>
      </svg>
      {/* 墨渍：盖印后从印缘向外晕开 */}
      <span className={`finale-seal-stain ${stained ? 'on' : ''}`} aria-hidden />
    </div>
  )
}
