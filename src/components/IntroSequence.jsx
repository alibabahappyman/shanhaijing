import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { useLang } from '../i18n/LanguageContext.jsx'
import './IntroSequence.css'

const INTRO_KEY = 'shx-intro-done'

export default function IntroSequence({ onDone }) {
  const { t, lang } = useLang()
  const coverRef = useRef(null)
  const leavingRef = useRef(false)
  const [leaving, setLeaving] = useState(false)

  useEffect(() => {
    const cover = coverRef.current
    if (!cover || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const animation = gsap.timeline()
      .fromTo(cover.querySelector('.entrance-landscape'),
        { opacity: 0, scale: 1.045 },
        { opacity: 1, scale: 1, duration: 1.6, ease: 'power2.out' })
      .fromTo(cover.querySelector('.entrance-title-art'),
        { opacity: 0, clipPath: 'inset(0 0 100% 0)', y: 28 },
        { opacity: 1, clipPath: 'inset(0 0 0% 0)', y: 0, duration: 1.5, ease: 'power2.inOut' }, .35)
      .fromTo(cover.querySelectorAll('.entrance-meta, .entrance-copy, .entrance-actions, .entrance-editor-scroll'),
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: .65, stagger: .14, ease: 'power2.out' }, 1.05)

    return () => animation.kill()
  }, [])

  const enter = (immediate = false) => {
    if (leavingRef.current) return
    leavingRef.current = true
    setLeaving(true)
    sessionStorage.setItem(INTRO_KEY, '1')

    if (immediate || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      onDone()
      return
    }

    const cover = coverRef.current
    gsap.timeline({ onComplete: onDone })
      .to(cover.querySelector('.entrance-title-art'), { opacity: 0, y: -42, filter: 'blur(8px)', duration: .7, ease: 'power2.in' }, 0)
      .to(cover.querySelectorAll('.entrance-copy, .entrance-actions, .entrance-meta'), { opacity: 0, y: 18, duration: .35 }, 0)
      .to(cover.querySelector('.entrance-landscape'), { scale: 1.08, filter: 'blur(5px)', duration: .95, ease: 'power2.inOut' }, 0)
      .to(cover, { opacity: 0, duration: .5, ease: 'power1.out' }, .55)
  }

  return <section className={`entrance-cover${leaving ? ' is-leaving' : ''}`} ref={coverRef} aria-label={t({ zh: '山海经卷首封面', en: 'Classic of Mountains and Seas cover page' })}>
    <div className="entrance-landscape" aria-hidden="true" />
    <div className="entrance-grain" aria-hidden="true" />

    <header className="entrance-meta">
      <span>{t({ zh: '山海行卷', en: 'The Wandering Myth' })}</span>
      <span className="entrance-meta-right">{t({ zh: '卷首', en: 'Frontispiece' })} <i /> 001</span>
    </header>

    <div className="entrance-title-wrap">
      <h1 className="entrance-title-text">{t({ zh: '山海经', en: 'The Classic of Mountains and Seas' })}</h1>
      <img className="entrance-title-art" src="/assets/entrance/shanhai-brush-title-v1.png" alt="" aria-hidden="true" draggable="false" />
      <span className="entrance-title-seal" aria-hidden="true">山海<br />有灵</span>
    </div>

    <div className="entrance-copy">
      <span className="entrance-copy-number">{lang === 'en' ? 'THE CLASSIC OF MOUNTAINS AND SEAS · DIGITAL EDITION' : 'THE CLASSIC OF MOUNTAINS AND SEAS'}</span>
      <p>{lang === 'en'
        ? <>Follow the mountains, cross the four seas.<br />Within a single stroke of ink, all things are alive.</>
        : <>循山川，渡四海。<br />于一笔墨色间，见万物有灵。</>}</p>
    </div>

    <div className="entrance-actions">
      <button type="button" className="entrance-enter" onClick={() => enter()} aria-label={t({ zh: '进入山海总图', en: 'Enter the atlas of the Mountains and Seas' })}>
        <span>{t({ zh: '入山海', en: 'Enter the Realm' })}</span><span className="entrance-enter-arrow" aria-hidden="true">↗</span>
      </button>
      <button type="button" className="entrance-skip" onClick={() => enter(true)}>{t({ zh: '直接看总图', en: 'Skip to the Atlas' })} <span aria-hidden="true">→</span></button>
    </div>

    <Link className="entrance-editor-scroll" to="/editor-note" onClick={() => sessionStorage.setItem(INTRO_KEY, '1')} aria-label={t({ zh: '展开编者有话说，阅读卷首语', en: 'Unfold the Editor\'s Note and read the preface' })}>
      <span className="entrance-editor-rod" aria-hidden="true" />
      <span className="entrance-editor-paper"><span className="entrance-editor-closed">{t({ zh: '编者有话说', en: 'Editor\'s Note' })}</span><span className="entrance-editor-open">{lang === 'en' ? <>Editor's Note<small>Unfold to read ↗</small></> : <>序：我们在安全的现代，失去了什么？<small>展卷阅读 ↗</small></>}</span></span>
      <span className="entrance-editor-rod" aria-hidden="true" />
    </Link>

    <div className="entrance-footnote" aria-hidden="true"><span>{t({ zh: '山川为路 · 图卷为引', en: 'Mountains as Roads · Scrolls as Guides' })}</span><span>SHAN HAI JING</span></div>
  </section>
}
