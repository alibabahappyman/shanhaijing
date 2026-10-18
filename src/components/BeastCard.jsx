import { useEffect, useRef, useState } from 'react'

// 异兽图鉴卡：由本经进度 active 驱动浮现；无图时显示占位框
export default function BeastCard({ beast, active = false }) {
  return (
    <div className={`beast-entry-card ${active ? 'visible' : ''}`}>
      {beast.img ? (
        <img src={`${import.meta.env.BASE_URL}img/${beast.img}`} alt={beast.name} onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex' }} />
      ) : null}
      <div className="img-placeholder" style={beast.img ? { display: 'none' } : undefined}>
        {beast.name}图<br />待补
      </div>
      <div>
        <div className="beast-name">{beast.name}</div>
        <div className="beast-quote">{beast.quote}</div>
      </div>
    </div>
  )
}
