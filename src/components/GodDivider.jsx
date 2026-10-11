import { useEffect, useRef, useState } from 'react'

// 山神转场：由本经进度 active 驱动浮现；finale 中以 compact 模式列出
export default function GodDivider({ god, compact = false, active = true }) {
  return (
    <div className={`god-divider ${active ? 'visible' : ''}`} style={compact ? { minHeight: 'auto' } : undefined}>
      {god.img ? (
        <img src={`${import.meta.env.BASE_URL}img/${god.img}`} alt={god.name} onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex' }} />
      ) : null}
      <div className="img-placeholder" style={god.img ? { display: 'none' } : undefined}>
        {god.name}像<br />待补
      </div>
      <div className="god-desc">{god.desc || god.name}</div>
      {god.note && <div className="finale-note" style={{ fontSize: '0.85rem' }}>{god.note}</div>}
    </div>
  )
}
