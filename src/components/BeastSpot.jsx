import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import BeastJournal from './BeastJournal.jsx'
import { useLang } from '../i18n/LanguageContext.jsx'
import { BEAST_GALLERIES } from '../data/beastGalleries.js'
import beastFrames from '../data/beastFrames.json'
import { beastById } from '../data/bestiary.js'

// 画中异兽热点：悬浮在画卷山景上的"活物"
// - 有图：webp/gif/png 动图乘法混合融进纸底，悬浮放大 + 金色粒子光
// - 无图：一枚小朱砂"兽"字印记，不抢画面
// - 点击弹出画中详情卡（博物馆标签式），点空白处合卷
// - 至少保留三个轮播卡位；图集未补齐时展示待补图占位。
// - 位置可由数据配置：beast.beastPos = { left, bottom }（CSS 值，注入 wrap 内联样式）
const assetUrl = (file) => `${import.meta.env.BASE_URL}${file.startsWith('assets/') ? file : `img/${file}`}`

export default function BeastSpot({ beast, layout, scene, enScene, volumeName, openSignal = 0, onOpen }) {
  const { t, lang } = useLang()
  const [open, setOpen] = useState(false)
  const [detailOpen, setDetailOpen] = useState(false)
  const [imgFailed, setImgFailed] = useState(false)
  const [slide, setSlide] = useState(0)
  const [broken, setBroken] = useState([])
  const img = beast.img ? assetUrl(beast.img) : null
  // Scroll 传入的是原始经文异兽（name 为字符串）：优先用百灵谱的规范双语名
  const beastName = (beastById[beast.id] && t(beastById[beast.id].name)) || (typeof beast.name === 'string' ? beast.name : t(beast.name))
  // 经文引文：英文模式优先用 scrollEn 场景 translation，回退中文原文
  const beastQuote = lang === 'en'
    ? (enScene?.translation || beast.quote)
    : beast.quote
  // 图集优先级： beastsGallery（assets/motion/综/ 主图+（2）（3）补充图）
  // → beast.gallery（数据里手工配置的图集）→ 单图。至少保留三个轮播卡位，未补齐的展示待补占位。
  const files =
    BEAST_GALLERIES[beast.id] || (beast.gallery && beast.gallery.length > 0 ? beast.gallery : beast.img ? [beast.img] : [])
  const slides = Array.from({ length: Math.max(3, files.length) }, (_, i) =>
    files[i] ? assetUrl(files[i]) : null,
  )
  const count = slides.length
  const anchor = layout || beast.beastPos
  const frame = beastFrames[beast.img] || [0, 0, 1, 1]
  const [left, top, right, bottom] = frame
  const frameWidth = Math.max(0.1, right - left)
  const frameHeight = Math.max(0.1, bottom - top)
  const frameStyle = {
    '--beast-visible-width': anchor?.size || 'clamp(150px, 11vw, 205px)',
    '--beast-visible-height': `calc(var(--beast-visible-width) * ${0.5625 * frameHeight / frameWidth})`,
    '--beast-image-width': `calc(var(--beast-visible-width) * ${1 / frameWidth})`,
    '--beast-image-left': `calc(var(--beast-visible-width) * ${-left / frameWidth})`,
    '--beast-image-top': `calc(var(--beast-visible-width) * ${-top * 0.5625 / frameWidth})`,
  }
  const pos = anchor?.x != null
    ? {
        '--art-left': `calc(50% + ${(anchor.x - 50) * 0.924}vmax)`,
        '--art-mobile-left': `calc(50% + ${(Math.min(65, Math.max(35, anchor.x)) - 50) * 0.924}vmax)`,
        '--art-top': `calc(50% + ${3.58 + (anchor.y - 50) * 0.52}vmax)`,
        ...frameStyle,
      }
    : anchor
      ? { left: anchor.left, bottom: anchor.bottom, ...frameStyle }
      : undefined

  const openPopup = () => {
    onOpen?.()
    setSlide(0)
    setDetailOpen(false)
    setOpen(true)
  }
  useEffect(() => {
    if (openSignal > 0) openPopup()
    // A new signal is sent only by an explicit catalogue action.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openSignal])
  useEffect(() => {
    if (!open || detailOpen) return undefined
    const onKey = (event) => { if (event.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, detailOpen])
  const step = (dir) => setSlide((s) => (s + dir + count) % count)
  // 静图加载失败 → 用占位卡顶上这一张，不打断轮播
  const markBroken = (src) => {
    setBroken((b) => (b.includes(src) ? b : [...b, src]))
  }

  return (
    <div className={`beast-spot-wrap${anchor?.x != null ? ' art-positioned' : ''}`} style={pos}>
      <button className="beast-spot" onClick={openPopup} aria-label={lang === 'en' ? `Beast ${beastName}` : `异兽${beastName}`}>
        {img ? (
          <img
            src={img}
            alt={beastName}
            onError={() => setImgFailed(true)}
            style={imgFailed ? { display: 'none' } : undefined}
          />
        ) : null}
        {/* 无图兜底印记：图加载成功后隐藏 */}
        {(!img || imgFailed) && <span className="beast-spot-seal" aria-hidden>兽</span>}
        {/* 悬浮金色粒子光 */}
        <span className="beast-sparks" aria-hidden>
          {[...Array(7)].map((_, k) => (
            <i key={k} className="beast-spark" style={{ '--d': `${k}` }} />
          ))}
        </span>
      </button>

      {open && createPortal(
        <>
          <div className="beast-veil" onClick={() => setOpen(false)} />
          {detailOpen ? <BeastJournal beast={{ ...beast, quote: beastQuote }} scene={scene} enScene={enScene} volumeName={volumeName} image={img && !imgFailed ? img : null} onBack={() => setDetailOpen(false)} onClose={() => setOpen(false)} /> : <div className="beast-popup" role="dialog" aria-label={beastName}>
            <p className="beast-popup-kicker">{lang === 'en' ? 'Beast of the Mountains' : '山中异兽'}</p>
            <h3 className="beast-popup-name">{beastName}</h3>
            {count > 0 && (
              <div className="beast-carousel">
                {/* 3D 立体轮播：每张卡按 (slide - k) 相对位置取 -1/0/1，分布在左中右 */}
                {slides.map((src, k) => {
                  const rel = (((k - slide) % count) + count) % count
                  if (rel > 1 && rel < count - 1) return null // 只呈现中卡与相邻两卡
                  const side = rel === 0 ? 'center' : rel === 1 ? 'right' : 'left'
                  return (
                    <button
                      key={k}
                      className={`beast-card ${side}`}
                      onClick={() => setSlide(k)}
                      aria-label={lang === 'en' ? `Plate ${k + 1}` : `第${k + 1}张`}
                    >
                      {!src || broken.includes(src) ? (
                        <span className="beast-carousel-placeholder">
                          <span className="beast-placeholder-mark">{String(k + 1).padStart(2, '0')}</span>
                          <span className="beast-placeholder-label">{lang === 'en' ? 'Plate to come' : '图像待补'}</span>
                        </span>
                      ) : (
                        <img
                          src={src}
                          alt={`${beastName} ${k + 1}`}
                          onError={() => markBroken(src)}
                        />
                      )}
                    </button>
                  )
                })}
                {count > 1 && (
                  <>
                    <button
                      className="beast-carousel-arrow prev"
                      onClick={() => step(-1)}
                      aria-label={lang === 'en' ? 'Previous plate' : '上一张'}
                    >
                      ‹
                    </button>
                    <button
                      className="beast-carousel-arrow next"
                      onClick={() => step(1)}
                      aria-label={lang === 'en' ? 'Next plate' : '下一张'}
                    >
                      ›
                    </button>
                  </>
                )}
                {count > 1 && (
                  <div className="beast-carousel-dots" role="tablist">
                    {slides.map((_, k) => (
                      <button
                        key={k}
                        role="tab"
                        aria-selected={k === slide}
                        aria-label={lang === 'en' ? `Plate ${k + 1}` : `第${k + 1}张`}
                        className={`beast-carousel-dot${k === slide ? ' on' : ''}`}
                        onClick={() => setSlide(k)}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}
            <p className="beast-popup-quote">{beastQuote}</p>
            <button type="button" className="beast-popup-detail" onClick={() => setDetailOpen(true)}>{lang === 'en' ? 'Open the beast journal' : '详阅异兽志'} <span aria-hidden="true">↗</span></button>
            <p className="beast-popup-hint">{lang === 'en' ? 'Click outside to close' : '点空白处合卷'}</p>
          </div>}
        </>,
        document.body,
      )}
    </div>
  )
}
