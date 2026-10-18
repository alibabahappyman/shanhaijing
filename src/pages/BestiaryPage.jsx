import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { beastById, categories, motionImages } from '../data/bestiary.js'
import { useLang } from '../i18n/LanguageContext.jsx'
import RuArrow from '../components/RuArrow.jsx'
import './BestiaryPage.css'

function PhotoLightbox({ name, images, onClose, en }) {
  const [index, setIndex] = useState(0)
  useEffect(() => {
    const onKey = (event) => {
      if (event.key === 'Escape') onClose()
      if (event.key === 'ArrowRight') setIndex((v) => (v + 1) % images.length)
      if (event.key === 'ArrowLeft') setIndex((v) => (v - 1 + images.length) % images.length)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [images.length, onClose])

  return <div className="bestiary-lightbox" role="dialog" aria-modal="true" aria-label={en ? `${name} gallery` : `${name}图像`} onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}>
    <button type="button" className="bestiary-lightbox-close" onClick={onClose} aria-label={en ? 'Close gallery' : '关闭图像'}>{en ? 'Close' : '合卷'} <span aria-hidden>×</span></button>
    {images.length > 1 && <button type="button" className="bestiary-lightbox-nav bestiary-lightbox-nav--prev" onClick={() => setIndex((v) => (v - 1 + images.length) % images.length)} aria-label={en ? 'Previous image' : '上一张'}>←</button>}
    <figure className="bestiary-lightbox-figure">
      <img src={images[index]} alt={`${name} ${en ? 'plate' : '图'} ${index + 1}`} />
      <figcaption>{name} · {String(index + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}</figcaption>
    </figure>
    {images.length > 1 && <button type="button" className="bestiary-lightbox-nav bestiary-lightbox-nav--next" onClick={() => setIndex((v) => (v + 1) % images.length)} aria-label={en ? 'Next image' : '下一张'}>→</button>}
  </div>
}

export default function BestiaryPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const { t, lang } = useLang()
  // 图鉴数据大量字段是 {zh,en} 双语对象；t 对纯字符串在英文模式返回空，用 tt 兜底
  const tt = (v) => (v && typeof v === 'object' ? t(v) : v || '')
  const en = lang === 'en'
  const category = categories.find((item) => item.id === searchParams.get('type'))
  const [activeId, setActiveId] = useState(null)
  const [photoBeast, setPhotoBeast] = useState(null)
  const entries = category?.ids.map((id) => beastById[id]).filter(Boolean) || []
  // 题签选中态写入 URL（?beast=），返回/刷新都能落回同一枚题签
  const selectedId = entries.some((beast) => beast.id === (searchParams.get('beast') || activeId)) ? (searchParams.get('beast') || activeId) : entries[0]?.id
  const selectBeast = (id) => {
    setActiveId(id)
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev)
      next.set('beast', id)
      return next
    }, { replace: false })
  }

  useEffect(() => { window.scrollTo(0, 0) }, [category?.id])

  return <main className="bestiary-page">
    <header className="bestiary-header">
      <Link to="/" className="bestiary-back ru-link-back"><RuArrow dir="left" /> <span>{en ? 'Back to the atlas' : '返回山海总图'}</span></Link>
      <span className="bestiary-header-brand">山海行卷 <i>·</i> The Wandering Myth</span>
      {category ? <button className="bestiary-header-action ru-link-fwd" onClick={() => setSearchParams({})}>{en ? <>All themes <RuArrow dir="up-right" /></> : <>全部主题 <RuArrow dir="up-right" /></>}</button> : <span className="bestiary-header-label">{en ? 'Themed beast gallery' : '异兽主题图鉴'}</span>}
    </header>

    {!category ? <div className="bestiary-index">
      <div className="bestiary-intro"><span className="bestiary-kicker">THE BESTIARY OF SHAN HAI JING · 001—006</span><h1>{en ? <>The Bestiary of Shan Hai <span>Jing</span></> : <>山海<span>百灵</span></>}</h1><p>{en ? 'Walk the mountains and rivers, and read the spirits of Shan Hai again through their forms, omens and legends.' : '循山川而行，依形貌、征兆与传说，再读山海诸灵。'}</p><span className="bestiary-intro-hint">{en ? 'Gathered into a volume / Click a title-card to unroll' : '拾遗成卷　/　点击题签展卷'}</span></div>
      <div className="bestiary-grid" aria-label={en ? 'Beast themes' : '异兽主题'}>
        {categories.map((item) => <button key={item.id} type="button" className={`bestiary-category bestiary-category--${item.tone}`} onClick={() => setSearchParams({ type: item.id })}>
          <span className="bestiary-category-no">{item.index} / {String(item.ids.length).padStart(2, '0')}</span>
          {item.cover && <img className="bestiary-category-cover" src={item.cover} alt="" />}
          <span className="bestiary-category-art" aria-hidden="true">
            {!item.cover && <>
              {item.ids.filter((id) => beastById[id]?.image).slice(0, 3).map((id, index) => <img key={id} src={beastById[id].image} alt="" style={{ '--i': index }} />)}
              {!item.ids.some((id) => beastById[id]?.image) && <span className="bestiary-category-placeholder"><b>{item.emblem}</b><small>{item.ids.map((id) => tt(beastById[id]?.name)).join(' · ')}</small></span>}
            </>}
          </span>
          <span className="bestiary-category-foot"><span><small>{item.english}</small><strong>{tt(item.name)}</strong></span><span className="bestiary-category-arrow" aria-hidden="true"><RuArrow dir="up-right" /></span></span>
        </button>)}
      </div>
      <p className="bestiary-index-note">{en ? 'Themes are drawn from the currently open eastern, western and northern classics · one beast may appear under several themes' : '主题图鉴取自当前开放的东、西、北山经 · 同一异兽可见于不同主题'}</p>
    </div> : <div className={`bestiary-detail bestiary-detail--${category.tone}`}>
      <div className="bestiary-detail-heading"><div><span className="bestiary-kicker">{category.english} · {en ? 'The Bestiary / ' : '山海百灵 / '}{category.index}</span><h1>{tt(category.name)}</h1><p>{tt(category.subtitle)}</p></div><span className="bestiary-detail-seal" aria-hidden="true">{category.emblem}</span></div>
      <div className="bestiary-detail-meta"><span>{en ? 'Beasts in this volume' : '卷中收录'} <b>{String(entries.length).padStart(2, '0')}</b> {en ? '' : '则'}</span><span>{tt(category.forthcoming) || (en ? 'Pick a title-card to read form and text' : '择一枚题签，翻阅形貌与原文')}</span></div>
      <ul className="bestiary-accordion" style={{ gridTemplateColumns: entries.map((beast) => beast.id === selectedId ? 'minmax(0, 8fr)' : 'minmax(54px, 1fr)').join(' ') }}>
        {entries.map((beast, index) => {
          const active = beast.id === selectedId
          const photos = motionImages(beast.id)
          return <li key={beast.id} className={`bestiary-beast${active ? ' is-active' : ''}`}>
            <button type="button" className="bestiary-beast-trigger" onClick={() => selectBeast(beast.id)} aria-expanded={active} aria-label={en ? `View ${tt(beast.name)}` : `查看${tt(beast.name)}`}><span>{String(index + 1).padStart(2, '0')}</span><strong>{tt(beast.name)}</strong><span aria-hidden="true">{active ? '−' : '+'}</span></button>
            <div className="bestiary-beast-content" aria-hidden={!active}>
              <div className="bestiary-beast-illustration">{beast.image ? <img src={beast.image} alt={tt(beast.name)} loading="lazy" /> : <div className="bestiary-art-placeholder" aria-label={`${tt(beast.name)} ${en ? 'illustration to come' : '插画待补'}`}><b>{beast.name.zh.slice(0, 1)}</b><span>{en ? 'Portrait to come' : '图像待绘'}</span></div>}</div>
              <div className="bestiary-beast-copy"><span className="bestiary-beast-eyebrow">{tt(category.labels?.[beast.id]) || (beast.forthcoming ? (en ? 'The Bestiary · to come' : '山海百灵 · 待续') : `${tt(beast.volumeName)} · ${tt(beast.mountain)}`)}</span><h3>{tt(beast.name)}</h3>{beast.tale ? <div className="bestiary-beast-tale"><span>{en ? 'A tale' : '异闻'}</span><p>{tt(beast.tale)}</p></div> : null}<p className="bestiary-beast-note">{tt(beast.note)}</p>{beast.quote ? <div className="bestiary-beast-quote"><span>{en ? 'From the Classic' : '原文摘录'}</span><p>{tt(beast.quote)}</p></div> : <div className="bestiary-beast-quote bestiary-beast-quote--pending"><span>{en ? 'Text pending · portrait to come' : '文献待核 · 插画待补'}</span><p>{en ? 'Space reserved for the source text, a reading of its form, and an illustration.' : '此处预留原文、形貌释读与插画的位置。'}</p></div>}<div className="bestiary-beast-links">{beast.volumeId && <Link to={`/scroll/${beast.volumeId}${beast.sceneId ? `?scene=${beast.sceneId}&` : '?'}from=bestiary&type=${category.id}&beast=${beast.id}`} tabIndex={active ? 0 : -1} className="ru-link-fwd">{en ? <>Follow into the scroll <RuArrow dir="up-right" /></> : <>循迹入卷 <RuArrow dir="up-right" /></>}</Link>}{photos.length > 0 && <button type="button" className="bestiary-beast-photos ru-link-fwd" onClick={() => setPhotoBeast(beast)} tabIndex={active ? 0 : -1}>{en ? <>Plates ({photos.length}) <RuArrow dir="up-right" /></> : <>看图 ({photos.length}) <RuArrow dir="up-right" /></>}</button>}</div></div>
            </div>
          </li>
        })}
      </ul>
      {category.planned && <p className="bestiary-planned"><span>{en ? 'More to come' : '专题待续'}</span>{tt(category.planned)}</p>}
      <nav className="bestiary-detail-bottom"><button type="button" className="ru-link-back" onClick={() => setSearchParams({})}><RuArrow dir="left" /> {en ? 'Back to themes' : '返回主题'}</button><span>{entries.map((beast) => tt(beast.name)).join(' · ')}</span></nav>
    </div>}
    {photoBeast && <PhotoLightbox name={tt(photoBeast.name)} images={motionImages(photoBeast.id)} onClose={() => setPhotoBeast(null)} />}
  </main>
}
