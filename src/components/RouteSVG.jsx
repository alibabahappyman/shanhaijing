import { useEffect, useRef, useState } from 'react'

// 路线 SVG：虚线随本经进度逐段"生长"，节点到达后点亮
export default function RouteSVG({ nodes, local }) {
  const wrapRef = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = wrapRef.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.15 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  if (!nodes?.length) return null

  // 视图框
  const xs = nodes.map((n) => n.x)
  const ys = nodes.map((n) => n.y)
  const pad = 60
  const minX = Math.min(...xs) - pad
  const minY = Math.min(...ys) - pad
  const w = Math.max(...xs) - minX + pad
  const h = Math.max(...ys) - minY + pad

  // 折线路径
  const d = nodes.map((n, i) => `${i === 0 ? 'M' : 'L'} ${n.x} ${n.y}`).join(' ')

  const pathRef = useRef(null)
  const [len, setLen] = useState(0)
  useEffect(() => {
    if (pathRef.current) setLen(pathRef.current.getTotalLength())
  }, [d])

  const shown = len * local
  const visitedCount = Math.floor(local * nodes.length + 0.35)

  return (
    <div ref={wrapRef} className={`route-wrap ${visible ? 'visible' : ''}`}>
      <svg viewBox={`${minX} ${minY} ${w} ${h}`}>
        <path ref={pathRef} className="route-path" d={d} />
        {len > 0 && (
          <path
            className="route-path traveled"
            d={d}
            strokeDasharray={len}
            strokeDashoffset={len - shown}
          />
        )}
        {nodes.map((n, i) => (
          <g key={n.name + i}>
            <circle cx={n.x} cy={n.y} r="5" className={`route-node ${i < visitedCount ? 'visited' : ''}`} />
            <text x={n.x} y={n.y - 14} textAnchor="middle" className={`node-label ${i < visitedCount ? 'visited' : ''}`}>
              {n.name}
            </text>
            {n.products && (
              <text x={n.x} y={n.y + 22} textAnchor="middle" className={`node-products ${i < visitedCount ? 'visited' : ''}`}>
                {n.products.map((p) => `·${p}`).join(' ')}
              </text>
            )}
          </g>
        ))}
      </svg>
    </div>
  )
}
