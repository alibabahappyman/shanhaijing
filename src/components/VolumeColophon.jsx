import { Link } from 'react-router-dom'
import { useLang } from '../i18n/LanguageContext.jsx'
import './VolumeColophon.css'

export default function VolumeColophon({ data, enVolume, jingList, active, onReplay, bestiaryReturn }) {
  const { t, lang } = useLang()
  const current = jingList.findIndex((volume) => volume.id === data.id)
  const next = jingList.slice(current + 1).find((volume) => volume.ready)
  const first = data.scenes[0]?.node
  const last = data.scenes[data.scenes.length - 1]?.node

  return (
    <div className={`volume-colophon volume-colophon--${data.id}${active ? ' is-active' : ''}`} style={{ '--colophon-accent': jingList[current]?.theme.accent || '#986344' }}>
      <div className="volume-colophon-landscape" style={{ backgroundImage: `url('/assets/atlas/passage-${data.id}.webp')` }} aria-hidden="true" />
      <div className="volume-colophon-paper" aria-hidden="true" />

      <div className="volume-colophon-content">
        <p className="volume-colophon-overline"><span>{lang === 'en' ? 'Shan Hai Jing Scrolls' : '山海图志'}</span><i />{lang === 'en' ? (enVolume?.title || data.title) : data.title} · {lang === 'en' ? 'Colophon' : '跋'}</p>
        <div className="volume-colophon-heading">
          <span className="volume-colophon-volume" aria-hidden="true">{lang === 'en' ? (enVolume?.title || data.title) : data.title}</span>
          <div>
            <p className="volume-colophon-kicker">{lang === 'en' ? `Stop ${String(data.scenes.length).padStart(2, '0')} · End of the scroll` : `山行第 ${String(data.scenes.length).padStart(2, '0')} 站 · 卷终`}</p>
            <h2>{lang === 'en' ? 'The Journey Rests' : '山行至此'}</h2>
            <p className="volume-colophon-subtitle">{lang === 'en' ? 'This scroll is closed, yet mountains and seas go on.' : '此卷已收，山海未尽。'}</p>
          </div>
        </div>

        <div className="volume-colophon-itinerary" aria-label={lang === 'en' ? `This classic runs from ${first} to ${last}, ${data.scenes.length} mountains in all` : `本经从${first}行至${last}，共${data.scenes.length}座山`}>
          <span>{first}</span>
          <div className="volume-colophon-track" aria-hidden="true">
            {data.scenes.map((scene, index) => <i key={scene.id} className={index === data.scenes.length - 1 ? 'is-last' : ''} />)}
          </div>
          <span>{last}</span>
        </div>

        <p className="volume-colophon-note">{lang === 'en' ? (enVolume?.finale?.note || data.finale.note) : data.finale.note}</p>
        <blockquote className="volume-colophon-quote">{lang === 'en' ? (enVolume?.finale?.quote || data.finale.quote) : data.finale.quote}</blockquote>

        <div className="volume-colophon-actions">
          {next && <Link className="volume-colophon-next" to={`/scroll/${next.id}`}>{lang === 'en' ? 'Continue the journey' : '继续行山'} <span>{t(next.name)}</span><b aria-hidden="true">↗</b></Link>}
          {bestiaryReturn?.type
            ? <Link className="volume-colophon-back" to={`/bestiary?type=${bestiaryReturn.type}${bestiaryReturn.beast ? `&beast=${bestiaryReturn.beast}` : ''}`}>{lang === 'en' ? 'Back to the Bestiary' : '返回山海百灵'} <span aria-hidden="true">↗</span></Link>
            : <Link className="volume-colophon-back" to="/">{lang === 'en' ? 'Back to the atlas' : '返回山海总图'} <span aria-hidden="true">↗</span></Link>}
          <button type="button" className="volume-colophon-replay" onClick={onReplay}>{lang === 'en' ? 'Revisit this scroll' : '回看本经'} <span aria-hidden="true">↶</span></button>
        </div>
      </div>

      <div className="volume-colophon-stamp" aria-hidden="true"><span>卷</span><span>终</span></div>
      <div className="volume-colophon-side" aria-hidden="true">{lang === 'en' ? 'Mountains for roads · scrolls for guides' : '山川为路 · 图卷为引'}</div>
    </div>
  )
}
