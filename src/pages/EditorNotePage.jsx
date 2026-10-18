import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { EDITOR_NOTE } from '../data/editorNote.js'
import { useLang } from '../i18n/LanguageContext.jsx'
import RuArrow from '../components/RuArrow.jsx'
import './EditorNotePage.css'

const INTRO_KEY = 'shx-intro-done'

export default function EditorNotePage() {
  const { t, lang } = useLang()
  const viewportRef = useRef(null)
  const dragRef = useRef(null)
  const hoveringRef = useRef(false)
  const pauseUntilRef = useRef(0)
  const [mode, setMode] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'manual' : 'auto')
  const [hovering, setHovering] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [progress, setProgress] = useState(0)
  const [atEnd, setAtEnd] = useState(false)

  const isVertical = () => window.matchMedia('(max-width: 760px)').matches
  const maxScroll = (node, vertical) => vertical ? node.scrollHeight - node.clientHeight : node.scrollWidth - node.clientWidth

  useLayoutEffect(() => {
    const node = viewportRef.current
    if (node && !isVertical()) node.scrollLeft = Math.max(0, maxScroll(node, false))
  }, [])

  const updatePosition = () => {
    const node = viewportRef.current
    if (!node) return
    const vertical = isVertical()
    const amount = vertical ? node.scrollTop : node.scrollLeft
    const max = Math.max(1, maxScroll(node, vertical))
    setProgress(Math.min(100, Math.round((vertical ? amount : max - amount) / max * 100)))
    setAtEnd(vertical ? amount >= max - 3 : amount <= 3)
    const folios = [...node.querySelectorAll('.editor-folio')]
    const closest = folios.reduce((best, folio, index) => {
      const distance = Math.abs((vertical ? folio.offsetTop : folio.offsetLeft + folio.offsetWidth - node.clientWidth) - amount)
      return distance < best.distance ? { index, distance } : best
    }, { index: 0, distance: Infinity })
    setCurrentIndex(closest.index)
  }

  useEffect(() => {
    document.title = lang === 'en' ? 'Editor’s Note · The Wandering Myth' : '编者有话说 · 山海行卷'
    const onResize = () => updatePosition()
    window.addEventListener('resize', onResize)
    updatePosition()
    return () => window.removeEventListener('resize', onResize)
  }, [lang])

  useEffect(() => {
    if (mode !== 'auto') return
    let frame
    let previous = performance.now()
    let virtualPosition = null
    const advance = (now) => {
      const node = viewportRef.current
      if (!node) return
      const elapsed = Math.min(48, now - previous)
      previous = now
      const vertical = isVertical()
      const position = vertical ? node.scrollTop : node.scrollLeft
      if (virtualPosition === null) virtualPosition = position
      if (!hoveringRef.current && !dragRef.current && now > pauseUntilRef.current && !document.hidden) {
        const max = maxScroll(node, vertical)
        virtualPosition = vertical
          ? Math.min(max, virtualPosition + elapsed * .011)
          : Math.max(0, virtualPosition - elapsed * .015)
        if (vertical) node.scrollTop = virtualPosition
        else node.scrollLeft = virtualPosition
      } else virtualPosition = position
      frame = requestAnimationFrame(advance)
    }
    frame = requestAnimationFrame(advance)
    return () => cancelAnimationFrame(frame)
  }, [mode])

  useEffect(() => {
    const node = viewportRef.current
    if (!node) return
    const onWheel = (event) => {
      pauseUntilRef.current = performance.now() + 5000
      if (isVertical()) return
      event.preventDefault()
      node.scrollLeft -= event.deltaY + event.deltaX
    }
    node.addEventListener('wheel', onWheel, { passive: false })
    return () => node.removeEventListener('wheel', onWheel)
  }, [])

  const turnTo = (index) => {
    const node = viewportRef.current
    const folio = node?.querySelectorAll('.editor-folio')[index]
    if (!node || !folio) return
    pauseUntilRef.current = performance.now() + 6500
    node.scrollTo(isVertical()
      ? { top: folio.offsetTop, behavior: 'smooth' }
      : { left: folio.offsetLeft + folio.offsetWidth - node.clientWidth, behavior: 'smooth' })
  }

  const startDrag = (event, roller = false) => {
    if (event.pointerType !== 'mouse' || event.button !== 0) return
    if (!roller && event.target.closest('p, h1, h2, blockquote, a, button')) return
    const node = viewportRef.current
    if (!node) return
    dragRef.current = { x: event.clientX, y: event.clientY, left: node.scrollLeft, top: node.scrollTop, roller }
    pauseUntilRef.current = performance.now() + 6500
    event.currentTarget.setPointerCapture(event.pointerId)
  }

  const moveDrag = (event) => {
    const drag = dragRef.current
    const node = viewportRef.current
    if (!drag || !node) return
    if (isVertical()) node.scrollTop = drag.top + (event.clientY - drag.y) * (drag.roller ? 1.4 : -1.4)
    else node.scrollLeft = drag.left + (event.clientX - drag.x) * (drag.roller === 'start' ? 1.4 : -1.4)
  }

  const stopDrag = () => { dragRef.current = null }
  const changeMode = (next) => {
    pauseUntilRef.current = performance.now() + 900
    setMode(next)
  }
  const enterAtlas = () => sessionStorage.setItem(INTRO_KEY, '1')

  const current = EDITOR_NOTE[currentIndex]

  return <main className={`editor-page editor-page--${mode}`}>
    <header className="editor-header">
      <Link to="/" onClick={enterAtlas} className="editor-back ru-link-back"><RuArrow dir="left" /> <span>{lang === 'en' ? 'Back to the Atlas' : '返回山海总图'}</span></Link>
      <div className="editor-brand"><span className="editor-brand-seal">山<br />海</span><span>{lang === 'en' ? 'Frontispiece · Editor’s Note' : '卷首 · 编者有话说'}</span></div>
      <div className="editor-mode" role="group" aria-label={lang === 'en' ? 'Scrolling mode' : '展卷方式'}>
        <button type="button" className={mode === 'auto' ? 'is-active' : ''} onClick={() => changeMode('auto')} aria-pressed={mode === 'auto'}>{lang === 'en' ? 'Auto-scroll' : '自展卷'}</button>
        <button type="button" className={mode === 'manual' ? 'is-active' : ''} onClick={() => changeMode('manual')} aria-pressed={mode === 'manual'}>{lang === 'en' ? 'Manual' : '手展卷'}</button>
      </div>
    </header>

    <div className="editor-stage">
      <div className="editor-roller editor-roller--start" aria-hidden="true" onPointerDown={(event) => startDrag(event, 'start')} onPointerMove={moveDrag} onPointerUp={stopDrag} onPointerCancel={stopDrag}><i/><span/></div>
      <div className="editor-roll-window" ref={viewportRef} tabIndex={0} aria-label={lang === 'en' ? 'Full editor’s note; read by wheel or dragging the scroll' : '编者有话说全文，滚轮或拖动卷轴阅读'} onScroll={updatePosition}
        onMouseEnter={() => { hoveringRef.current = true; setHovering(true) }} onMouseLeave={() => { hoveringRef.current = false; setHovering(false) }}
        onTouchStart={() => { pauseUntilRef.current = performance.now() + 6000 }}
        onPointerDown={startDrag} onPointerMove={moveDrag} onPointerUp={stopDrag} onPointerCancel={stopDrag}>
        <div className="editor-roll-track">
          {EDITOR_NOTE.map((chapter, index) => <section className={`editor-folio editor-folio--${chapter.id}`} key={chapter.id} aria-labelledby={`editor-title-${chapter.id}`}>
            <div className="editor-folio-art" aria-hidden="true" />
            <div className="editor-folio-head"><span>{lang === 'en' ? 'The Wandering Myth' : '山海行卷'}</span><span>{String(index + 1).padStart(2, '0')} / 05</span></div>
            <div className="editor-folio-body">
              <div className="editor-chapter-mark" aria-hidden="true">{t(chapter.mark)}</div>
              <div className="editor-chapter-content">
                <div className="editor-chapter-heading">
                  <h1 id={`editor-title-${chapter.id}`}>{lang === 'en'
                    ? <span className="editor-title-part">{chapter.title.en}</span>
                    : chapter.title.zh.split('，').map((part, partIndex) => <span className="editor-title-part" key={partIndex}>{part}{partIndex === 0 ? '，' : ''}</span>)}</h1>
                  <span className="editor-chapter-kicker"><span className="editor-chapter-kicker-en">{index === 0 ? 'PROLOGUE' : index === 4 ? 'EPILOGUE' : `ACT ${index}` } · </span>{t(chapter.aside)}</span>
                </div>
                <div className="editor-folio-text">{chapter.paragraphs.map((paragraph, paragraphIndex) => t(paragraph).startsWith(lang === 'en' ? '“It is shaped' : '“其状如X')
                  ? <blockquote key={paragraphIndex}>{t(paragraph)}</blockquote>
                  : <p key={paragraphIndex}>{t(paragraph)}</p>)}</div>
                {chapter.closing && <div className="editor-closing"><p>{t(chapter.closing)}</p><Link to="/" onClick={enterAtlas} className="ru-link-fwd">{lang === 'en' ? <>Enter the Atlas · Open the Map <RuArrow dir="up-right" /></> : <>入山海 · 展开总图 <RuArrow dir="up-right" /></>}</Link></div>}
              </div>
            </div>
            <div className="editor-folio-tail" aria-hidden="true">{index === 4 ? (lang === 'en' ? 'The End' : '卷终') : (lang === 'en' ? 'Scroll on' : '展卷续读')} <span>◇</span></div>
          </section>)}
        </div>
      </div>
      <div className="editor-roller editor-roller--end" aria-hidden="true" onPointerDown={(event) => startDrag(event, 'end')} onPointerMove={moveDrag} onPointerUp={stopDrag} onPointerCancel={stopDrag}><i/><span/></div>
    </div>

    <footer className="editor-footer">
      <div className="editor-reading-state" aria-live="polite"><span>{lang === 'en'
        ? (mode === 'manual' ? 'Manual scroll · Drag the scroll or use the wheel' : atEnd ? 'You have reached the end' : hovering ? 'Paused on hover · Move away to resume' : 'Auto-scrolling · Take over any time')
        : (mode === 'manual' ? '手展卷 · 拖动卷面或滚轮阅读' : atEnd ? '卷末已至' : hovering ? '悬停暂停 · 移开继续' : '自展卷中 · 随时可接管')}</span><small>{t(current.mark)} · {t(current.title)}</small></div>
      <div className="editor-chapter-nav"><button type="button" onClick={() => turnTo(Math.max(0, currentIndex - 1))} disabled={currentIndex === 0} aria-label={lang === 'en' ? 'Previous act' : '上一幕'}><span className="editor-nav-arrow--horizontal">→</span><span className="editor-nav-arrow--vertical">↑</span></button><span>{String(currentIndex + 1).padStart(2, '0')} / 05</span><button type="button" onClick={() => turnTo(Math.min(4, currentIndex + 1))} disabled={currentIndex === 4} aria-label={lang === 'en' ? 'Next act' : '下一幕'}><span className="editor-nav-arrow--horizontal">←</span><span className="editor-nav-arrow--vertical">↓</span></button></div>
      <div className="editor-progress"><input type="range" min="0" max="100" value={progress} aria-label={lang === 'en' ? 'Reading progress' : '阅读进度'} onChange={(event) => { const node = viewportRef.current; if (!node) return; pauseUntilRef.current = performance.now() + 6500; const vertical = isVertical(); const max = maxScroll(node, vertical); node[vertical ? 'scrollTop' : 'scrollLeft'] = (vertical ? max : -max) * Number(event.target.value) / 100 + (vertical ? 0 : max) }} style={{ '--progress': `${progress}%` }} /><span>{progress}%</span></div>
    </footer>
  </main>
}
