import { useState } from 'react'
import { getMountainSpots } from '../data/mountainDiscoveries.js'
import { useLang } from '../i18n/LanguageContext.jsx'

// 画中景点光点（借鉴 CGTN《The Song Painted》）
// 每站若干暖白呼吸光点悬浮在实景图上，悬停/点按弹出一条原文小注。
// 与 BeastSpot（异兽图鉴，点按弹出大卡）分工：这里是轻量「博物馆讲解牌」。
export default function DetailSpots({ sceneId, volumeId, discoveries, selectedName, onSelect }) {
  const { t } = useLang()
  const spots = getMountainSpots(volumeId, sceneId, discoveries)
  const [open, setOpen] = useState(null) // 当前展开的下标
  const [visited, setVisited] = useState([])
  const reveal = (index) => {
    setOpen(index)
    setVisited((seen) => seen.includes(index) ? seen : [...seen, index])
  }

  if (!spots.length) return null

  return (
    <div className={`detail-spots${spots[0]?.anchor === 'art' ? ' art-anchored' : ''}`} aria-label={t({ zh: '画中详解', en: 'Painting details' })}>
      {spots.map((s, i) => {
        const flipX = s.x > 60 // 靠右的点卡片向左弹，避免出屏
        const flipY = s.y < 25 // 靠上的点卡片向下弹
        const label = t(s.label ?? (typeof s.name === 'string' ? { zh: s.name, en: s.name } : s.name))
        return (
          <div
            key={i}
            className="detail-spot"
            data-art-top={s.anchor === 'art' && s.y < 27 ? 'true' : undefined}
            style={{ left: `${s.x}%`, top: `${s.y}%` }}
            onPointerEnter={(event) => { if (event.pointerType === 'mouse') reveal(i) }}
            onPointerLeave={(event) => { if (event.pointerType === 'mouse') setOpen(null) }}
          >
            <button
              className={`detail-dot ${open === i || selectedName === s.name ? 'on' : ''} ${visited.includes(i) ? 'visited' : ''}`}
              aria-label={label}
              onFocus={() => reveal(i)}
              onBlur={() => setOpen(null)}
              onClick={() => { reveal(i); onSelect?.(s.name) }}
            >
              <span className="detail-dot-aura" aria-hidden />
              <span className="detail-dot-core" />
            </button>
            {open === i && (
              <div
                className={`detail-card ${flipX ? 'flip-x' : ''} ${flipY ? 'flip-y' : ''}`}
                role="note"
              >
                <p className="detail-card-name">{label}</p>
                <p className="detail-card-note">{t(s.note)}</p>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
