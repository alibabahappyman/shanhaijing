import { useEffect, useRef } from 'react'
import { getMountainFrame, getMountainOrnaments } from '../data/mountainFrames.js'
import { getMountainDiscoveries } from '../data/mountainDiscoveries.js'
import { getMountainJournalNote } from '../data/mountainJournalNotes.js'
import { useLang } from '../i18n/LanguageContext.jsx'

export default function MountainJournal({ scene, entry, enScene, enVolume, index, total, volumeId, node, beast, onClose }) {
  const { t, lang } = useLang()
  const en = lang === 'en'
  const tt = (v) => (v && typeof v === 'object' ? t(v) : v || '')
  const closeRef = useRef(null)
  useEffect(() => {
    const onKey = (event) => { if (event.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    closeRef.current?.focus()
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  const story = en
    ? (enScene?.translation || entry?.story || entry?.guide || scene.narration)
    : (entry?.story || entry?.guide || scene.narration)
  const spots = getMountainDiscoveries(volumeId, scene, node, beast)
  const note = getMountainJournalNote(scene.id)
  const frame = getMountainFrame(scene.id, volumeId, index, scene.node)
  const ornaments = getMountainOrnaments(scene.id, volumeId, index)
  const kicker = en ? (enScene?.kicker || scene.kicker) : scene.kicker
  const nodeTitle = en ? (enScene?.title?.split(' · ')[0] || scene.node) : scene.node
  const quote = en ? (enVolume?.scenes?.[scene.id]?.translation || scene.quote) : scene.quote
  return (
    <div className="mountain-journal-backdrop" onWheel={(event) => event.stopPropagation()} onTouchEnd={(event) => event.stopPropagation()} onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}>
      <aside className="mountain-journal-scroll" role="dialog" aria-modal="true" aria-label={en ? `${nodeTitle} journal` : `${scene.node}山志`}>
        <div className="mountain-journal-art" style={{ backgroundImage: `url("${frame}")` }} aria-hidden="true">
          <div className="mountain-journal-ornament mountain-journal-ornament--top" style={{ backgroundImage: `url("${ornaments.top}")` }} />
          <div className="mountain-journal-ornament mountain-journal-ornament--bottom" style={{ backgroundImage: `url("${ornaments.bottom}")` }} />
        </div>
        <div className="mountain-journal-page">
        <div className="mountain-journal-topline">
          <span>{en ? 'Mountain journal' : '山海志'} · {String(index).padStart(2, '0')} / {String(total).padStart(2, '0')}</span>
          <button type="button" ref={closeRef} onClick={onClose} aria-label={en ? 'Close the mountain journal' : '合上山志'}>{en ? 'Close' : '合卷'} <span aria-hidden>×</span></button>
        </div>
        <div className="mountain-journal-hero">
          <span className="mountain-journal-seal" aria-hidden>山<br />海</span>
          <p>{kicker}</p>
          <h2>{nodeTitle}</h2>
          <small>{tt(entry?.caption) || (en ? 'Along the range' : '循山而行')}</small>
        </div>
        <div className="mountain-journal-content">
          {note ? (
            <>
              <section>
                <h3><span>一</span> {en ? 'The Mountain' : '山川考'}</h3>
                <div className="mountain-journal-spots">
                  {note.survey.map((item, i) => <div key={item.name}><b>{String(i + 1).padStart(2, '0')}</b><strong>{tt(item.name)}</strong><p>{tt(item.note)}</p></div>)}
                </div>
              </section>
              <section>
                <h3><span>二</span> {en ? 'Things of the Hills' : '方物志'}</h3>
                <div className="mountain-journal-spots">
                  {note.objects.map((item, i) => <div key={item.name}><b>{String(i + 1).padStart(2, '0')}</b><strong>{tt(item.name)}</strong><p>{tt(item.note)}</p></div>)}
                </div>
                {note.omen && <p className="mountain-journal-note">{en ? 'Omen read: ' : '征兆释义：'}{tt(note.omen)}</p>}
              </section>
              <section>
                <h3><span>三</span> {en ? 'Travel Notes' : '行记'}</h3>
                <p>{tt(note.note)}</p>
              </section>
            </>
          ) : (
            <>
              <section>
                <h3><span>一</span> {en ? 'Seen in the Mountains' : '山中见闻'}</h3>
                <p className="mountain-journal-lead">{tt(entry?.lead) || nodeTitle}</p>
                <p>{story}</p>
              </section>
              <section>
                <h3><span>二</span> {en ? 'From the Classic' : '经文摘录'}</h3>
                <blockquote>{quote}</blockquote>
                <p className="mountain-journal-note">{en ? 'Excerpted from the Classic of Mountains and Seas as used on this site; the imagery and travel narration are visual interpretation.' : '选自本站采用的《山海经》经文片段；画面与行旅叙述为视觉演绎。'}</p>
              </section>
              {spots.length > 0 && <section>
                <h3><span>三</span> {en ? 'Marks in the Painting' : '画中寻迹'}</h3>
                <div className="mountain-journal-spots">
                  {spots.map((spot, i) => <div key={spot.name}><b>{String(i + 1).padStart(2, '0')}</b><strong>{t(spot.label ?? { zh: spot.name, en: spot.name })}</strong><p>{t(spot.note)}</p></div>)}
                </div>
              </section>}
            </>
          )}
        </div>
        <div className="mountain-journal-foot">{en ? 'Along the range · Back to the scroll' : '循山而行 · 再入画中'}</div>
        </div>
      </aside>
    </div>
  )
}
