import { useLang } from '../i18n/LanguageContext.jsx'
import './MountainPassage.css'

// Each stop has a permanent atlas position: the end of A → B is the start of B → C.
const WAYPOINTS = {
  nanshan: [[370, 380], [382, 649], [1116, 407], [1200, 650], [950, 630], [690, 600], [420, 550], [390, 310], [680, 290], [950, 270], [1200, 250], [1210, 470]],
  xishan: [[380, 650], [670, 620], [970, 570], [1210, 490], [1170, 280], [890, 260], [610, 280], [390, 340], [420, 550], [720, 540], [1010, 500], [1210, 630], [1000, 660], [720, 640], [430, 640], [390, 450], [630, 380]],
  beishan: [[380, 630], [650, 590], [900, 620], [1190, 600], [1210, 390], [950, 350], [690, 370], [410, 400], [400, 240], [680, 230], [960, 250], [1220, 250], [1110, 470], [840, 510]],
  dongshan: [[390, 640], [650, 600], [910, 560], [1180, 520], [1210, 330], [990, 260], [720, 290], [440, 350], [400, 540], [670, 510], [930, 470], [1190, 630], [940, 650], [680, 640], [410, 650], [390, 440]],
  zhongshan: [[380, 630], [690, 620], [1010, 580], [1200, 430], [980, 330], [700, 290], [410, 250], [390, 460], [650, 480], [920, 470], [1190, 650], [890, 650]],
}

const pointFor = (id, index) => {
  const points = WAYPOINTS[id] || WAYPOINTS.nanshan
  const [x, y] = points[Math.max(0, Math.min(points.length - 1, index))]
  return { x, y }
}

function routeFor(id, from, to) {
  const start = pointFor(id, from)
  const end = pointFor(id, to)
  const dx = end.x - start.x
  const dy = end.y - start.y
  const distance = Math.hypot(dx, dy) || 1
  const normal = { x: -dy / distance, y: dx / distance }
  const bend = Math.min(70, distance * .16) * Math.sin((Math.min(from, to) + 1) * 1.8) * (to > from ? 1 : -1)
  const middle = { x: (start.x + end.x) / 2 + normal.x * bend, y: (start.y + end.y) / 2 + normal.y * bend }
  const first = [start,
    { x: start.x + dx * .22 + normal.x * bend * .55, y: start.y + dy * .22 + normal.y * bend * .55 },
    { x: middle.x - dx * .15, y: middle.y - dy * .15 }, middle]
  const second = [middle,
    { x: middle.x + dx * .15, y: middle.y + dy * .15 },
    { x: end.x - dx * .22 + normal.x * bend * .55, y: end.y - dy * .22 + normal.y * bend * .55 }, end]
  const path = `M${start.x} ${start.y} C${first[1].x} ${first[1].y} ${first[2].x} ${first[2].y} ${middle.x} ${middle.y} C${second[1].x} ${second[1].y} ${second[2].x} ${second[2].y} ${end.x} ${end.y}`
  return { start, end, first, second, path }
}

function pointOnCurve(points, t) {
  const [a, b, c, d] = points
  const u = 1 - t
  return {
    x: u ** 3 * a.x + 3 * u ** 2 * t * b.x + 3 * u * t ** 2 * c.x + t ** 3 * d.x,
    y: u ** 3 * a.y + 3 * u ** 2 * t * b.y + 3 * u * t ** 2 * c.y + t ** 3 * d.y,
  }
}

const clamp = (value) => Math.min(1, Math.max(0, value))

export default function MountainPassage({ data, enVolume, from, to, progress }) {
  // 局部 t 是行进进度（0→1），与 t() 翻译函数重名，翻译函数记作 tr。
  const { t: tr, lang } = useLang()
  const en = lang === 'en'
  const t = clamp(progress)
  const travel = clamp((t - .13) / .72)
  const route = routeFor(data.id, from, to)
  const curves = [route.first, route.second]
  const previousPath = from > 0 && to > from ? routeFor(data.id, from - 1, from).path : null
  const marker = travel < .5
    ? pointOnCurve(curves[0], travel * 2)
    : pointOnCurve(curves[1], (travel - .5) * 2)
  // 镜头追随沿路线行进的旅人。固定 1600×900 的画布先适配视口，
  // 再从近景退至山川全貌、最后推入下一山；整张地形会真正横穿屏幕。
  const viewportWidth = window.innerWidth
  const viewportHeight = window.innerHeight
  const fit = Math.max(viewportWidth / 1600, viewportHeight / 900)
  const portrait = viewportHeight > viewportWidth
  const zoom = (portrait ? 1.65 : 2.34) - (portrait ? .18 : .43) * Math.sin(Math.PI * travel)
  const cameraScale = fit * zoom
  const cameraX = Math.min(0, Math.max(viewportWidth - 1600 * cameraScale, viewportWidth * .5 - marker.x * cameraScale))
  const cameraY = Math.min(0, Math.max(viewportHeight - 900 * cameraScale, viewportHeight * .49 - marker.y * cameraScale))
  // 英文模式借用 scrollEn 的场景标题（“山名 · English Title”取前半），与山志页保持一致。
  const stationName = (index) => {
    if (index === 0) return en ? 'Open the scroll' : '开卷'
    if (index > data.scenes.length) return en ? 'Close the scroll' : '收卷'
    const scene = data.scenes[index - 1]
    return en ? (enVolume?.scenes?.[scene.id]?.title?.split(' · ')[0] || scene.node) : scene.node
  }
  const source = stationName(from)
  const destination = stationName(to)
  const chapter = data.scenes[Math.min(data.scenes.length - 1, Math.max(0, to - 1))]?.seg ?? 0
  // scrollEn 未收录段落小标题，英文卷名即整行；中文保持「卷名 · 段落」。
  const segmentLabel = en
    ? (enVolume?.title || data.title)
    : [data.title, data.segments[chapter]?.title].filter(Boolean).join(' · ')
  const art = `/assets/atlas/passage-${data.id}.webp`

  return (
    <div className={`sh-passage sh-passage--${data.id}`} style={{ '--passage-progress': t }}>
      <div className="sh-passage-stage" style={{ transform: `translate3d(${cameraX}px, ${cameraY}px, 0) scale(${cameraScale})` }}>
        <div className="sh-passage-art" style={{ backgroundImage: `url('${art}')` }} />
        <div className="sh-passage-art-wash" />
        <svg className="sh-passage-overlay" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <defs>
            <filter id="sh-passage-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="7" />
            </filter>
            <linearGradient id="sh-passage-ink" x1="0" y1="0" x2="1" y2="0">
              <stop stopColor="#8e6549" />
              <stop offset=".52" stopColor="#bb874e" />
              <stop offset="1" stopColor="#88583e" />
            </linearGradient>
          </defs>
          {previousPath && <path className="sh-passage-route-history" d={previousPath} />}
          <path className="sh-passage-route-shadow" d={route.path} />
          <path className="sh-passage-route-base" d={route.path} />
          <path className="sh-passage-route-drawn" d={route.path} pathLength="100" style={{ strokeDashoffset: 100 * (1 - travel) }} />
          {[route.start, route.end].map((spot, index) => (
            <g className={`sh-passage-station ${index === 1 ? 'sh-passage-station--destination' : ''}`} transform={`translate(${spot.x} ${spot.y})`} key={index}>
              <circle r="25" className="sh-passage-station-halo" />
              <circle r="11" className="sh-passage-station-ring" />
              <circle r="3" className="sh-passage-station-core" />
            </g>
          ))}
          <circle cx={marker.x} cy={marker.y} r="16" className="sh-passage-traveler-glow" filter="url(#sh-passage-glow)" />
          <g transform={`translate(${marker.x} ${marker.y})`} className="sh-passage-traveler">
            <circle r="9" />
            <path d="M-16 0h-8 M16 0h8 M0-16v-8 M0 16v8" />
            <circle r="2.5" />
          </g>
        </svg>
      </div>
      <div className="sh-passage-mist sh-passage-mist--near" style={{ transform: `translate3d(${-8 + t * 16}%, 0, 0)` }} />
      <div className="sh-passage-mist sh-passage-mist--far" style={{ transform: `translate3d(${7 - t * 14}%, 0, 0)` }} />
      <div className="sh-passage-caption">
        <span className="sh-passage-caption-kicker">{segmentLabel}</span>
        <div className="sh-passage-caption-line"><span>{source}</span><i /><span>{destination}</span></div>
        <small>{en ? 'Following the mountains and seas' : '循山海而行'} · {tr(data.tagline)}</small>
      </div>
      <div className="sh-passage-index" aria-hidden="true"><span>{String(Math.max(0, from)).padStart(2, '0')}</span><i /><span>{String(Math.max(0, to)).padStart(2, '0')}</span></div>
      <div className="sh-passage-side" aria-hidden="true">{en ? 'Mountain Passage' : '山海行旅'}</div>
    </div>
  )
}
