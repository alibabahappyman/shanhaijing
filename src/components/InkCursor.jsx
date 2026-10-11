import { useEffect, useRef } from 'react'

// 墨圈自定义光标：墨点跟随，可交互元素上放大成圈
// 仿 chinesestudent.com 的 GlobalCursor，全站通用（挂在页面根部）
export default function InkCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    // 触屏设备不启用
    if (window.matchMedia('(hover: none)').matches) return

    const pos = { x: -100, y: -100 }
    const ring = { x: -100, y: -100 } // 圈用缓动追随，墨感
    let raf = 0

    const onMove = (e) => {
      pos.x = e.clientX
      pos.y = e.clientY
      const t = e.target
      const interactive = t.closest && t.closest('a, button, .beast-spot, [role="dialog"]')
      ringRef.current?.classList.toggle('is-hover', !!interactive)
    }

    const tick = () => {
      ring.x += (pos.x - ring.x) * 0.16
      ring.y += (pos.y - ring.y) * 0.16
      if (dotRef.current) dotRef.current.style.transform = `translate(${pos.x}px, ${pos.y}px)`
      if (ringRef.current) ringRef.current.style.transform = `translate(${ring.x}px, ${ring.y}px)`
      raf = requestAnimationFrame(tick)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    raf = requestAnimationFrame(tick)
    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div className="ink-cursor" aria-hidden>
      <div ref={ringRef} className="ink-cursor-ring" />
      <div ref={dotRef} className="ink-cursor-dot" />
    </div>
  )
}
