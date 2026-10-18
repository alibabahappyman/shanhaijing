import { useEffect, useRef, useState } from 'react'
import { useLang } from '../i18n/LanguageContext.jsx'
import { Link } from 'react-router-dom'
import RuArrow from './RuArrow.jsx'
import './ScrollHeader.css'

export default function ScrollHeader({ current, jingList, isCover, chapter, bestiaryReturn }) {
  const { t, lang } = useLang()
  const [open, setOpen] = useState(false)
  const navRef = useRef(null)

  useEffect(() => {
    if (!open) return undefined
    const close = (event) => {
      if (event.key === 'Escape' || (event.type === 'pointerdown' && !navRef.current?.contains(event.target))) setOpen(false)
    }
    document.addEventListener('pointerdown', close)
    document.addEventListener('keydown', close)
    return () => {
      document.removeEventListener('pointerdown', close)
      document.removeEventListener('keydown', close)
    }
  }, [open])

  return (
    <header className={`scroll-header scroll-header--${current.id}${isCover ? ' scroll-header--cover' : ''}`} ref={navRef}>
      {bestiaryReturn?.type && (
        <Link className="scroll-header-back scroll-header-bailing ru-link-back" to={`/bestiary?type=${bestiaryReturn.type}${bestiaryReturn.beast ? `&beast=${bestiaryReturn.beast}` : ''}`} aria-label={lang === 'en' ? 'Back to the Bestiary' : '返回山海百灵'}>
          <RuArrow dir="left" /><span>{lang === 'en' ? 'Bestiary' : '返回山海百灵'}</span>
        </Link>
      )}
      <Link className="scroll-header-back ru-link-back" to="/" aria-label={lang === 'en' ? 'Back to the overview' : '返回五经总览'}>
        <RuArrow dir="left" /><span>{lang === 'en' ? 'Overview' : '返回总览'}</span>
      </Link>
      <div className="scroll-header-center">
        <div className="scroll-header-brand" aria-label={lang === 'en' ? `Shan Hai Jing, ${t(current.name)}` : `山海经，${current.name}`}>
          <span>{lang === 'en' ? 'Shan Hai Jing' : '山海经'}</span><i aria-hidden>·</i><strong>{t(current.name)}</strong>
          {!isCover && chapter && <small>{chapter}</small>}
        </div>
        <span className="scroll-header-mobile-seal" aria-hidden>山海</span>
      </div>
      <div className="scroll-header-volume">
        <button className="scroll-header-select" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-controls="scroll-header-menu">
          <span>{lang === 'en' ? 'Classics' : '切换山经'}</span>
          <span className={`scroll-header-chevron${open ? ' is-open' : ''}`} aria-hidden>⌄</span>
        </button>
        {open && (
          <nav className="scroll-header-menu" id="scroll-header-menu" aria-label={lang === 'en' ? 'Choose a classic' : '选择山经'}>
            <p>{lang === 'en' ? 'The Five Classics' : '五经目录'}</p>
            {jingList.map((jing) => jing.ready ? (
              <Link key={jing.id} to={`/scroll/${jing.id}`} className={jing.id === current.id ? 'is-current' : ''} aria-current={jing.id === current.id ? 'page' : undefined} onClick={() => setOpen(false)}>
                <span>{t(jing.name)}</span><small>{t(jing.tagline)}</small>
              </Link>
            ) : (
              <span key={jing.id} className="is-locked"><span>{t(jing.name)}</span><small>{lang === 'en' ? 'Coming soon' : '待开放'}</small></span>
            ))}
          </nav>
        )}
      </div>
    </header>
  )
}
