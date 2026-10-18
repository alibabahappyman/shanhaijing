import { useState } from 'react'
import { useLang } from '../i18n/LanguageContext.jsx'
import './MountainDiscoveries.css'

export default function MountainDiscoveries({ scene, items, side, selectedName, onSelect, onOpenJournal, onOpenBeast }) {
  const { t, lang } = useLang()
  const [mobileOpen, setMobileOpen] = useState(false)
  const selected = items.find((item) => item.name === selectedName) || items[0]
  if (!items.length) return null

  const nodeLabel = t({ zh: scene.node, en: scene.node }) // node 暂无英文，中文回退
  const count = String(items.length).padStart(2, '0')

  return (
    <aside className={`mountain-discoveries mountain-discoveries--${side} ${mobileOpen ? 'is-open' : ''}`} aria-label={t({ zh: `${scene.node}山中所见`, en: `In the Mountains · ${nodeLabel}` })}>
      <button className="mountain-discoveries-mobile-toggle" type="button" aria-expanded={mobileOpen} onClick={() => setMobileOpen((open) => !open)}>
        <span>{t({ zh: '山中所见', en: 'In the Mountains' })}</span><small>{lang === 'en' ? `${items.length} entries` : `${count} 则`}</small><b aria-hidden>{mobileOpen ? '−' : '+'}</b>
      </button>
      <div className="mountain-discoveries-body">
        <header className="mountain-discoveries-heading">
          <span className="mountain-discoveries-seal" aria-hidden>见</span>
          <div><small>{nodeLabel} · {t({ zh: '行山札记', en: 'Trail Notes' })}</small><h3>{t({ zh: '山中所见', en: 'In the Mountains' })}</h3></div>
          <span className="mountain-discoveries-count">{count}</span>
        </header>
        <div className="mountain-discoveries-list">
          {items.map((item, index) => (
            <button
              type="button"
              key={item.name}
              className={`mountain-discoveries-item ${selected?.name === item.name ? 'is-selected' : ''}`}
              onClick={() => onSelect(item.name)}
              aria-current={selected?.name === item.name ? 'true' : undefined}
            >
              <span className="mountain-discoveries-number">{String(index + 1).padStart(2, '0')}</span>
              <span className="mountain-discoveries-name">{t(item.label ?? { zh: item.name, en: item.name })}</span>
              <span className="mountain-discoveries-kind">{t(item.kind)}</span>
              <span className="mountain-discoveries-mark" aria-hidden>{item.inPicture ? '◇' : '·'}</span>
            </button>
          ))}
        </div>
        {selected && <section className="mountain-discoveries-detail" aria-live="polite">
          <div className="mountain-discoveries-detail-top"><span>{t(selected.source)}</span><i /></div>
          <strong>{t(selected.label ?? { zh: selected.name, en: selected.name })}</strong>
          <p>{t(selected.note)}</p>
          {selected.beastItem && <button type="button" onClick={onOpenBeast}>{t({ zh: '详看异兽图鉴 ↗', en: 'Beast compendium ↗' })}</button>}
          {!selected.beastItem && selected.inPicture && <small>{t({ zh: '◇ 画中光点可寻', en: '◇ Find the marks in the painting' })}</small>}
        </section>}
        <button type="button" className="mountain-discoveries-journal" onClick={onOpenJournal}>{t({ zh: '展开整页山志', en: 'Open the full journal' })} <span aria-hidden>↗</span></button>
      </div>
    </aside>
  )
}
