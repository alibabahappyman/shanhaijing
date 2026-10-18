import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useLang } from '../i18n/LanguageContext.jsx'
import './WorldAtlas.css'

const GROUPS = [
  ['all', { zh: '寰宇总览', en: 'Whole Realm' }, { zh: '十七篇', en: '17 Volumes' }],
  ['mountain', { zh: '五藏山经', en: 'Mountains' }, { zh: '五卷', en: '5 Volumes' }],
  ['inner', { zh: '海内经', en: 'Within the Seas' }, { zh: '四卷', en: '4 Volumes' }],
  ['outer', { zh: '海外经', en: 'Beyond the Seas' }, { zh: '四卷', en: '4 Volumes' }],
  ['wild', { zh: '大荒经', en: 'Great Wilderness' }, { zh: '四卷', en: '4 Volumes' }],
]
const GROUP_NAME = {
  mountain: { zh: '五藏山经', en: 'Five Mountain Classics' },
  inner: { zh: '海内经', en: 'Regions Within the Seas' },
  outer: { zh: '海外经', en: 'Regions Beyond the Seas' },
  wild: { zh: '大荒经', en: 'Great Wilderness' },
}
// 点位只表示原书篇章方位与阅读层次，不表示真实地理坐标。
const VOLUMES = [
  { id: 'nanshan', title: { zh: '南山经', en: 'Southern Mountains' }, group: 'mountain', x: 49, y: 65, line: { zh: '山之南，水之滨', en: 'South of the mountains, along the waters' }, note: { zh: '从南方群山出发，循山川、草木与异兽之迹。', en: 'Begin among the southern ranges, tracing the paths of mountains, rivers, plants and strange beasts.' }, ready: true },
  { id: 'xishan', title: { zh: '西山经', en: 'Western Mountains' }, group: 'mountain', x: 35, y: 49, line: { zh: '昆仑之丘，神话之西', en: 'The hills of Kunlun, where myth lives in the west' }, note: { zh: '沿西方山系行进，遥望昆仑与诸神的居所。', en: 'Journey along the western ranges, gazing toward Kunlun and the dwellings of the gods.' }, ready: true },
  { id: 'beishan', title: { zh: '北山经', en: 'Northern Mountains' }, group: 'mountain', x: 49, y: 33, line: { zh: '荒原与寒泽', en: 'Wild plains and cold marshes' }, note: { zh: '循北方山脉向寒泽深处，遇见另一种山海气息。', en: 'Follow the northern ranges into the deep cold marshes, where the mountains and seas breathe differently.' }, ready: true },
  { id: 'dongshan', title: { zh: '东山经', en: 'Eastern Mountains' }, group: 'mountain', x: 63, y: 49, line: { zh: '向东，向东，直到海', en: 'Eastward, ever eastward, until the sea' }, note: { zh: '沿群山向东而行，让经文中的山川逐一显现。', en: 'Walk east along the ranges, and let the mountains and rivers of the classic reveal themselves one by one.' }, ready: true },
  { id: 'zhongshan', title: { zh: '中山经', en: 'Central Mountains' }, group: 'mountain', x: 49, y: 49, line: { zh: '天下之中', en: 'The heart of all under heaven' }, note: { zh: '山脉在此交汇，水道与万物向四方延展。', en: 'Here the ranges converge; waterways and all living things reach outward in every direction.' }, ready: true },
  { id: 'haineinan', title: { zh: '海内南经', en: 'Within the Seas: South' }, group: 'inner', x: 39, y: 71, line: { zh: '海内之南', en: 'The southern lands within the seas' }, note: { zh: '海内诸地的南方见闻与奇异物产。', en: 'Southern encounters and marvels of the lands within the seas.' } },
  { id: 'haineixi', title: { zh: '海内西经', en: 'Within the Seas: West' }, group: 'inner', x: 28, y: 59, line: { zh: '海内之西', en: 'The western lands within the seas' }, note: { zh: '向西展开的方国、山川与传说。', en: 'Kingdoms, mountains and legends unfolding toward the west.' } },
  { id: 'haineibei', title: { zh: '海内北经', en: 'Within the Seas: North' }, group: 'inner', x: 60, y: 28, line: { zh: '海内之北', en: 'The northern lands within the seas' }, note: { zh: '北方海内的道路与神异之物。', en: 'Roads and wondrous things of the northern regions within the seas.' } },
  { id: 'haineidong', title: { zh: '海内东经', en: 'Within the Seas: East' }, group: 'inner', x: 71, y: 39, line: { zh: '海内之东', en: 'The eastern lands within the seas' }, note: { zh: '海内东方的水脉与异闻。', en: 'Eastern waters and strange tales within the seas.' } },
  { id: 'haiwainan', title: { zh: '海外南经', en: 'Beyond the Seas: South' }, group: 'outer', x: 50, y: 86, line: { zh: '渡海向南', en: 'Crossing the sea, heading south' }, note: { zh: '越过海岸，进入诸国与异人的叙事。', en: 'Past the shoreline, into the tales of many kingdoms and uncanny peoples.' } },
  { id: 'haiwaixi', title: { zh: '海外西经', en: 'Beyond the Seas: West' }, group: 'outer', x: 16, y: 49, line: { zh: '渡海向西', en: 'Crossing the sea, heading west' }, note: { zh: '海的另一侧，是更辽远的西方世界。', en: 'On the far shore lies a vaster western world.' } },
  { id: 'haiwaibei', title: { zh: '海外北经', en: 'Beyond the Seas: North' }, group: 'outer', x: 50, y: 14, line: { zh: '渡海向北', en: 'Crossing the sea, heading north' }, note: { zh: '北海之外，方国与神话继续伸展。', en: 'Beyond the northern sea, kingdoms and myths stretch onward.' } },
  { id: 'haiwaidong', title: { zh: '海外东经', en: 'Beyond the Seas: East' }, group: 'outer', x: 83, y: 49, line: { zh: '渡海向东', en: 'Crossing the sea, heading east' }, note: { zh: '海的东面，打开另一圈想象中的疆域。', en: 'East of the sea opens another circle of imagined territory.' } },
  { id: 'dahuangnan', title: { zh: '大荒南经', en: 'Great Wilderness: South' }, group: 'wild', x: 75, y: 84, line: { zh: '南方大荒', en: 'The southern wilderness' }, note: { zh: '天地边缘的神木、山川与远古传说。', en: 'Divine trees, mountains and ancient legends at the edge of heaven and earth.' } },
  { id: 'dahuangxi', title: { zh: '大荒西经', en: 'Great Wilderness: West' }, group: 'wild', x: 10, y: 64, line: { zh: '西方大荒', en: 'The western wilderness' }, note: { zh: '远离山行之路，走进辽阔的神话时空。', en: 'Far from the mountain roads, into a vast expanse of mythic time and space.' } },
  { id: 'dahuangbei', title: { zh: '大荒北经', en: 'Great Wilderness: North' }, group: 'wild', x: 22, y: 16, line: { zh: '北方大荒', en: 'The northern wilderness' }, note: { zh: '在北方尽处，天地与神灵的故事相遇。', en: 'At the far north, the stories of heaven, earth and the gods meet.' } },
  { id: 'dahuangdong', title: { zh: '大荒东经', en: 'Great Wilderness: East' }, group: 'wild', x: 87, y: 68, line: { zh: '东方大荒', en: 'The eastern wilderness' }, note: { zh: '日出之处，远古叙事仍在延伸。', en: 'Where the sun rises, the ancient narrative still unfolds.' } },
]

export default function WorldAtlas() {
  const { t, lang } = useLang()
  const navigate = useNavigate()
  const [group, setGroup] = useState('all')
  const [selectedId, setSelectedId] = useState('dongshan')
  const [catalogOpen, setCatalogOpen] = useState(false)
  const [view, setView] = useState({ zoom: 1, x: 0, y: 0 })
  const viewRef = useRef(view)
  const viewportRef = useRef(null)
  const worldRef = useRef(null)
  const drag = useRef(null)
  const selected = VOLUMES.find((volume) => volume.id === selectedId)
  const applyView = (next) => {
    const viewport = viewportRef.current
    const world = worldRef.current
    if (!viewport || !world) return
    const zoom = Math.max(1, Math.min(1.8, next.zoom))
    const availableX = Math.max(0, (world.offsetWidth * zoom - viewport.clientWidth) / 2 - 2)
    const availableY = Math.max(0, (world.offsetHeight * zoom - viewport.clientHeight) / 2 - 2)
    const atOverview = zoom <= 1.01
    const limitX = atOverview && viewport.clientWidth > 640 ? Math.min(64, availableX) : availableX
    const limitY = atOverview ? 0 : availableY
    const clamped = { zoom, x: Math.max(-limitX, Math.min(limitX, next.x)), y: Math.max(-limitY, Math.min(limitY, next.y)) }
    viewRef.current = clamped
    setView(clamped)
  }
  const zoomAt = (nextZoom, pointX = 0, pointY = 0) => {
    const current = viewRef.current
    const zoom = Math.max(1, Math.min(1.8, nextZoom))
    const ratio = zoom / current.zoom
    applyView({ zoom, x: current.x + (pointX - current.x) * (1 - ratio), y: current.y + (pointY - current.y) * (1 - ratio) })
  }
  useEffect(() => {
    const node = viewportRef.current
    const onWheel = (event) => {
      event.preventDefault()
      const bounds = node.getBoundingClientRect()
      const x = event.clientX - bounds.left - bounds.width / 2
      const y = event.clientY - bounds.top - bounds.height / 2
      zoomAt(viewRef.current.zoom * Math.exp(-event.deltaY * .0012), x, y)
    }
    node.addEventListener('wheel', onWheel, { passive: false })
    const onResize = () => applyView(viewRef.current)
    window.addEventListener('resize', onResize)
    return () => { node.removeEventListener('wheel', onWheel); window.removeEventListener('resize', onResize) }
  }, [])
  const selectGroup = (next) => {
    setGroup(next)
    if (next !== 'all' && selected.group !== next) setSelectedId(VOLUMES.find((volume) => volume.group === next).id)
  }
  const startDrag = (event) => {
    if (event.target.closest?.('.atlas-pin')) return
    drag.current = { x: event.clientX, y: event.clientY, left: viewRef.current.x, top: viewRef.current.y }
    event.currentTarget.setPointerCapture(event.pointerId)
  }
  const moveDrag = (event) => {
    if (drag.current) applyView({ zoom: viewRef.current.zoom, x: drag.current.left + event.clientX - drag.current.x, y: drag.current.top + event.clientY - drag.current.y })  }

  return <main className="atlas-page">
    <Link className="atlas-bestiary-entry" to="/bestiary"><span>{t({ zh: '山海百灵', en: 'Beasts & Spirits' })}</span><small>{t({ zh: '异兽主题图鉴 ↗', en: 'Creature compendium ↗' })}</small></Link>
    <Link className="atlas-bestiary-entry atlas-dahuang-entry" to="/dahuang"><span>{t({ zh: '大荒拾遗', en: 'Wilderness Relics' })}</span><small>{t({ zh: '神话卡牌 ↗', en: 'Myth card collection ↗' })}</small></Link>
    <div className="atlas-map-viewport" ref={viewportRef} onPointerDown={startDrag} onPointerMove={moveDrag} onPointerUp={() => { drag.current = null }} onPointerCancel={() => { drag.current = null }} aria-label={t({ zh: '山海经篇章总地图', en: 'Master map of the Mountains and Seas chapters' })}>
      <div className="atlas-map-world" ref={worldRef} style={{ transform: `translate(${view.x}px, ${view.y}px) scale(${view.zoom})` }}>
        <img className="atlas-map-art" src="/assets/atlas/shanhai-ink-map.png" alt="" draggable="false" />
      </div>
      <div className="atlas-pin-layer" style={{ transform: `translate(${view.x}px, ${view.y}px) scale(${view.zoom})` }}>
        {VOLUMES.map((volume) => <button key={volume.id} type="button" className={`atlas-pin atlas-pin--${volume.group}${selectedId === volume.id ? ' is-selected' : ''}${group !== 'all' && group !== volume.group ? ' is-dimmed' : ''}${volume.ready ? ' is-ready' : ''}`} style={{ left: `${volume.x}%`, top: `${volume.y}%` }} onClick={() => { setSelectedId(volume.id); setGroup(volume.group) }} aria-label={`${t({ zh: '查看', en: 'View' })} ${t(volume.title)}`} aria-pressed={selectedId === volume.id}><span className="atlas-pin-label">{t(volume.title)}</span><span className="atlas-pin-dot"/></button>)}
      </div>
    </div>
    <div className="atlas-vignette" aria-hidden="true" />
    <header className="atlas-head"><span className="atlas-head-seal">{lang === 'en' ? <>SH<br />J</> : <>山<br />海</>}</span><span>{t({ zh: '山海行卷 · 山海经图志', en: 'The Wandering Myth · A Shan Hai Jing Gazetteer' })}</span><span className="atlas-head-aside">{t({ zh: '山川为路 · 图卷为引', en: 'Mountains as Roads · Scrolls as Guides' })}</span><span className="atlas-head-actions"><button type="button" className="atlas-replay-intro" onClick={() => { sessionStorage.removeItem('shx-intro-done'); window.dispatchEvent(new Event('shx-replay-intro')); }} aria-label={t({ zh: '重看卷首封面', en: 'Replay the frontispiece cover' })}>{t({ zh: '重看卷首', en: 'Replay Cover' })}</button><Link className="atlas-editor-note-link" to="/editor-note" aria-label={t({ zh: '阅读编者有话说', en: 'Read the Editor\'s Note' })}><span className="atlas-editor-note-seal" aria-hidden="true">{lang === 'en' ? 'N' : '卷'}</span><span>{t({ zh: '编者有话说', en: 'Editor\'s Note' })}</span><span aria-hidden="true">↗</span></Link></span></header>
    <div className="atlas-title"><span className="atlas-title-side">{lang === 'en' ? 'THE WORLD OF SHAN HAI JING' : 'THE WORLD OF SHAN HAI JING'}</span><h1>{t({ zh: '山海寰宇图', en: 'The World of Mountains and Seas' })}</h1><p>{t({ zh: '循山川 · 渡四海 · 至大荒', en: 'Follow the mountains · Cross the four seas · Reach the Great Wilderness' })}</p></div>
    <nav className="atlas-groups" aria-label={t({ zh: '地图区域', en: 'Map regions' })}>{GROUPS.map(([id, name, count]) => <button key={id} className={group === id ? 'is-active' : ''} onClick={() => selectGroup(id)} aria-pressed={group === id}><span>{t(name)}</span><small>{t(count)}</small></button>)}</nav>
    <section className="atlas-detail" key={selected.id} aria-label={t({ zh: '所选篇章', en: 'Selected chapter' })}>
      <div className="atlas-detail-heading"><span>{t(GROUP_NAME[selected.group])} · {selected.ready || selected.group === 'inner' || selected.group === 'outer' ? t({ zh: '已展开', en: 'Open for reading' }) : t({ zh: '篇章预览', en: 'Chapter preview' })}</span><b>{String(VOLUMES.indexOf(selected) + 1).padStart(2, '0')} / {VOLUMES.length}</b></div>
      <h2>{t(selected.title)}</h2><p className="atlas-detail-line">{t(selected.line)}</p><p className="atlas-detail-note">{t(selected.note)}</p>
      {selected.group === 'inner' || selected.group === 'outer'
        ? <Link className="atlas-enter" to={`/haijing/${selected.group}?jing=${selected.id}`}>{selected.group === 'outer' ? t({ zh: '渡海巡游', en: 'Voyage Beyond the Seas' }) : t({ zh: '展开山川方志', en: 'Unfold the Gazetteer' })} <span aria-hidden>↗</span></Link>
        : selected.ready ? <Link className="atlas-enter" to={`/scroll/${selected.id}`}>{t({ zh: '入卷漫游', en: 'Enter the Scroll' })} <span aria-hidden>↗</span></Link> : selected.group === 'wild'
        ? <button type="button" className="atlas-enter atlas-enter--cards" onClick={() => navigate(`/dahuang?jing=${selected.id}`)}>{t({ zh: '翻开神话卡牌', en: 'Open the Myth Cards' })} <span aria-hidden>↗</span></button>
        : <span className="atlas-enter atlas-enter--pending">{t({ zh: '篇章待展开', en: 'Chapter Coming Soon' })} <span aria-hidden>◇</span></span>}
    </section>
    <div className="atlas-tools"><button className="atlas-catalog-toggle" onClick={() => setCatalogOpen((value) => !value)} aria-expanded={catalogOpen} aria-controls="atlas-catalog">{catalogOpen ? t({ zh: '收起目录', en: 'Hide Contents' }) : t({ zh: '篇章目录', en: 'Chapter Contents' })} <span aria-hidden>{catalogOpen ? '×' : '☷'}</span></button></div>
    {catalogOpen && <aside className="atlas-catalog" id="atlas-catalog"><div className="atlas-catalog-head"><span>{t({ zh: '山海篇章', en: 'Chapters of Mountains and Seas' })}</span><button onClick={() => setCatalogOpen(false)} aria-label={t({ zh: '关闭目录', en: 'Close contents' })}>×</button></div>{GROUPS.slice(1).map(([id, name]) => <div className="atlas-catalog-group" key={id}><h3>{t(name)}</h3>{VOLUMES.filter((volume) => volume.group === id).map((volume) => <button key={volume.id} className={selectedId === volume.id ? 'is-current' : ''} onClick={() => { setSelectedId(volume.id); setGroup(volume.group); setCatalogOpen(false) }}><span>{t(volume.title)}</span><small>{volume.ready || volume.group === 'inner' || volume.group === 'outer' ? t({ zh: '入卷 ›', en: 'Read ›' }) : t({ zh: '预览', en: 'Preview' })}</small></button>)}</div>)}</aside>}
    <p className="atlas-disclaimer">{t({ zh: '本图依据篇章方位创作，不指代真实地理坐标', en: 'This map follows the directional layout of the chapters, not real geography' })}</p>
  </main>
}
