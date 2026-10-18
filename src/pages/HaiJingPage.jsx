import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { chaptersFor } from '../data/haiJing.js'
import { gazetteerFor, GAZETTEER_TABS } from '../data/haiGazetteer.js'
import { HAI_GALLERIES } from '../data/haiGalleries.js'
import HaiEntryOrnament from '../components/HaiEntryOrnament.jsx'
import { useLang } from '../i18n/LanguageContext.jsx'
import RuArrow from '../components/RuArrow.jsx'
import './HaiJingPage.css'
import './HaiJingRefinement.css'
import './HaiChapterNav.css'

const RITUALS = {
  haiwainan: { action: { zh: '引风展羽', en: 'Summon the Wind' }, hint: { zh: '风起，羽影越过海面', en: 'The wind rises; feathered shadows cross the sea' }, mark: '羽', steps: 3 },
  haiwaixi: { action: { zh: '转动铜轮', en: 'Turn the Bronze Wheel' }, hint: { zh: '铜轮转动，西海的机巧苏醒', en: 'The wheel turns; the devices of the western sea awaken' }, mark: '轮', steps: 3 },
  haiwaibei: { action: { zh: '开目见昼', en: 'Open the Eye of Day' }, hint: { zh: '烛阴开目，寒海由夜入昼', en: 'Zhuyin opens his eyes; the cold sea turns from night to day' }, mark: '昼', steps: 1 },
  haiwaidong: { action: { zh: '拨开海雾', en: 'Part the Sea Fog' }, hint: { zh: '雾散，东海异国渐次显形', en: 'The fog lifts; the strange kingdoms of the eastern sea take shape' }, mark: '雾', steps: 3 },
  haineinan: { action: { zh: '生长建木', en: 'Grow the Jianmu Tree' }, hint: { zh: '枝脉生长，通向南土地标', en: 'Boughs reach out toward the landmarks of the south' }, mark: '木', steps: 3 },
  haineixi: { action: { zh: '开启昆仑门', en: 'Open the Gates of Kunlun' }, hint: { zh: '山门开启，群峰深处显现', en: 'The mountain gates open; the depths among the peaks appear' }, mark: '门', steps: 1 },
  haineibei: { action: { zh: '拓印兽纹', en: 'Rub the Beast Rubbing' }, hint: { zh: '青铜兽纹在北境岩面显现', en: 'Bronze beast motifs emerge on the northern rock face' }, mark: '纹', steps: 3 },
  haineidong: { action: { zh: '引三江入海', en: 'Guide the Three Rivers to Sea' }, hint: { zh: '三道水脉次第汇流', en: 'Three waterways converge one after another' }, mark: '水', steps: 3 },
}
// 站点类型的双语文案：数据里保留中文作为稳定字段。
const KIND_EN = {
  异国: 'Strange Lands', 异物: 'Strange Things', 异兽: 'Strange Beasts',
  神话人物: 'Mythic Figures', 神灵: 'Deities', 海神: 'Sea Gods',
  神木: 'Divine Trees', 守护者: 'Guardians', 神山: 'Sacred Mountains',
  水系: 'Waterways', 古迹: 'Ancient Sites',
}
const ART_FOCUS = {
  haiwainan: [0, 100, 100, 45], haiwaixi: [0, 55, 0, 100],
  haiwaibei: [0, 100, 55, 100], haiwaidong: [100, 0, 100, 0],
  haineinan: [30, 0, 100, 80], haineixi: [50, 0, 100, 85],
  haineibei: [100, 0, 0, 100], haineidong: [0, 0, 25, 80],
}
const HAI_FRAME_MOTIFS = {
  '奢比尸': 'motif-shebishi.png',
  '大幽国': 'motif-dayou.png',
  '月支国': 'motif-yuezhi.png',
  '岷三江': 'motif-minjiang.png',
  '琅邪台': 'motif-langye.png',
}
// 这五站只有一张裁成圆形的图腾，直接嵌进圆形印记展示。
const CIRCULAR_EMBLEM_SITES = new Set(['岷三江', '月支国', '琅邪台', '奢比尸', '大幽国'])

export default function HaiJingPage() {
  const { realm: routeRealm } = useParams()
  const { lang, t } = useLang()
  const realm = routeRealm === 'inner' ? 'inner' : 'outer'
  const chapters = chaptersFor(realm)
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const queryChapter = searchParams.get('jing')
  const chapter = chapters.find((item) => item.id === queryChapter) || chapters[0]
  const [activeIndex, setActiveIndex] = useState(0)
  const [readingOpen, setReadingOpen] = useState(false)
  const [gazetteerTab, setGazetteerTab] = useState('basic')
  const [ritualStep, setRitualStep] = useState(0)
  const [haiSlide, setHaiSlide] = useState(0)
  const [haiBroken, setHaiBroken] = useState([])
  const [hoverNode, setHoverNode] = useState(null)
  const sceneRef = useRef(null)
  const volumeNavRef = useRef(null)
  const gesture = useRef(null)
  const active = chapter.nodes[activeIndex] || chapter.nodes[0]
  const isOuter = realm === 'outer'
  const ritual = RITUALS[chapter.id]
  // 展示用双语名：中文键（active.name / item.name）仍用于所有数据查找。
  const chapterName = lang === 'en' ? chapter.nameEn : chapter.name
  const nodeName = (item) => lang === 'en' ? item.nameEn : item.name
  const kindText = (kind) => lang === 'en' ? (KIND_EN[kind] ?? kind) : kind
  const activeName = nodeName(active)

  useEffect(() => { setActiveIndex(0); setReadingOpen(false); setGazetteerTab('basic'); setRitualStep(0); setHoverNode(null) }, [chapter.id])
  useEffect(() => {
    const nav = volumeNavRef.current
    if (!nav || window.innerWidth > 760) return
    const current = nav.querySelector('.is-current')
    if (current) nav.scrollLeft = Math.max(0, current.offsetLeft - nav.offsetLeft - 12)
  }, [chapter.id])
  useEffect(() => {
    document.title = lang === 'en'
      ? `${chapter.nameEn} · Shan Hai Jing Digital Journey`
      : `${chapter.name} · 山海行卷`
  }, [chapter.name, chapter.nameEn, lang])
  useEffect(() => {
    const onKey = (event) => {
      if (event.key === 'Escape') setReadingOpen(false)
      if (readingOpen || !['ArrowLeft', 'ArrowRight'].includes(event.key)) return
      if (event.target.closest?.('input, textarea, a, button')) return
      setActiveIndex((index) => Math.max(0, Math.min(chapter.nodes.length - 1, index + (event.key === 'ArrowRight' ? 1 : -1))))
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [chapter.nodes.length, readingOpen])

  const chooseChapter = (id) => navigate(`/haijing/${realm}?jing=${id}`)
  const move = (step) => setActiveIndex((index) => Math.max(0, Math.min(chapter.nodes.length - 1, index + step)))
  const awaken = () => setRitualStep((step) => step >= ritual.steps ? 0 : step + 1)
  const onPointerMove = (event) => {
    const bounds = sceneRef.current?.getBoundingClientRect()
    if (!bounds) return
    sceneRef.current.style.setProperty('--pointer-x', `${((event.clientX - bounds.left) / bounds.width * 100).toFixed(1)}%`)
    sceneRef.current.style.setProperty('--pointer-y', `${((event.clientY - bounds.top) / bounds.height * 100).toFixed(1)}%`)
  }
  const onPointerDown = (event) => {
    if (event.target.closest('button')) return
    gesture.current = { x: event.clientX, y: event.clientY }
  }
  const onPointerUp = (event) => {
    if (!gesture.current) return
    const difference = event.clientX - gesture.current.x
    const vertical = event.clientY - gesture.current.y
    if (isOuter && Math.abs(difference) > 55 && Math.abs(vertical) < 95) move(difference < 0 ? 1 : -1)
    else if (Math.abs(difference) < 12 && Math.abs(vertical) < 12) awaken()
    gesture.current = null
  }

  const openReading = () => { setGazetteerTab('basic'); setReadingOpen(true) }
  const gazetteer = gazetteerFor(active.name)
  const frameMotif = HAI_FRAME_MOTIFS[active.name]
  const frameGallery = HAI_GALLERIES[active.name]?.[0]
  const frameArt = active.name === '大/小人国' ? null : frameMotif
    ? `${import.meta.env.BASE_URL}assets/hai/${frameMotif}`
    : frameGallery ? `${import.meta.env.BASE_URL}assets/motion/海外经/${frameGallery}` : null
  // 本站图集：无图时回落为印记。切站时重置轮播与坏图记录。
  const haiFiles = HAI_GALLERIES[active.name] || []
  const haiSlides = haiFiles.filter((file) => !haiBroken.includes(file)).map((file) => `${import.meta.env.BASE_URL}assets/motion/海外经/${file}`)
  useEffect(() => { setHaiSlide(0); setHaiBroken([]) }, [active.name])

  return <main className={`hai-page hai-page--${realm}`} style={{ '--chapter-accent': chapter.hue }}>
    <header className="hai-header">
      <Link to="/" className="hai-header-back ru-link-back"><RuArrow dir="left" /> {lang === 'en' ? 'Back to the Shan Hai Jing Atlas' : '返回山海总图'}</Link>
      <div className="hai-header-title"><span className="hai-header-seal">山<br />海</span><span>{lang === 'en' ? <>Shan Hai Jing <i>·</i> {isOuter ? 'Four Classics Beyond the Seas' : 'Four Classics Within the Seas'}</> : <>山海经 <i>·</i> {isOuter ? '海外四经' : '海内四经'}</>}</span></div>
      <div className="hai-header-actions">
        {chapter.scrollLink && <Link className="hai-header-scroll ru-link-fwd" to={`/scroll/${chapter.scrollLink.jing}?scene=${chapter.scrollLink.scene}&from=haijing`}>{lang === 'en' ? <>Into the Scroll <RuArrow dir="up-right" /></> : <>循迹入卷 <RuArrow dir="up-right" /></>}</Link>}
        <Link className="hai-header-switch ru-link-fwd" to={`/haijing/${isOuter ? 'inner' : 'outer'}`}>{lang === 'en' ? (isOuter ? 'Within the Seas' : 'Beyond the Seas') : (isOuter ? '转入海内' : '渡向海外')} <RuArrow dir="up-right" /></Link>
      </div>
    </header>

    <section className="hai-intro" aria-label={`${chapterName}卷首`} key={chapter.id}>
      <div className="hai-intro-copy"><span className="hai-eyebrow">{isOuter ? 'OVERSEAS CHRONICLES' : 'INNER LANDS GAZETTEER'} <i>·</i> {lang === 'en' ? chapter.directionEn : chapter.direction}</span><h1>{chapterName}</h1><p>{t(chapter.intro)}</p></div>
      <aside className="hai-volume-index" aria-label={lang === 'en' ? 'Choose a classic' : '选择海经篇章'}>
        <svg className="hai-volume-ornament hai-volume-ornament--left" viewBox="0 0 120 94" fill="none" aria-hidden="true"><path d="M4 86C33 78 45 59 36 44c-7-12-26-9-24 5 1 9 16 10 17 1M10 72c29-6 47-23 48-47 1-17-14-24-23-15-8 8-1 21 9 18M35 73c26-6 40-26 38-45-1-12-13-16-19-8M63 72c25-6 34-24 48-21M8 90c41-6 65-18 85-46" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/><path d="M65 10c3 8 10 13 18 14-8 3-13 9-15 17-4-8-10-13-18-15 8-3 13-8 15-16Z" fill="currentColor" opacity=".4"/></svg>
        <svg className="hai-volume-ornament hai-volume-ornament--right" viewBox="0 0 120 94" fill="none" aria-hidden="true"><path d="M4 86C33 78 45 59 36 44c-7-12-26-9-24 5 1 9 16 10 17 1M10 72c29-6 47-23 48-47 1-17-14-24-23-15-8 8-1 21 9 18M35 73c26-6 40-26 38-45-1-12-13-16-19-8M63 72c25-6 34-24 48-21M8 90c41-6 65-18 85-46" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/><path d="M65 10c3 8 10 13 18 14-8 3-13 9-15 17-4-8-10-13-18-15 8-3 13-8 15-16Z" fill="currentColor" opacity=".4"/></svg>
        <div className="hai-volume-head"><span>{lang === 'en' ? (isOuter ? 'Tour of the Four Seas' : 'Gazetteer of Mountains and Rivers') : (isOuter ? '四海巡游' : '山川方志')}</span><small>{lang === 'en' ? 'Volume' : '卷次'} {String(chapters.findIndex((item) => item.id === chapter.id) + 1).padStart(2, '0')} / 04</small></div>
        <nav ref={volumeNavRef} aria-label={isOuter ? (lang === 'en' ? 'Four Classics Beyond the Seas' : '海外四经') : (lang === 'en' ? 'Four Classics Within the Seas' : '海内四经')}>{chapters.map((item, index) => <button type="button" key={item.id} onClick={() => chooseChapter(item.id)} className={item.id === chapter.id ? 'is-current' : ''} aria-current={item.id === chapter.id ? 'page' : undefined}><b>{lang === 'en' ? item.directionEn : item.direction}</b><span>{nodeName(item)}</span><em>{String(index + 1).padStart(2, '0')}</em></button>)}</nav>
        <div className="hai-volume-foot"><span className="hai-volume-foot-desktop">{isOuter ? (lang === 'en' ? 'In the order of the classic · seeking wonders along the sea lanes' : '循经文次第 · 沿海路寻异') : (lang === 'en' ? 'Following mountain and river branches · tracing local wonders' : '循山水支脉 · 查地物异闻')}</span><span className="hai-volume-foot-mobile">{lang === 'en' ? 'Swipe to change classic ↔' : '轻扫换经 ↔'}</span><b>{t(chapter.subtitle)}</b></div>
      </aside>
    </section>

    <section className="hai-main" aria-label={`${chapterName}互动图卷`}>
      <div className={`hai-scene hai-scene--${chapter.id} ${ritualStep > 0 ? 'has-ritual' : ''}`} ref={sceneRef} style={{ '--ritual-step': ritualStep, '--ritual-fraction': ritualStep / ritual.steps }} onPointerMove={onPointerMove} onPointerDown={onPointerDown} onPointerUp={onPointerUp} onPointerCancel={() => { gesture.current = null }}>
        <div className="hai-scene-art" style={{ '--focus-x': `${ART_FOCUS[chapter.id][activeIndex]}%` }} />
        <div className="hai-scene-haze" aria-hidden="true" />
        <div className="hai-scene-light" aria-hidden="true" />
        <div className="hai-ritual-effect" aria-hidden="true"><i/><i/><i/><i/><i/><i/></div>
        <div className="hai-scene-top"><span>{lang === 'en' ? 'Vol.' : '卷'} {String(chapters.findIndex((item) => item.id === chapter.id) + 1).padStart(2, '0')} / 04</span><span>{isOuter ? (lang === 'en' ? 'Wonders Beyond the Seas' : '海外异闻图') : (lang === 'en' ? 'Mountains Within the Seas' : '海内山川图')}</span></div>
        <svg className="hai-path" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          <defs><linearGradient id="hai-path-ink"><stop stopColor="#c19b64" stopOpacity=".38"/><stop offset=".5" stopColor="#f5e8b9" stopOpacity=".86"/><stop offset="1" stopColor="#c19b64" stopOpacity=".38"/></linearGradient></defs>
          {isOuter ? <polyline points={chapter.nodes.map((item) => `${item.x},${item.y}`).join(' ')} /> : chapter.nodes.slice(1).map((item, index) => <line key={item.name} x1={chapter.nodes[0].x} y1={chapter.nodes[0].y} x2={item.x} y2={item.y} className={index + 1 <= activeIndex ? 'is-lit' : ''} />)}
        </svg>
        {chapter.nodes.map((item, index) => <button
          key={item.name} type="button" className={`hai-map-node hai-map-node--${item.motion} ${index === activeIndex ? 'is-active' : ''} ${index < activeIndex ? 'is-passed' : ''} ${item.y < 37 ? 'is-popover-below' : ''} ${item.x < 27 ? 'is-popover-left' : item.x > 73 ? 'is-popover-right' : ''}`}
          style={{ left: `${item.x}%`, top: `${item.y}%`, '--node-delay': `${index * .12}s` }}
          onMouseEnter={() => setHoverNode(item.name)} onMouseLeave={() => setHoverNode((name) => name === item.name ? null : name)}
          onClick={() => setActiveIndex(index)} aria-label={lang === 'en' ? `View ${item.nameEn}` : `查看${item.name}`} aria-pressed={index === activeIndex}>
          <span className="hai-node-ring" aria-hidden="true"><span>{item.mark}</span></span><span className="hai-node-label">{nodeName(item)}</span>
          {hoverNode === item.name && <span className="hai-node-popover" role="tooltip">
            <span className="hai-node-popover-body"><strong>{nodeName(item)}</strong><span className="hai-node-popover-line">{t(item.description)}</span>
              <small>{lang === 'en' ? 'Tap a landmark to open its gazetteer' : '点击地标，查看图志'}</small></span>
          </span>}
        </button>)}
        <div className="hai-ritual-control"><button type="button" onClick={awaken} aria-label={lang === 'en' ? `${t(ritual.action)}; tap to experience again` : `${t(ritual.action)}；点击可重复体验`}><span className="hai-ritual-icon">{ritual.mark}</span><span>{ritualStep === 0 ? t(ritual.action) : ritualStep === ritual.steps ? (lang === 'en' ? 'Settle the vision' : '收起异象') : (lang === 'en' ? `Continue: ${t(ritual.action)}` : '继续' + t(ritual.action))}</span><b aria-hidden="true">↗</b></button><p aria-live="polite">{ritualStep === 0 ? (lang === 'en' ? 'Tap the scene to awaken this volume\'s vision' : '点击画面，唤醒本卷异象') : t(ritual.hint)}</p><span className="hai-ritual-dots" aria-hidden="true">{Array.from({ length: ritual.steps }, (_, index) => <i key={index} className={index < ritualStep ? 'is-lit' : ''}/>)}</span></div>
        <div className="hai-scene-bottom"><span>{isOuter ? (lang === 'en' ? 'Swipe the scroll · stop by stop' : '轻扫画卷 · 逐站巡游') : (lang === 'en' ? 'Light the landmarks · follow the branches' : '点亮地标 · 追索支脉')}</span><span className="hai-compass" aria-hidden="true">◇ <b>{lang === 'en' ? chapter.directionEn : chapter.direction}</b></span></div>
      </div>

      <article className="hai-folio" key={`${chapter.id}-${activeIndex}`}>
        <div className="hai-folio-head"><span>{lang === 'en' ? 'Tale' : '异闻'} {String(activeIndex + 1).padStart(2, '0')} / {String(chapter.nodes.length).padStart(2, '0')}</span><span>{kindText(active.kind)}</span></div>
        {haiSlides.length > 0 && !CIRCULAR_EMBLEM_SITES.has(active.name) ? (
          <div className="hai-folio-carousel" aria-hidden="true">
            {haiSlides.map((src, k) => {
              const rel = (((k - haiSlide) % haiSlides.length) + haiSlides.length) % haiSlides.length
              if (rel > 1 && rel < haiSlides.length - 1) return null
              const side = rel === 0 ? 'center' : rel === 1 ? 'right' : 'left'
              return (
                <button key={k} type="button" className={`hai-folio-card ${side}`} onClick={() => setHaiSlide(k)} aria-label={lang === 'en' ? `Image ${k + 1}` : `第${k + 1}张`}>
                  <img src={src} alt="" onError={() => setHaiBroken((b) => b.includes(src) ? b : [...b, src])} style={haiBroken.includes(src) ? { display: 'none' } : undefined} />
                </button>
              )
            })}
            {haiSlides.length > 1 && (
              <>
                <button type="button" className="hai-folio-carousel-arrow prev" onClick={() => setHaiSlide((s) => (s - 1 + haiSlides.length) % haiSlides.length)} aria-label={lang === 'en' ? 'Previous image' : '上一张'}>‹</button>
                <button type="button" className="hai-folio-carousel-arrow next" onClick={() => setHaiSlide((s) => (s + 1) % haiSlides.length)} aria-label={lang === 'en' ? 'Next image' : '下一张'}>›</button>
                <div className="hai-folio-carousel-dots" role="tablist">
                  {haiSlides.map((_, k) => <button key={k} type="button" role="tab" aria-selected={k === haiSlide} aria-label={lang === 'en' ? `Image ${k + 1}` : `第${k + 1}张`} className={`hai-folio-carousel-dot${k === haiSlide ? ' on' : ''}`} onClick={() => setHaiSlide(k)} />)}
                </div>
              </>
            )}
          </div>
        ) : CIRCULAR_EMBLEM_SITES.has(active.name) && haiSlides.length > 0 ? (
          <div className={`hai-folio-emblem hai-folio-emblem--photo hai-folio-emblem--${active.motion}`} aria-hidden="true"><img src={haiSlides[0]} alt="" onError={(e) => { e.currentTarget.style.display = 'none' }} /></div>
        ) : (
          <div className={`hai-folio-emblem hai-folio-emblem--${active.motion}`} aria-hidden="true"><span>{active.mark}</span></div>
        )}
        <h2>{activeName}</h2><p className="hai-folio-description">{t(active.description)}</p>
        <div className="hai-folio-divider"><i /><span>{lang === 'en' ? 'Thread from the Classic' : '经文线索'}</span><i /></div>
        <p className="hai-folio-detail">{t(active.detail)}</p>
        <button type="button" className="hai-read-button ru-link-fwd" onClick={openReading}>{lang === 'en' ? 'Open the Gazetteer' : '展开方志'} <RuArrow dir="up-right" /></button>
        <div className="hai-folio-controls"><button type="button" onClick={() => move(-1)} disabled={activeIndex === 0} aria-label={lang === 'en' ? 'Previous tale' : '上一处异闻'}>←</button><span>{String(activeIndex + 1).padStart(2, '0')} <i>/</i> {String(chapter.nodes.length).padStart(2, '0')}</span><button type="button" onClick={() => move(1)} disabled={activeIndex === chapter.nodes.length - 1} aria-label={lang === 'en' ? 'Next tale' : '下一处异闻'}>→</button></div>
      </article>
    </section>

    <footer className="hai-footer"><span>{lang === 'en' ? 'Stops on the map follow the reading order of the classic, not real-world coordinates.' : '图中站点按经文阅读次第组织，不代表真实地理坐标。'}</span><a href={chapter.source} target="_blank" rel="noreferrer" className="ru-link-fwd">{lang === 'en' ? <>Read the original of {chapter.nameEn} <RuArrow dir="up-right" /></> : <>查看《{chapter.name}》原文 <RuArrow dir="up-right" /></>}</a></footer>

    {readingOpen && <div className="hai-drawer-backdrop" onClick={() => setReadingOpen(false)}>
      <section className={`hai-modal hai-modal--${active.motion} ${active.name === '大/小人国' ? 'hai-modal--scale-frame' : ''}`} role="dialog" aria-modal="true" aria-label={lang === 'en' ? `Gazetteer: ${activeName}` : `${active.name}方志`} onClick={(event) => event.stopPropagation()}>
        {frameArt && <img className={`hai-modal-subject ${frameMotif ? 'hai-modal-subject--generated' : ''}`} src={frameArt} alt="" aria-hidden="true" />}
        <HaiEntryOrnament motion={active.motion} mark={active.mark} />
        <div className="hai-modal-ornaments" aria-hidden="true">
          {['tl', 'tr', 'bl', 'br'].map((corner) => <svg key={corner} className={`hai-modal-corner hai-modal-corner--${corner}`} viewBox="0 0 82 82" fill="none">
            <path d="M2 68V20C2 10 10 2 20 2H68M10 58V22C10 15 15 10 22 10H58" />
            <path d="M17 48c10-2 10-14 20-14 7 0 9 8 3 11-5 2-9-3-5-7m12-21c-3 9-15 9-15 19m22-22c-1 7-8 11-14 10" />
          </svg>)}
        </div>
        <div className="hai-modal-heading">
          <span className="hai-modal-eyebrow">{lang === 'en' ? <>Strange Tales of Shan Hai Jing <i>·</i> {chapterName}</> : <>山海异闻 <i>·</i> {chapterName}</>}</span>
          <h2>{activeName}</h2>
          <span className="hai-modal-type">{kindText(active.kind)} <i>·</i> {t(chapter.subtitle)}</span>
          <span className="hai-modal-imprint" aria-hidden="true">{active.mark}<small>{kindText(active.kind)}</small></span>
          <button type="button" className="hai-modal-close" onClick={() => setReadingOpen(false)} aria-label={lang === 'en' ? 'Close the gazetteer' : '关闭方志'}>×</button>
        </div>
        <div className="hai-modal-body">
          <nav className="hai-tabs" aria-label={lang === 'en' ? 'Gazetteer sections' : '方志板块'}>
            {GAZETTEER_TABS.map((tab) => (
              <button
                key={tab.key} type="button"
                className={`hai-tab ${gazetteerTab === tab.key ? 'is-active' : ''}`}
                onClick={() => setGazetteerTab(tab.key)}
                aria-pressed={gazetteerTab === tab.key}
              >
                <span className="hai-tab-label">{t(tab.label)}</span>
              </button>
            ))}
          </nav>
          <div className="hai-modal-content" key={gazetteerTab}>
            {!gazetteer && <div className="hai-modal-fallback">
              <p className="hai-modal-lead">{t(active.description)}</p>
              <p>{t(active.detail)}</p>
              <p className="hai-modal-note">{lang === 'en' ? 'The full gazetteer for this entry is still being compiled; see the threads from the classic for now.' : '这一条的完整方志还在整理中，先看经文线索。'}</p>
            </div>}
            {gazetteer?.basic && gazetteerTab === 'basic' && <dl className="hai-fact-list">
              {gazetteer.basic.map((item, index) => <div className="hai-fact-row" key={index}><dt>{t(item.label)}</dt><dd>{t(item.value)}</dd></div>)}
            </dl>}
            {gazetteer?.texts && gazetteerTab === 'texts' && <div className="hai-quote-list">
              {gazetteer.texts.map((item, index) => <figure className="hai-quote" key={index}>
                <figcaption>{t(item.src)}</figcaption>
                <blockquote>{item.quote}</blockquote>
                {lang === 'en' && item.quoteEn && <p className="hai-quote-en">{item.quoteEn}</p>}
                {item.note && <p className="hai-quote-note">{t(item.note)}</p>}
              </figure>)}
            </div>}
            {gazetteer?.traits && gazetteerTab === 'traits' && <ul className="hai-point-list">
              {gazetteer.traits.map((item, index) => <li key={index}><b>{t(item[0])}</b><p>{t(item[1])}</p></li>)}
            </ul>}
            {gazetteer?.origins && gazetteerTab === 'origins' && <ul className="hai-point-list">
              {gazetteer.origins.map((item, index) => <li key={index}><b>{t(item[0])}</b><p>{t(item[1])}</p></li>)}
            </ul>}
            {gazetteer?.meaning && gazetteerTab === 'meaning' && <p className="hai-meaning">{t(gazetteer.meaning)}</p>}
          </div>
        </div>
      </section>
    </div>}
  </main>
}
