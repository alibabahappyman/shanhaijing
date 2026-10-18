import { Fragment, useEffect, useMemo, useRef, useState } from 'react'
import { useLang } from '../i18n/LanguageContext.jsx'
import { SCROLL_EN } from '../data/scrollEn.js'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import gsap from 'gsap'
import MapBackdrop, { nodeWorldX } from './MapBackdrop.jsx'
import ScenePanel from './ScenePanel.jsx'
import MountainJournal from './MountainJournal.jsx'
import BeastSpot from './BeastSpot.jsx'
import DetailSpots from './DetailSpots.jsx'
import MountainDiscoveries from './MountainDiscoveries.jsx'
import MountainPassage from './MountainPassage.jsx'
import { EXHIBITION } from '../data/exhibition.js'
import { BEAST_IMAGE_OVERRIDES } from '../data/artLayout.js'
import { getBeastLayout } from '../data/mountainSceneLayout.js'
import { getMountainDiscoveries } from '../data/mountainDiscoveries.js'
import '../styles/exhibition.css' // 仅取地图飞行（sh-route-flight / sh-map）样式，均带 sh- 前缀不与长卷样式冲突
import InkCursor from './InkCursor.jsx'
import VolumeColophon from './VolumeColophon.jsx'
import JourneyIndex from './JourneyIndex.jsx'
import ScrollHeader from './ScrollHeader.jsx'
import TextCurtain from './TextCurtain.jsx'
import './ScenePolish.css'
import './MountainJournal.css'

gsap.registerPlugin(ScrollTrigger)

const STEP_VH = 220 // 每个场景站占用的原生滚动高度（滚一格翻一景的落定感）
const COVER_ART = {
  dongshan: '/assets/covers/cover-dongshan.png',
  beishan: '/assets/covers/cover-beishan.png',
  xishan: '/assets/covers/cover-xishan.png',
  nanshan: '/assets/covers/cover-nanshan.png',
  zhongshan: '/assets/covers/cover-zhongshan.png',
}

export default function ScrollScroll({ data, meta, jingList, initialScene, bestiaryReturn }) {
  const { t, lang } = useLang()
  const en = SCROLL_EN[data.id] || null
  const stageRef = useRef(null)
  const [step, setStep] = useState(0) // 当前所在的站（浮点，用于插值）

  // 站点表：hero + 14 大场景 + finale
  // zoom 分站变焦：大场景贴近（2.5），站间过渡由插值自然产生呼吸感
  const stops = useMemo(() => {
    const list = []
    // hero：全景俯瞰整条山系
    const seg0 = data.segments[0]
    const n0 = seg0.nodes[0]
    list.push({ id: 'hero', type: 'hero', cam: { x: nodeWorldX(0, n0) + 1800, y: 350 }, zoom: 0.09, seg: 0, route: seg0.nodes.map(() => 0) })

    data.scenes.forEach((sc) => {
      const si = sc.seg
      const seg = data.segments[si]
      const candidates = seg.nodes.flatMap((node, index) => node.name === sc.node ? [index] : [])
      const previous = list[list.length - 1]
      // 西山经的槐江山、玉山在同一段里各出现两次。选靠近上一故事站的那一处，
      // 否则镜头到玉山时会突然折回到前半段，实景图也会落在错误的山上。
      const idx = data.id === 'xishan' && candidates.length > 1 && previous?.type === 'scene'
        ? candidates.reduce((best, candidate) => {
          const distance = (index) => Math.hypot(nodeWorldX(si, seg.nodes[index]) - previous.cam.x, seg.nodes[index].y - previous.cam.y)
          return distance(candidate) < distance(best) ? candidate : best
        }, candidates[0])
        : (candidates[0] ?? -1)
      const node = seg.nodes[Math.max(0, idx)]
      // 该段路线生长到这个节点为止
      const route = data.segments.map((s, k) => {
        if (k < si) return 1
        if (k > si) return 0
        return Math.min(1, (Math.max(0, idx) + 0.5) / s.nodes.length)
      })
      list.push({
        id: sc.id,
        type: 'scene',
        scene: sc,
        segIndex: si,
        nodeIndex: Math.max(0, idx),
        node,
        cam: { x: nodeWorldX(si, node), y: node.y },
        zoom: 1, // zoom 1 视野约 357 地图单位：一座山占满一屏
        route,
      })
    })

    const lastSeg = data.segments.length - 1
    const lastNode = data.segments[lastSeg].nodes[data.segments[lastSeg].nodes.length - 1]
    list.push({
      id: 'finale',
      type: 'finale',
      cam: { x: nodeWorldX(lastSeg, lastNode) + 1200, y: 350 },
      zoom: 0.24, // 尾屏拉远，全图尽收
      seg: lastSeg,
      route: data.segments.map(() => 1),
    })
    return list
  }, [data])

  // 原生滚动：pinned 舞台 + 手势驱动精准停靠
  // 不用 snap（快速滚动会跳站），改为劫持滚轮：一次手势 = 精确行进到上一站/下一站，
  // 补间滚动条位置，动画期间加锁丢弃后续手势（与 CGTN《千里江山图》同构）
  const stepRef = useRef(0) // 实时 step（供手势计算目标站）
  const animatingRef = useRef(false)
  const navigateRef = useRef(null)
  const [flight, setFlight] = useState(null) // 站间跳转时的地图路线飞行 {from, to, t}
  const [journalId, setJournalId] = useState(null)
  const [selectedDiscovery, setSelectedDiscovery] = useState(null)
  const [beastRequest, setBeastRequest] = useState(null)

  useEffect(() => {
    const st = ScrollTrigger.create({
      trigger: stageRef.current,
      start: 'top top',
      end: () => `+=${stops.length * STEP_VH}%`,
      pin: true,
      scrub: 0.9,
      onUpdate: (self) => {
        const s = self.progress * (stops.length - 1)
        stepRef.current = s
        setStep(s)
      },
    })

    const n = stops.length - 1
    const goTo = (target) => {
      if (animatingRef.current || target === Math.round(stepRef.current)) return
      animatingRef.current = true
      const proxy = { y: window.scrollY }
      // 行进起点：当前站号（hero=0，场景=索引，finale=最后一站）
      const from = Math.round(stepRef.current)
      if (from !== target) setFlight({ from, to: target, t: 0 })
      gsap.to(proxy, {
        y: st.start + (target / n) * (st.end - st.start),
        duration: 1.25,
        ease: 'power2.inOut',
        onUpdate: () => {
          window.scrollTo({ top: proxy.y, behavior: 'instant' })
          // 用真实滚动进度驱动地图飞行进度（proxy.y 对应的 step）
          const s = ((proxy.y - st.start) / (st.end - st.start)) * n
          setFlight((f) => (f ? { ...f, t: Math.min(1, Math.max(0, (s - from) / (target - from))) } : f))
        },
        onComplete: () => {
          animatingRef.current = false
          setFlight(null)
        },
      })
    }
    navigateRef.current = goTo

    // 循迹入卷：带 ?scene= 进入时，首帧直接落位到对应山站（先瞬移再让 GSAP 刷新锚点）
    if (initialScene) {
      const idx = stops.findIndex((stop) => stop.id === initialScene)
      if (idx > 0) {
        const jump = () => {
          window.scrollTo({ top: st.start + (idx / n) * (st.end - st.start), behavior: 'instant' })
          stepRef.current = idx
          setStep(idx)
          ScrollTrigger.refresh()
        }
        if (document.readyState === 'complete') requestAnimationFrame(jump)
        else window.addEventListener('load', jump, { once: true })
      }
    }

    const onWheel = (e) => {
      if (document.querySelector('.mountain-journal-backdrop')) { e.preventDefault(); return }
      if (e.target instanceof Element && e.target.closest('.scroll-header-menu, .journey-index-sheet, .mountain-journal-scroll, .mountain-discoveries')) return
      // 不在舞台滚动区间内（如页首 hero 之前/页尾之后）不劫持
      if (window.scrollY < st.start - 2 || window.scrollY > st.end + 2) return
      e.preventDefault()
      if (animatingRef.current) return
      const dir = e.deltaY > 0 ? 1 : -1
      const target = Math.min(n, Math.max(0, Math.round(stepRef.current) + dir))
      if (target !== Math.round(stepRef.current)) goTo(target)
      else animatingRef.current = false
    }

    // 触屏：一次滑动 = 一站
    let touchY = null
    const onTouchStart = (e) => (touchY = e.touches[0].clientY)
    const onTouchEnd = (e) => {
      if (document.querySelector('.mountain-journal-backdrop')) return
      if (e.target instanceof Element && e.target.closest('.scroll-header-menu, .journey-index-sheet, .mountain-journal-scroll, .mountain-discoveries')) return
      if (touchY == null) return
      const dy = touchY - e.changedTouches[0].clientY
      touchY = null
      if (Math.abs(dy) < 40 || animatingRef.current) return
      if (window.scrollY < st.start - 2 || window.scrollY > st.end + 2) return
      const dir = dy > 0 ? 1 : -1
      const target = Math.min(n, Math.max(0, Math.round(stepRef.current) + dir))
      if (target !== Math.round(stepRef.current)) goTo(target)
    }

    window.addEventListener('wheel', onWheel, { passive: false })
    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchend', onTouchEnd, { passive: true })
    return () => {
      navigateRef.current = null
      st.kill()
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchend', onTouchEnd)
    }
  }, [stops, initialScene])

  // 在相邻两站之间插值：相机 / zoom / 路线进度
  const i0 = Math.min(stops.length - 1, Math.floor(step))
  const i1 = Math.min(stops.length - 1, i0 + 1)
  const lerp = Math.min(1, Math.max(0, step - i0))
  const ease = lerp * lerp * (3 - 2 * lerp) // smoothstep
  const a = stops[i0]
  const b = stops[i1]
  const camX = a.cam.x + (b.cam.x - a.cam.x) * ease
  const camY = a.cam.y + (b.cam.y - a.cam.y) * ease
  const zoom = a.zoom + (b.zoom - a.zoom) * ease
  const routeProgress = a.route.map((v, k) => v + ((b.route[k] ?? v) - v) * ease)

  const activeSceneId = stops[Math.round(step)]?.type === 'scene' ? stops[Math.round(step)].id : null
  const nearest = stops[Math.round(step)]
  const currentIndex = Math.round(step)
  const journalStop = stops.find((stop) => stop.id === journalId && stop.type === 'scene')
  const journalBeast = journalStop?.scene.beast
    ? data.segments[journalStop.segIndex].beasts?.find((beast) => beast.id === journalStop.scene.beast)
    : null
  const chapter = nearest?.type === 'scene'
    ? lang === 'en'
      ? `Range ${nearest.segIndex + 1} · ${String(currentIndex).padStart(2, '0')} / ${String(data.scenes.length).padStart(2, '0')}`
      : `第${['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二'][nearest.segIndex] || nearest.segIndex + 1}经 · ${String(currentIndex).padStart(2, '0')} / ${String(data.scenes.length).padStart(2, '0')}`
    : ''

  // 墨晕过渡：翻站途中（t 0→1）墨薄膜浮起再散去，站心为 0
  const inkWash = Math.sin(Math.PI * lerp) * 0.5

  return (
    <div className="scroll-engine">
      {/* 原生滚动高度撑开区（pinned 舞台固定在视口） */}
      <div ref={stageRef} className="stage" style={{ height: '100vh', background: 'var(--paper)' }}>
        {/* 古地图底层（连续，随站行进） */}
        <MapBackdrop
          data={data}
          camX={camX}
          camY={camY}
          zoom={zoom}
          routeProgress={routeProgress}
          activeSeg={nearest?.segIndex ?? 0}
          sceneNode={nearest?.type === 'scene' ? { segIndex: nearest.segIndex, nodeIndex: nearest.nodeIndex, name: nearest.scene.node, id: nearest.scene.id } : null}
        />

        {/* 两层轻薄云气以不同速度掠过画幅，保留 WebP 自身的动态主体。 */}
        <div className="scroll-atmosphere" style={{ opacity: activeSceneId ? 1 : 0.35, '--far-shift': `${-step * 7}px`, '--near-shift': `${-step * 19}px` }} aria-hidden>
          <span className="scroll-cloud scroll-cloud-far" />
          <span className="scroll-cloud scroll-cloud-near" />
        </div>

        {/* 站点内容层 */}
        <div className="scene-layer">
          {stops.map((s, i) => {
            if (s.type === 'hero') {
              const on = Math.round(step) === i
              return (
                <section key="hero" className={`scene-panel hero-scene hero-cover hero-cover--${data.id}${lang === 'en' ? ' hero-cover--en' : ''} ${on ? 'active' : ''}`}>
                  <div className="hero-cover-art" aria-hidden>
                    <img src={COVER_ART[data.id]} alt="" />
                  </div>
                  <TextCurtain volumeId={data.id} active={on} onOpen={() => navigateRef.current?.(1)} />
                  <div className="hero-cover-content">
                    <p className="hero-cover-overline"><span>{lang === 'en' ? 'The Wandering Myth' : '山海行卷'}</span><i />{t(EXHIBITION[data.id]?.label) || (lang === 'en' ? 'Tales of Mountains and Streams' : '山川异闻')}</p>
                    <h1 aria-label={en?.title || data.title} className={lang === 'en' ? 'hero-title-en' : undefined}>
                      {lang === 'en'
                        ? (en?.title || data.title)
                        : data.title.split('').map((c, i) => (
                          <span key={i} aria-hidden className="hero-char" style={{ transitionDelay: `${0.15 + i * 0.12}s` }}>
                            {c}
                          </span>
                        ))}
                    </h1>
                    <p className={`tagline${lang === 'en' ? ' tagline-en' : ''}`}>{t(data.tagline) || en?.tagline || data.tagline}</p>
                    {EXHIBITION[data.id]?.intro && <p className="hero-editorial-intro">{t(EXHIBITION[data.id].intro)}</p>}
                    <div className="hero-cover-route"><span>{lang === 'en' ? (en?.scenes?.[data.scenes[0]?.id]?.title || data.scenes[0]?.node).split(' · ')[0] : data.scenes[0]?.node}</span><i aria-hidden />{lang === 'en' ? 'Along the range' : '循山而行'}<i aria-hidden /><span>{lang === 'en' ? (en?.scenes?.[data.scenes[data.scenes.length - 1]?.id]?.title || data.scenes[data.scenes.length - 1]?.node).split(' · ')[0] : data.scenes[data.scenes.length - 1]?.node}</span></div>
                  </div>
                  <span className="hero-cover-seal" aria-hidden>山<br />海</span>
                  <p className="hero-scroll-cue">{lang === 'en' ? 'The journey begins here' : '山行自此始'} <i aria-hidden /> {lang === 'en' ? 'Scroll down to unroll' : '向下滚动亦可展卷'} <span aria-hidden>↓</span></p>
                </section>
              )
            }
            if (s.type === 'scene') {
              // 本站局部进度：站心 0，向前后两站 ±1（驱动题跋流动/显影）
              const local = Math.max(-1, Math.min(1, step - i))
              // 本站异兽图鉴数据（sc.beast 是兽 id，图鉴在 seg.beasts 里）
              const beast = s.scene.beast
                ? data.segments[s.segIndex].beasts?.find((b) => b.id === s.scene.beast)
                : null
              const discoveries = getMountainDiscoveries(data.id, s.scene, s.node, beast)
              const selectedName = selectedDiscovery?.sceneId === s.id ? selectedDiscovery.name : discoveries[0]?.name
              const introSide = (EXHIBITION[data.id]?.scenes?.[s.id]?.side || s.scene.side) === 'right' ? 'right' : 'left'
              return (
                <Fragment key={s.id}>
                  <ScenePanel
                    scene={s.scene}
                    enScene={en?.scenes?.[s.id]}
                    active={activeSceneId === s.id}
                    progress={local}
                    index={i}
                    total={data.scenes.length}
                    entry={EXHIBITION[data.id]?.scenes?.[s.id]}
                    onOpen={() => setJournalId(s.id)}
                  />
                  {beast && activeSceneId === s.id && <BeastSpot
                    beast={{ ...beast, img: BEAST_IMAGE_OVERRIDES[beast.id] || beast.img }}
                    layout={getBeastLayout(data.id, s.id)}
                    scene={s.scene}
                    enScene={en?.scenes?.[s.id]}
                    volumeName={data.title}
                    openSignal={beastRequest?.sceneId === s.id ? beastRequest.nonce : 0}
                    onOpen={() => { setSelectedDiscovery({ sceneId: s.id, name: beast.name }); setBeastRequest(null) }}
                  />}
                  {activeSceneId === s.id && <DetailSpots sceneId={s.id} volumeId={data.id} lang={lang} discoveries={discoveries} selectedName={selectedName} onSelect={(name) => setSelectedDiscovery({ sceneId: s.id, name })} />}
                  {activeSceneId === s.id && <MountainDiscoveries
                    scene={s.scene}
                    enScene={en?.scenes?.[s.id]}
                    items={discoveries}
                    side={introSide === 'right' ? 'left' : 'right'}
                    selectedName={selectedName}
                    onSelect={(name) => setSelectedDiscovery({ sceneId: s.id, name })}
                    onOpenJournal={() => setJournalId(s.id)}
                    onOpenBeast={() => setBeastRequest({ sceneId: s.id, nonce: Date.now() })}
                  />}
                </Fragment>
              )
            }
            // finale
            const on = Math.round(step) === i
            return (
              <section key="finale" className={`scene-panel finale-scene ${on ? 'active' : ''}`}>
                <VolumeColophon data={data} enVolume={en} jingList={jingList} active={on} onReplay={() => navigateRef.current?.(0)} bestiaryReturn={bestiaryReturn} />
              </section>
            )
          })}
        </div>

        {/* 墨晕过渡薄膜：翻站瞬间浮起，站心散去 */}
        <div className="ink-wash" style={{ opacity: inkWash }} aria-hidden />

        {/* 站间跳转的地图路线飞行（GPT 版地图路线移动效果，内嵌保留） */}
        {flight && (() => {
          const t = Math.min(1, Math.max(0, flight.t))
          return (
            <div className={`sh-route-flight sh-route-flight--${data.id} sh-route-flight--sample`} style={{ opacity: Math.min(1, t * 6, (1 - t) * 6) }} aria-hidden>
              <MountainPassage data={data} enVolume={en} from={flight.from} to={flight.to} progress={t} />
            </div>
          )
        })()}

        {/* 宣纸颗粒层：全局极轻噪点，让纸底有纤维毛感 */}
        <div className="paper-grain" aria-hidden />

        <ScrollHeader current={meta} jingList={jingList} isCover={currentIndex === 0} chapter={chapter} bestiaryReturn={bestiaryReturn} />
        {journalStop && <MountainJournal
          scene={journalStop.scene}
          entry={EXHIBITION[data.id]?.scenes?.[journalId]}
          enScene={en?.scenes?.[journalId]}
          enVolume={en}
          index={data.scenes.findIndex((scene) => scene.id === journalId) + 1}
          total={data.scenes.length}
          volumeId={data.id}
          node={journalStop.node}
          beast={journalBeast}
          onClose={() => setJournalId(null)}
        />}
        <InkCursor />
        <JourneyIndex
          scenes={data.scenes}
          current={currentIndex}
          enVolume={en}
          onNavigate={(index) => navigateRef.current?.(index)}
        />
        {currentIndex > 0 && currentIndex <= data.scenes.length && (
          <nav className="scroll-page-turn" aria-label={lang === 'en' ? 'Previous or next mountain' : '山行前后翻页'}>
            <button type="button" onClick={() => navigateRef.current?.(currentIndex - 1)} aria-label={lang === 'en' ? (currentIndex === 1 ? 'Back to the cover' : 'Previous mountain') : (currentIndex === 1 ? '返回本经封面' : '前往上一座山')}>← <span>{lang === 'en' ? 'Back one' : '上一山'}</span></button>
            <span className="scroll-page-turn-count">{String(currentIndex).padStart(2, '0')} <i /> {String(data.scenes.length).padStart(2, '0')}</span>
            <button type="button" onClick={() => navigateRef.current?.(currentIndex + 1)} aria-label={lang === 'en' ? (currentIndex === data.scenes.length ? 'On to the closing page' : 'Next mountain') : (currentIndex === data.scenes.length ? '前往收卷' : '前往下一座山')}><span>{lang === 'en' ? 'Onward' : '下一山'}</span> →</button>
          </nav>
        )}
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${(step / (stops.length - 1)) * 100}%` }} />
        </div>
      </div>
    </div>
  )
}
