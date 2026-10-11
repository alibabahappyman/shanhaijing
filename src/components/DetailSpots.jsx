import { useState } from 'react'
import { SPOTS } from '../data/spots.js'

// 画中景点光点（借鉴 CGTN《The Song Painted》）
// 每站若干暖白呼吸光点悬浮在实景图上，悬停/点按弹出一条原文小注。
// 与 BeastSpot（异兽图鉴，点按弹出大卡）分工：这里是轻量「博物馆讲解牌」。
export default function DetailSpots({ sceneId }) {
  const spots = SPOTS[sceneId] || []
  const [open, setOpen] = useState(null) // 当前展开的下标

  if (!spots.length) return null

  return (
    <div className="detail-spots" aria-label="画中详解">
      {spots.map((s, i) => {
        const flipX = s.x > 60 // 靠右的点卡片向左弹，避免出屏
        const flipY = s.y < 25 // 靠上的点卡片向下弹
        return (
          <div
            key={i}
            className="detail-spot"
            style={{ left: `${s.x}%`, top: `${s.y}%` }}
            onMouseEnter={() => setOpen(i)}
            onMouseLeave={() => setOpen(null)}
          >
            <button
              className={`detail-dot ${open === i ? 'on' : ''}`}
              aria-label={s.name}
              onFocus={() => setOpen(i)}
              onBlur={() => setOpen(null)}
              onClick={() => setOpen(open === i ? null : i)}
            >
              <span className="detail-dot-core" />
            </button>
            {open === i && (
              <div
                className={`detail-card ${flipX ? 'flip-x' : ''} ${flipY ? 'flip-y' : ''}`}
                role="note"
              >
                <p className="detail-card-name">{s.name}</p>
                <p className="detail-card-note">{s.note}</p>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
