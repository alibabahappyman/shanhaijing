import { useState } from 'react'
import { useLang } from '../i18n/LanguageContext.jsx'
import RuArrow from './RuArrow.jsx'

const clamp01 = (v) => Math.min(1, Math.max(0, v))

export default function ScenePanel({ scene, active, progress = 0, entry, index, total, enScene, onOpen }) {
  const { t, lang } = useLang()
  const side = (entry?.side || scene.side) === 'right' ? 'right' : 'left'
  const p = Math.max(-1, Math.min(1, progress))
  const vis = clamp01(1 - Math.abs(p) * 1.35)
  // caption 是 {zh,en} 双语对象，先经 t() 取当前语言文本再做分隔解析
  const captionText = entry?.caption ? t(entry.caption) : ''
  const subject = (lang === 'en'
    ? (enScene?.title || captionText).split(' · ')[1] || (enScene?.title || captionText).split(' · ')[0]
    : captionText.split(' · ')[0]) || (lang === 'en' ? 'Mountains & streams' : '山川')
  const enTitle = lang === 'en' ? (enScene?.title || scene.title) : null
  const titleMain = lang === 'en'
    ? (enTitle || '').split(/[·:：]/)[0].trim()
    : scene.title.split(/[·:：]/)[0].trim()
  const [showTranslation, setShowTranslation] = useState(false)

  return (
    <section
      className={`scene-col scene-col-${side} ${active ? 'active' : ''}`}
      style={{
        opacity: vis,
        transform: `translateY(${-p * 70}px)`,
        visibility: vis <= 0.01 ? 'hidden' : 'visible',
      }}
    >
      <div className="mountain-heading">
        <p className="scene-col-count">{lang === 'en' ? `Stop ${String(index).padStart(2, '0')} of ${String(total).padStart(2, '0')}` : <>山行第 {String(index).padStart(2, '0')} 站 <span>／</span> 共 {String(total).padStart(2, '0')} 站</>}</p>
        <p className="scene-col-kicker">{lang === 'en' ? (enScene?.kicker || scene.kicker) : scene.kicker}</p>
        <h2 className="scene-col-title" aria-label={titleMain}>
          {lang === 'en'
            ? <span className="scene-col-char-mask scene-col-char-mask--en" aria-hidden><span className="scene-col-char scene-col-char-en">{titleMain}</span></span>
            : titleMain.split('').map((c, i) => (
              <span key={i} className="scene-col-char-mask" aria-hidden>
                <span className="scene-col-char" style={{ transitionDelay: `${0.1 + i * 0.052}s` }}>
                  {c}
                </span>
              </span>
            ))}
        </h2>
      </div>
      <div className="mountain-story">
        <div className="mountain-story-label"><span>{lang === 'en' ? 'Mountain Notes' : '山海志'}</span><i />{subject}</div>
        <p className="mountain-story-lead">{t(entry?.lead) || scene.node}</p>
        {scene.fullText && (
          <div className="mountain-story-scripture">
            <p className="mountain-story-scripture-text">{scene.fullText}</p>
            <p className="mountain-story-scripture-src">——{lang === 'en' ? (scene.fullSource || 'the Classic of Mountains and Seas') : (scene.fullSource || '《山海经》')}</p>
          </div>
        )}
        {(scene.translation || scene.storyTranslation) && (
          <div className={`mountain-story-translation ${showTranslation ? 'is-open' : ''}`}>
            <div className="mountain-story-translation-inner">
              {scene.translation && (
                <>
                  <p className="mountain-story-translation-label">{lang === 'en' ? 'In Plain Words' : '经文译'}</p>
                  <p className="mountain-story-translation-text">{lang === 'en' ? (enScene?.translation || scene.translation.replace(/^经文段[:：]\s*/, '')) : scene.translation.replace(/^经文段[:：]\s*/, '')}</p>
                </>
              )}
            </div>
          </div>
        )}
        {scene.translation ? (
          <button
            className="mountain-story-open"
            type="button"
            onClick={() => setShowTranslation((v) => !v)}
            aria-expanded={showTranslation}
            tabIndex={active ? 0 : -1}
          >
            {lang === 'en' ? (showTranslation ? 'Hide the rendering' : 'Plain-words rendering') : (showTranslation ? '收起译文' : '展开译文')} <RuArrow dir="down" />
          </button>
        ) : (
          <button className="mountain-story-open" type="button" onClick={onOpen} tabIndex={active ? 0 : -1}>
            {lang === 'en' ? 'Open the mountain journal' : '展开山志'} <RuArrow dir="up-right" />
          </button>
        )}
      </div>
      <p className="mountain-story-hint">{lang === 'en' ? 'Golden marks in the painting reveal details of the range' : '画中金点可探寻山川细节'}</p>
    </section>
  )
}
