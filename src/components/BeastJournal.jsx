import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { beastById, beastCategoryId } from '../data/bestiary.js'
import { beastProfiles } from '../data/beastProfiles.js'
import { useLang } from '../i18n/LanguageContext.jsx'
import { getJournalTheme } from '../data/journalThemes.js'
import './BeastJournal.css'

function quoteClues(quote) {
  return (quote || '')
    .replace(/——《[^》]+》/g, '')
    .split(/[，。；]/)
    .map((part) => part.trim())
    .filter((part) => part.length >= 3 && part.length <= 24 && /其状|状如|其音|其鸣|见则|食之|六足|四翼|九尾|无面目|识歌舞|人面|鸟翼|一首|十身|常行|善/.test(part))
    .slice(0, 5)
}

export default function BeastJournal({ beast, scene, enScene, volumeName, image, onBack, onClose }) {
  const { t, lang } = useLang()
  const backRef = useRef(null)
  const entry = beastById[beast.id]
  const categoryId = beastCategoryId(beast.id)
  const profile = beastProfiles[beast.id]
  const theme = getJournalTheme(beast)
  const clues = quoteClues(beast.quote)
  const en = lang === 'en'
  // 志页数据多为纯中文字符串（profile/traits/段落等）：t() 对纯字符串在英文模式返回空，
  // 这里用 tt 兜底——双语对象走 t，纯字符串原样显示，避免整页空白。
  const tt = (v) => (v && typeof v === 'object' ? t(v) : v || '')
  const beastName = tt(beast.name)
  const mountain = entry?.mountain ? t(entry.mountain) : (scene?.node || (en ? 'the mountains' : '山中'))
  const volume = entry?.volumeName ? t(entry.volumeName) : (volumeName || (en ? 'Shan Hai Jing' : '山海经'))
  // note 可能是 {zh,en} 双语对象，必须走 tt 兜底，直接渲染对象会使 React 崩溃白屏
  const summary = entry?.note ? tt(entry.note) : (en
    ? `The classic records here the name of ${beastName}; further study of its form awaits.`
    : `经文在此记下${beastName}之名；更多形貌资料尚待考证。`)

  useEffect(() => {
    backRef.current?.focus()
    const onKey = (event) => {
      if (event.key === 'Escape') { event.stopPropagation(); onBack() }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onBack])

  return <div className="beast-journal-wrap" onWheel={(event) => event.stopPropagation()} onTouchMove={(event) => event.stopPropagation()} onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}>
    <article className={`beast-journal beast-journal--${theme.type} beast-journal--${beast.id}${profile ? ' beast-journal--profile' : ''}`} style={theme.style} role="dialog" aria-modal="true" aria-label={en ? `Beast journal: ${beastName}` : `${beastName}异兽志`}>
      <header className="beast-journal-head">
        <button ref={backRef} type="button" onClick={onBack}>{en ? '← Back to the beast' : '← 返回异兽卡'}</button>
        {categoryId ? <Link to={`/bestiary?type=${categoryId}&beast=${beast.id}`}>{en ? 'Bestiary' : '山海百灵'} <b>·</b> {t(theme.label)} ↗</Link> : <span>{en ? 'Bestiary' : '山海百灵'} <b>·</b> {t(theme.label)}</span>}
        <button type="button" onClick={onClose} aria-label={en ? 'Close the beast journal' : '合上异兽志'}>{en ? 'Close ×' : '合卷 ×'}</button>
      </header>
      <div className="beast-journal-body">
        <div className="beast-journal-portrait">
          <span className="beast-journal-portrait-label">{volume} <i>·</i> {mountain}</span>
          <div className="beast-journal-art">
            {image ? <img src={image} alt={tt(beast.name)} /> : <div className="beast-journal-art-pending"><b>{beast.name.slice(0, 1)}</b><small>{en ? 'Portrait to come' : '图像待绘'}</small></div>}
          </div>
          <div className="beast-journal-portrait-bottom"><span className="beast-journal-seal">{beast.name.slice(0, 2)}</span><span className="beast-journal-portrait-index">SHAN HAI · {beast.id.toUpperCase()}</span></div>
        </div>
        <div className="beast-journal-text">
          <div className="beast-journal-title"><span>{tt(theme.label)} / {mountain}</span><h2>{tt(beast.name)}</h2>{profile && <strong className="beast-journal-subtitle">{tt(profile.subtitle)}</strong>}<p>{profile ? tt(profile.introduction) : summary}</p></div>
          {profile ? <>
            <section className="beast-journal-section"><h3><i>一</i> {en ? 'Beast at a Glance' : '一眼识兽'}</h3><ul className="beast-journal-clues">{profile.traits.map((trait, i) => <li key={i}>{tt(trait)}</li>)}</ul></section>
            {profile.sections.map((section, index) => <section className="beast-journal-section" key={index}>
              <h3><i>{['二', '三', '四', '五'][index]}</i> {tt(section.title)}</h3>
              <span className="beast-journal-section-eyebrow">{tt(section.eyebrow)}</span>
              {section.paragraphs.map((paragraph, i) => <p key={i}>{tt(paragraph)}</p>)}
            </section>)}
            <section className="beast-journal-section beast-journal-section--quote"><h3><i>{['二', '三', '四', '五', '六'][profile.sections.length]}</i> {en ? 'From the Classic' : '原文摘录'}</h3><blockquote>{beast.quote || (en ? 'Source text to come.' : '原文待补。')}</blockquote><small>{en ? 'Quoted from the Classic of Mountains and Seas; the original text, related legends and this site\'s reading are labeled separately above.' : '本段引自《山海经》；上文已将原典、相关传说和本站释读分别标明。'}</small></section>
            <nav className="beast-journal-sources" aria-label={en ? `Sources for ${tt(beast.name)}` : `${beast.name}条目参考原典`}><span>{en ? 'Sources' : '原典参照'}</span>{profile.sources.map((source) => <a key={source.url} href={source.url} target="_blank" rel="noreferrer">{tt(source.label)} ↗</a>)}</nav>
          </> : <><section className="beast-journal-section"><h3><i>一</i> {en ? 'Threads from the Classic' : '经文线索'}</h3>
            {clues.length ? <ul className="beast-journal-clues">{clues.map((clue, i) => <li key={i}>{clue}</li>)}</ul> : <p className="beast-journal-muted">{en ? 'The classic leaves no further clues of form to unpack.' : '经文未留下更多可拆分的形貌线索。'}</p>}
          </section>
          <section className="beast-journal-section"><h3><i>二</i> {en ? 'From the Mountain Passage' : '山中记述'}</h3><p>{en ? (enScene?.translation || 'Follow the waters and the road through the mountains, and read this passage anew.') : (scene?.narration || '循着山中的水脉与行路，重读这段经文。')}</p></section>
          <section className="beast-journal-section beast-journal-section--quote"><h3><i>三</i> {en ? 'From the Classic' : '原文摘录'}</h3><blockquote>{beast.quote || (en ? 'Source text to come.' : '原文待补。')}</blockquote><small>{en ? 'A passage from the Classic of Mountains and Seas as used on this site; the reading and imagery are visual interpretation.' : '本站采用的《山海经》片段；释读文字与画面为视觉演绎。'}</small></section></>}
          <footer className="beast-journal-foot">{en ? 'Following the mountains · Returning to the picture' : '循山而行 · 再入画中'} <span aria-hidden="true">◈</span></footer>
        </div>
      </div>
    </article>
  </div>
}
