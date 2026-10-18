import { useCallback, useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { Link } from 'react-router-dom'
import { EXHIBITION, paintingUrl } from '../data/exhibition.js'
import { SPOTS } from '../data/spots.js'
import ExhibitionDialog from './ExhibitionDialog.jsx'
import JourneyMap from './JourneyMap.jsx'
import DetailSpots from './DetailSpots.jsx'
import InkCursor from './InkCursor.jsx'
import { useLang } from '../i18n/LanguageContext.jsx'
import '../styles/exhibition.css'

const pad = (value) => String(value).padStart(2, '0')
// These files are served from public; importing them would duplicate the large GIFs in dist.
const availableBeasts = new Set('boyu changshe congcong dangkang dashe duyu ershu gaigai heluo heyu huangniao jingjing jingwei juzu lingling paoxiao qiuyu shanyu songsi tianma xiegou yayu yuhu zhujian zhuru'.split(' '))

function beastImage(beast) {
  return beast?.img && availableBeasts.has(beast.id)
    ? `${import.meta.env.BASE_URL}img/${beast.img}`
    : null
}

function BeastIllustration({ beast }) {
  const [failed, setFailed] = useState(false)
  const src = beastImage(beast)
  return <div className="sh-beast-illustration">{src && !failed
    ? <img src={src} alt={beast.name} onError={() => setFailed(true)} />
    : <span className="sh-beast-calligraphy">{beast.name}</span>}</div>
}

function Painting({ src, alt, children, eager = false }) {
  const ref = useRef(null)
  const [near, setNear] = useState(eager)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setNear(entry.isIntersecting), { rootMargin: '100% 0px' })
    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div className="sh-painting" ref={ref}>
      {near && !failed && <img src={src} alt={alt} width="1280" height="720" decoding="async" fetchpriority={eager ? 'high' : 'auto'} onError={() => setFailed(true)} />}
      {failed && <p className="sh-painting-error">山景暂未载入，请稍后刷新</p>}
      {children}
    </div>
  )
}

function RouteFlight({ data, flight }) {
  const last = data.scenes.length
  const t = flight.t
  const label = (index) => index === 0 ? '开卷' : index > last ? '收卷' : data.scenes[index - 1].node

  return (
    <div className={`sh-route-flight sh-route-flight--${data.id}`} style={{ opacity: Math.min(1, t * 6, (1 - t) * 6) }} aria-hidden>
      <JourneyMap data={data} sections={EXHIBITION[data.id].sections} from={flight.from} to={flight.to} progress={t} />
      <div className="sh-flight-label"><span>山行 · {flight.to > flight.from ? '前行' : '回望'}</span><p>{label(flight.from)}<i>→</i>{label(flight.to)}</p></div>
    </div>
  )
}

export default function ScrollExhibition({ data, jingList }) {
  const { t } = useLang()
  const sections = useRef([])
  const [active, setActive] = useState(0)
  const activeRef = useRef(0)
  const tweenRef = useRef(null)
  const navigationPending = useRef(false)
  const modalOpenRef = useRef(false)
  const [flight, setFlight] = useState(null)
  const [modal, setModal] = useState(null)
  const [quiet, setQuiet] = useState(false)
  const presentation = EXHIBITION[data.id]
  const total = data.scenes.length
  // 继续游历的目标：本卷之后第一个已开放的山经，到头则绕回第一个非本卷的开放卷
  const afterSelf = jingList.slice(jingList.findIndex((jing) => jing.id === data.id) + 1).filter((jing) => jing.ready)
  const nextJing = afterSelf[0] || jingList.find((jing) => jing.ready && jing.id !== data.id)
  const currentScene = data.scenes[active - 1]
  const currentSegment = currentScene ? currentScene.seg : active > total ? data.segments.length - 1 : 0
  modalOpenRef.current = Boolean(modal)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
    const previousTitle = document.title
    document.title = `${data.title} · 山海经画中游`
    let frame = 0
    const update = () => {
      frame = 0
      let index = 0
      sections.current.forEach((section, i) => {
        if (section && section.getBoundingClientRect().top <= window.innerHeight * 0.45) index = i
      })
      if (!tweenRef.current) activeRef.current = index
      setActive(index)
    }
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update) }
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    update()
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      tweenRef.current?.kill()
      document.title = previousTitle
    }
  }, [data.title])

  const goTo = useCallback((index) => {
    navigationPending.current = true
    setModal(null)
    // Let a closing modal restore the document's scrollability before navigating.
    requestAnimationFrame(() => {
      const target = sections.current[index]
      if (!target) {
        navigationPending.current = false
        return
      }
      const from = activeRef.current
      const destination = target.offsetTop
      tweenRef.current?.kill()
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (reduced || from === index) {
        window.scrollTo(0, destination)
        activeRef.current = index
        setActive(index)
        setFlight(null)
        tweenRef.current = null
        navigationPending.current = false
        return
      }
      const proxy = { y: window.scrollY, t: 0 }
      setFlight({ from, to: index, t: 0 })
      tweenRef.current = gsap.to(proxy, {
        y: destination,
        t: 1,
        duration: 1.15,
        ease: 'power2.inOut',
        onUpdate: () => {
          window.scrollTo(0, proxy.y)
          setFlight({ from, to: index, t: proxy.t })
        },
        onComplete: () => {
          tweenRef.current = null
          activeRef.current = index
          setActive(index)
          setFlight(null)
          navigationPending.current = false
        },
      })
    })
  }, [])

  useEffect(() => {
    const onWheel = (event) => {
      if (modalOpenRef.current || event.ctrlKey || Math.abs(event.deltaX) > Math.abs(event.deltaY) || Math.abs(event.deltaY) < 2) return
      event.preventDefault()
      if (navigationPending.current || tweenRef.current) return
      const next = Math.max(0, Math.min(total + 1, activeRef.current + Math.sign(event.deltaY)))
      if (next !== activeRef.current) goTo(next)
    }
    const onKeyDown = (event) => {
      if (modalOpenRef.current || (event.target instanceof Element && event.target.closest('input,textarea,select,[contenteditable="true"]'))) return
      const direction = ['ArrowDown', 'PageDown'].includes(event.key) ? 1 : ['ArrowUp', 'PageUp'].includes(event.key) ? -1 : 0
      if (!direction) return
      event.preventDefault()
      if (navigationPending.current || tweenRef.current) return
      const next = Math.max(0, Math.min(total + 1, activeRef.current + direction))
      if (next !== activeRef.current) goTo(next)
    }
    window.addEventListener('wheel', onWheel, { passive: false })
    window.addEventListener('keydown', onKeyDown)
    return () => {
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [goTo, total])

  const openBeast = (beast, scene) => setModal({ kind: 'beast', title: beast.name, beast, scene })

  return (
    <main className={`sh-exhibition ${quiet ? 'sh-is-quiet' : ''}`} style={{ '--sh-accent': data.id === 'beishan' ? '#526a63' : '#9d4939' }}>
      <a className="sh-skip" href="#sh-scene-0">跳过开卷，开始阅读</a>
      <header className="sh-header">
        <Link to="/" className="sh-brand" aria-label="返回五经首页"><span className="sh-seal">山海</span><span>山海经<span className="sh-brand-sub">数字山水长卷</span></span></Link>
        <div className="sh-header-center"><span>{presentation.label}</span><i />{data.title}</div>
        <div className="sh-header-actions">
          <button onClick={() => setQuiet(!quiet)} aria-pressed={quiet}>{quiet ? '显示题跋' : '只看山水'}</button>
          <button className="sh-menu-button" onClick={() => setModal({ kind: 'contents', title: '山行目录' })}><span className="sh-menu-icon" aria-hidden />目录</button>
        </div>
      </header>

      <section className="sh-cover" ref={(node) => { sections.current[0] = node }} aria-labelledby="sh-cover-title">
        <div className="sh-cover-art"><Painting src={paintingUrl(data.id, data.scenes[0].id)} alt={`${data.title}开卷山景`} eager /></div>
        <div className="sh-cover-copy">
          <p className="sh-eyebrow">山海经 · 五经游历</p>
          <h1 id="sh-cover-title">{data.title}</h1>
          <p className="sh-cover-tagline">{data.tagline}</p>
          <p className="sh-cover-intro">{t(presentation.intro)}</p>
          <button className="sh-enter" onClick={() => goTo(1)}>展卷入山 <span aria-hidden>↗</span></button>
        </div>
        <div className="sh-cover-caption"><span>以山为序，以水为引</span><i />{pad(total)} 幅山景 · {data.segments.length} 段旅程</div>
        <span className="sh-margin-note" aria-hidden>一卷山海 · 万物有灵</span>
      </section>

      {data.scenes.map((scene, index) => {
        const settings = presentation.scenes[scene.id] || {}
        const side = settings.side || scene.side || 'left'
        const segment = data.segments[scene.seg]
        const beast = settings.beast === null ? null : segment.beasts?.find((item) => item.id === (settings.beast || scene.beast))
        const point = settings.point || (side === 'right' ? [35, 68] : [65, 68])
        const quote = scene.quote.split('——')[0]
        const source = scene.quote.split('——')[1] || '《山海经》'
        const shortQuote = quote.length > 46 ? `${quote.slice(0, 44).replace(/[，。；、]$/, '')}……` : quote
        const isActive = active === index + 1
        return (
          <section key={scene.id} id={`sh-scene-${index}`} className={`sh-scene sh-scene--${side} ${isActive ? 'sh-active' : ''}`} ref={(node) => { sections.current[index + 1] = node }} aria-labelledby={`sh-title-${scene.id}`}>
            <div className="sh-scene-frame">
              <div className="sh-scene-art">
                <Painting src={paintingUrl(data.id, scene.id)} alt={`${scene.node}山水画景`}>
                  {isActive && <DetailSpots sceneId={scene.id} />}
                  {beast && <button className="sh-beast-point" style={{ left: `${point[0]}%`, top: `${point[1]}%` }} onClick={() => openBeast(beast, scene)} aria-label={`查看异兽${beast.name}`}><span className="sh-point-ring" aria-hidden /><span className="sh-point-label">{beast.name}<small>识异兽 ＋</small></span></button>}
                </Painting>
              </div>
              <div className="sh-scene-copy">
                <p className="sh-scene-kicker"><span>{pad(index + 1)}</span><i />{segment.title}</p>
                <h2 id={`sh-title-${scene.id}`} className={scene.node.length > 4 ? 'sh-long-title' : undefined}>{scene.node}</h2>
                <p className="sh-scene-lead">{settings.lead}</p>
                <div className="sh-quote-block"><span className="sh-small-seal" aria-hidden>山志</span><p>{shortQuote}</p></div>
                <p className="sh-quote-source">{source}</p>
                <button className="sh-read-button" onClick={() => setModal({ kind: 'reading', title: scene.node, scene, beast })}>读此山 <span aria-hidden>＋</span></button>
              </div>
              <div className="sh-scene-footnote"><span>{scene.title.split('·')[1]?.trim() || '山行手记'}</span><i /><p>{settings.caption}</p></div>
              <span className="sh-scene-folio" aria-hidden>{pad(index + 1)}<i />{pad(total)}</span>
            </div>
          </section>
        )
      })}

      <section className="sh-finale" ref={(node) => { sections.current[total + 1] = node }} aria-labelledby="sh-finale-title">
        <p className="sh-eyebrow">{data.title} · 收卷</p>
        <span className="sh-end-seal" aria-hidden>山海<br />未尽</span>
        <h2 id="sh-finale-title">{presentation.closing}</h2>
        <p>{presentation.closingNote}</p>
        <p className="sh-source-note">经文原句依各站出处标注；白话导读据对应原文整理。</p>
        <div className="sh-finale-actions"><button onClick={() => goTo(0)}>重读此卷 ↗</button>{nextJing && <Link to={`/scroll/${nextJing.id}`}>继续游历 · {nextJing.name} →</Link>}</div>
        <div className="sh-end-stats"><span>{pad(total)}<small>幅山景</small></span><i /><span>{pad(data.segments.length)}<small>段旅程</small></span></div>
      </section>

      <nav className="sh-journey" aria-label="长卷行进导航">
        <div className="sh-current"><span>{active === 0 ? '序' : active > total ? '终' : pad(active)}</span><div>{currentScene?.node || (active === 0 ? '开卷' : '收卷')}<small>{data.title}</small></div></div>
        <div className="sh-chapters">{data.segments.map((segment, index) => <button key={segment.title} className={index === currentSegment ? 'sh-selected' : ''} aria-current={index === currentSegment ? 'step' : undefined} onClick={() => goTo(data.scenes.findIndex((scene) => scene.seg === index) + 1)}><span>{pad(index + 1)}</span>{segment.title.split('·').pop().trim()}</button>)}</div>
        <div className="sh-step-controls"><button aria-label="上一景" disabled={active === 0} onClick={() => goTo(active - 1)}>←</button><span>{active === 0 ? '向下滚动，展开山海' : active > total ? '此卷已毕' : `${pad(active)} / ${pad(total)}`}</span><button aria-label="下一景" disabled={active > total} onClick={() => goTo(active + 1)}>→</button></div>
        <div className="sh-progress" style={{ transform: `scaleX(${active / (total + 1)})` }} />
      </nav>

      {flight && <RouteFlight data={data} flight={flight} />}
      <InkCursor />

      {modal && <ExhibitionDialog title={modal.title} kind={modal.kind} onClose={() => setModal(null)}>
        {modal.kind === 'contents' && <>
          <div className="sh-volume-links">{jingList.map((jing) => jing.ready ? <Link key={jing.id} to={`/scroll/${jing.id}`} aria-current={jing.id === data.id ? 'page' : undefined} onClick={() => setModal(null)}>{jing.name}</Link> : <span key={jing.id}>{jing.name} · 待展</span>)}</div>
          <div className="sh-contents">{data.segments.map((segment, segIndex) => <div key={segment.title}><h3>{segment.title}</h3>{data.scenes.map((scene, i) => scene.seg === segIndex && <button key={scene.id} onClick={() => goTo(i + 1)} aria-current={active === i + 1 ? 'location' : undefined}><span>{pad(i + 1)}</span>{scene.node}<small>↗</small></button>)}</div>)}</div>
        </>}
        {modal.kind === 'reading' && <div className="sh-reading"><p className="sh-eyebrow">经文原句 · {modal.scene.quote.split('——')[1] || '《山海经》'}</p><blockquote>{modal.scene.quote.split('——')[0]}</blockquote><p className="sh-eyebrow">白话导读</p><p>{t(presentation.scenes[modal.scene.id]?.guide)}</p>{modal.beast && <button className="sh-read-button" onClick={() => openBeast(modal.beast, modal.scene)}>认识此山异兽 · {modal.beast.name} ↗</button>}{(SPOTS[modal.scene.id] || []).length > 0 && <><p className="sh-eyebrow">画中注释</p><div className="sh-notes">{SPOTS[modal.scene.id].map((spot) => <div key={typeof spot.name === 'string' ? spot.name : spot.name.zh}><h3>{t(spot.name)}</h3><p>{t(spot.note)}</p></div>)}</div></>}</div>}
        {modal.kind === 'beast' && <div className="sh-beast-detail"><BeastIllustration key={modal.beast.id} beast={modal.beast} /><div className="sh-beast-description"><p className="sh-eyebrow">遇于 · {modal.scene.node}</p><blockquote>{modal.beast.quote}</blockquote><p className="sh-beast-source">{data.title} · 异兽手记</p></div></div>}
      </ExhibitionDialog>}
    </main>
  )
}
