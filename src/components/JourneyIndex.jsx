import { useEffect, useState } from 'react'
import { useLang } from '../i18n/LanguageContext.jsx'
import './JourneyIndex.css'

export default function JourneyIndex({ scenes, current, onNavigate, enVolume }) {
  const { lang } = useLang()
  const en = lang === 'en'
  const [open, setOpen] = useState(false)
  const sceneIndex = Math.max(0, Math.min(scenes.length - 1, current - 1))
  // 英文站名与山志/山行图一致：取 scrollEn 场景题名「山名 · 英文题」的前半
  const nodeName = (scene) => (en ? (enVolume?.scenes?.[scene.id]?.title?.split(' · ')[0] || scene.node) : scene.node)
  const label = current > scenes.length ? (en ? 'Close the scroll' : '收卷') : nodeName(scenes[sceneIndex] || scenes[0])

  useEffect(() => { if (current === 0) setOpen(false) }, [current])

  useEffect(() => {
    if (!open) return undefined
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [open])

  const choose = (index) => {
    setOpen(false)
    onNavigate(index)
  }

  return (
    <nav className={`journey-index${open ? ' is-open' : ''}${current === 0 ? ' is-cover' : ''}`} aria-label={en ? 'Mountain journey index' : '山行目录'}>
      {open && (
        <div className="journey-index-sheet" id="journey-index-sheet">
          <div className="journey-index-heading">
            <span>{en ? 'Range Atlas' : '山行图录'}</span>
            <small>{en ? 'Follow the range · tap to go' : '循山而行 · 点击前往'}</small>
          </div>
          <div className="journey-index-list">
            <button className={current === 0 ? 'is-current' : ''} onClick={() => choose(0)} aria-current={current === 0 ? 'step' : undefined}>
              <span className="journey-index-no">{en ? 'Pro' : '序'}</span><span>{en ? 'Open the scroll' : '开卷'}</span>
            </button>
            {scenes.map((scene, index) => (
              <button key={scene.id} className={current === index + 1 ? 'is-current' : ''} onClick={() => choose(index + 1)} aria-current={current === index + 1 ? 'step' : undefined}>
                <span className="journey-index-no">{String(index + 1).padStart(2, '0')}</span><span>{nodeName(scene)}</span>
              </button>
            ))}
            <button className={current === scenes.length + 1 ? 'is-current' : ''} onClick={() => choose(scenes.length + 1)} aria-current={current === scenes.length + 1 ? 'step' : undefined}>
              <span className="journey-index-no">{en ? 'Fin' : '终'}</span><span>{en ? 'Close the scroll' : '收卷'}</span>
            </button>
          </div>
        </div>
      )}
      <button className="journey-index-toggle" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-controls="journey-index-sheet">
        <span className="journey-index-glyph" aria-hidden>山</span>
        <span className="journey-index-current"><strong>{en ? 'Journey Index' : '山行目录'}</strong><small>{String(Math.min(current, scenes.length)).padStart(2, '0')} / {String(scenes.length).padStart(2, '0')} · {label}</small></span>
        <span className="journey-index-action" aria-hidden>{open ? '−' : '+'}</span>
      </button>
    </nav>
  )
}
