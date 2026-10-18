import { useMemo } from 'react'

// 连续古地图底层：四经首尾相接成一条完整山系链
// 每段占 SEG_W 地图单位，段间用"水行连接段"（乘船虚线）衔接
const SEG_W = 1200
const MAP_H = 700

// 由节点坐标算出世界坐标
export function nodeWorldX(segIndex, node) {
  return segIndex * SEG_W + node.x
}

// 段间水行连接线（按数据的段数过滤，适配不同经的段数）
export const LINKS = [
  { from: { seg: 0, idx: 11 }, to: { seg: 1, idx: 0 } }, // 东山：竹山 → 空桑
  { from: { seg: 1, idx: 11 }, to: { seg: 2, idx: 0 } }, // 东山：碷 → 尸胡（下海）
  { from: { seg: 2, idx: 7 }, to: { seg: 3, idx: 0 } }, // 东山：无皋 → 北号（登岛）
  { from: { seg: 0, idx: 13 }, to: { seg: 1, idx: 0 } }, // 北山：隄山 → 管涔
  { from: { seg: 1, idx: 14 }, to: { seg: 2, idx: 0 } }, // 北山：敦题 → 归山
]

// 确定性伪随机（同一片"山"每次渲染位置一致）
function rand(seed) {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453
  return x - Math.floor(x)
}

// 简化山形：三两笔折线
function MountainGlyph({ x, y, s, seed, major = false }) {
  const p = []
  for (let i = 0; i <= 6; i++) {
    const dx = -40 + i * 13.5
    const dy = -Math.sin(i * 1.05 + seed * 6) * 18 - rand(seed + i) * 8
    p.push(`${x + dx * s},${y + dy * s}`)
  }
  return (
    <polyline
      points={p.join(' ')}
      fill="none"
      stroke={major ? 'rgba(58,49,40,0.55)' : 'rgba(58,49,40,0.22)'}
      strokeWidth={(major ? 2.5 : 1.5) * s}
      strokeLinecap="round"
    />
  )
}

// 云纹：几段圆弧
function CloudGlyph({ x, y, s }) {
  return (
    <g transform={`translate(${x},${y}) scale(${s})`} stroke="rgba(58,49,40,0.18)" fill="none" strokeWidth={1.2}>
      <path d="M-30,0 q8,-14 22,-8 q6,-12 20,-6 q14,-4 16,8" />
      <path d="M-18,6 q10,-8 40,-4" />
    </g>
  )
}

// 波浪：渡海/登岛段的海纹
function WaveGlyph({ x, y, s }) {
  return (
    <g transform={`translate(${x},${y}) scale(${s})`} stroke="rgba(58,81,99,0.3)" fill="none" strokeWidth={1.3}>
      <path d="M-36,0 q9,-8 18,0 t18,0 t18,0 t18,0" />
      <path d="M-24,10 q9,-8 18,0 t18,0 t18,0" />
    </g>
  )
}

// 动态实景层：webp 动图叠加在对应主山上（跟随相机飞行）
// key: 场景 id → { seg, node: 山名, file, x/y/w: 相对节点锚点的偏移与宽（地图单位） }
// file 按经分目录：assets/motion/东|北|…/<scene>.webp
const MOTION_LAYERS = [
  { scene: 'shuzhu', seg: 0, node: '樕䘄山', file: '/assets/motion/dong/shuzhu.webp', x: -165, y: -80, w: 330 },
  { scene: 'congzhuang', seg: 0, node: '栒状山', file: '/assets/motion/dong/congzhuang.webp', x: -165, y: -80, w: 330 },
  { scene: 'taishan', seg: 0, node: '泰山', file: '/assets/motion/dong/taishan.webp', x: -165, y: -80, w: 330 },
  { scene: 'kongsang', seg: 1, node: '空桑山', file: '/assets/motion/dong/kongsang.webp', x: -165, y: -80, w: 330 },
  { scene: 'yueyu', seg: 1, node: '余峨山', file: '/assets/motion/dong/yueyu.webp', x: -165, y: -80, w: 330 },
  { scene: 'gengshan', seg: 1, node: '耿山', file: '/assets/motion/dong/gengshan.webp', x: -165, y: -80, w: 330 },
  { scene: 'beishan', seg: 1, node: '碷山', file: '/assets/motion/dong/beishan.webp', x: -165, y: -80, w: 330 },
  { scene: 'shihu', seg: 2, node: '尸胡山', file: '/assets/motion/dong/shihu.webp', x: -165, y: -80, w: 330 },
  { scene: 'zhizhong', seg: 2, node: '跂踵山', file: '/assets/motion/dong/zhizhong.webp', x: -165, y: -80, w: 330 },
  { scene: 'mouyu', seg: 2, node: '踇隅山', file: '/assets/motion/dong/mouyu.webp', x: -165, y: -80, w: 330 },
  { scene: 'beihao', seg: 3, node: '北号山', file: '/assets/motion/dong/beihao.webp', x: -165, y: -80, w: 330 },
  { scene: 'nuzheng', seg: 3, node: '女烝山', file: '/assets/motion/dong/nuzheng.webp', x: -165, y: -80, w: 330 },
  { scene: 'shanshan', seg: 3, node: '剡山', file: '/assets/motion/dong/shanshan.webp', x: -165, y: -80, w: 330 },
  { scene: 'qinshan', seg: 3, node: '钦山', file: '/assets/motion/dong/qinshan.webp', x: -165, y: -80, w: 330 },
  // 北山经（assets/motion/bei/，按场景 id 命名）
  { scene: 'danhu', seg: 0, node: '单张山', file: '/assets/motion/bei/danzhang.webp', x: -165, y: -80, w: 330 },
  { scene: 'danxun', seg: 0, node: '丹熏山', file: '/assets/motion/bei/danxun.webp', x: -165, y: -80, w: 330 },
  { scene: 'guanti', seg: 0, node: '灌题山', file: '/assets/motion/bei/guanti.webp', x: -165, y: -80, w: 330 },
  { scene: 'daxian', seg: 0, node: '大咸山', file: '/assets/motion/bei/daxian.webp', x: -165, y: -80, w: 330 },
  { scene: 'guancen', seg: 1, node: '管涔山', file: '/assets/motion/bei/guancen.webp', x: -165, y: -80, w: 330 },
  { scene: 'gouwu', seg: 1, node: '钩吾山', file: '/assets/motion/bei/gouwu.webp', x: -165, y: -80, w: 330 },
  { scene: 'shaoxian', seg: 1, node: '少咸山', file: '/assets/motion/bei/shaoxian.webp', x: -165, y: -80, w: 330 },
  { scene: 'dunti', seg: 1, node: '敦题山', file: '/assets/motion/bei/dunti.webp', x: -165, y: -80, w: 330 },
  { scene: 'macheng', seg: 2, node: '马成山', file: '/assets/motion/bei/macheng.webp', x: -165, y: -80, w: 330 },
  { scene: 'fajiu', seg: 2, node: '发鸠山', file: '/assets/motion/bei/fajiu.webp', x: -165, y: -80, w: 330 },
  { scene: 'xuanyuan', seg: 2, node: '轩辕山', file: '/assets/motion/bei/xuanyuan.webp', x: -165, y: -80, w: 330 },
  { scene: 'wufeng', seg: 2, node: '錞于毋逢山', file: '/assets/motion/bei/wufeng.webp', x: -165, y: -80, w: 330 },
  { scene: 'qianwei', seg: 0, node: '钱来山', file: '/assets/motion/西/钱来山.webp', x: -165, y: -80, w: 330 },
  { scene: 'taihua', seg: 0, node: '太华山', file: '/assets/motion/西/太华山.webp', x: -165, y: -80, w: 330 },
  { scene: 'yuanci', seg: 0, node: '羭次山', file: '/assets/motion/西/羭次山.webp', x: -165, y: -80, w: 330 },
  { scene: 'huangshan', seg: 0, node: '黄山', file: '/assets/motion/西/黄山.webp', x: -165, y: -80, w: 330 },
  { scene: 'lutai', seg: 1, node: '鹿台山', file: '/assets/motion/西/鹿台山 .webp', x: -165, y: -80, w: 330 },
  { scene: 'xiaoci', seg: 1, node: '小次山', file: '/assets/motion/西/小次山.webp', x: -165, y: -80, w: 330 },
  { scene: 'huaijiang', seg: 2, node: '槐江山', file: '/assets/motion/西/槐江山.webp', x: -165, y: -80, w: 330 },
  { scene: 'kunlun', seg: 2, node: '昆仑丘', file: '/assets/motion/西/昆仑丘.webp', x: -165, y: -80, w: 330 },
  { scene: 'yushan', seg: 2, node: '玉山', file: '/assets/motion/西/玉山.webp', x: -165, y: -80, w: 330 },
  { scene: "zhang'e", seg: 2, node: '章莪山', file: '/assets/motion/西/章莪山.webp', x: -165, y: -80, w: 330 },
  { scene: 'tianshan', seg: 2, node: '天山', file: '/assets/motion/西/天山.webp', x: -165, y: -80, w: 330 },
  { scene: 'wenyao', seg: 2, node: '泰器山', file: '/assets/motion/西/泰器山.webp', x: -165, y: -80, w: 330 },
  { scene: 'yanzi', seg: 2, node: '崦嵫山', file: '/assets/motion/西/崦嵫山.webp', x: -165, y: -80, w: 330 },
  { scene: 'guishan', seg: 3, node: '邽山', file: '/assets/motion/西/邽山.webp', x: -165, y: -80, w: 330 },
  { scene: 'yanzi4', seg: 3, node: '崦嵫山', file: '/assets/motion/西/崦嵫山后段.webp', x: -165, y: -80, w: 330 },
  // 中山经（assets/motion/中/，按山名命名，10 山齐备）
  { scene: 'xianshan', seg: 0, node: '鲜山', file: '/assets/motion/中/鲜山.webp', x: -165, y: -80, w: 330 },
  { scene: 'yangshan', seg: 0, node: '阳山', file: '/assets/motion/中/阳山.webp', x: -165, y: -80, w: 330 },
  { scene: 'aoanshan', seg: 0, node: '敖岸山', file: '/assets/motion/中/敖岸山.webp', x: -165, y: -80, w: 330 },
  { scene: 'qingyaoshan', seg: 0, node: '青要山', file: '/assets/motion/中/青要山.webp', x: -165, y: -80, w: 330 },
  { scene: 'kushan', seg: 1, node: '苦山', file: '/assets/motion/中/苦山.webp', x: -165, y: -80, w: 330 },
  { scene: 'guyaoshan', seg: 1, node: '姑媱山', file: '/assets/motion/中/姑媱山.webp', x: -165, y: -80, w: 330 },
  { scene: 'fengshan', seg: 1, node: '丰山', file: '/assets/motion/中/丰山.webp', x: -165, y: -80, w: 330 },
  { scene: 'minshan', seg: 1, node: '岷山', file: '/assets/motion/中/岷山.webp', x: -165, y: -80, w: 330 },
  { scene: 'guangshan', seg: 2, node: '光山', file: '/assets/motion/中/光山.webp', x: -165, y: -80, w: 330 },
  { scene: 'dongtingshan', seg: 2, node: '洞庭山', file: '/assets/motion/中/洞庭山.webp', x: -165, y: -80, w: 330 },
  // 南山经（assets/motion/南/，按山名命名，10 山齐备）
  { scene: 'zhaoyao', seg: 0, node: '招摇山', file: '/assets/motion/南/招摇山.webp', x: -165, y: -80, w: 330 },
  { scene: 'zuyang', seg: 0, node: '杻阳山', file: '/assets/motion/南/杻阳山.webp', x: -165, y: -80, w: 330 },
  { scene: 'dishan', seg: 0, node: '柢山', file: '/assets/motion/南/柢山.webp', x: -165, y: -80, w: 330 },
  { scene: 'qingqiu', seg: 0, node: '青丘山', file: '/assets/motion/南/青丘山.webp', x: -165, y: -80, w: 330 },
  { scene: 'guishan', seg: 1, node: '柜山', file: '/assets/motion/南/柜山.webp', x: -165, y: -80, w: 330 },
  { scene: 'yaoguang', seg: 1, node: '尧光山', file: '/assets/motion/南/尧光山.webp', x: -165, y: -80, w: 330 },
  { scene: 'luwu', seg: 1, node: '鹿吴山', file: '/assets/motion/南/鹿吴山.webp', x: -165, y: -80, w: 330 },
  { scene: 'daoguo', seg: 2, node: '祷过山', file: '/assets/motion/南/祷过山.webp', x: -165, y: -80, w: 330 },
  { scene: 'danxue', seg: 2, node: '丹穴山', file: '/assets/motion/南/丹穴山.webp', x: -165, y: -80, w: 330 },
  { scene: 'nanyu', seg: 2, node: '南禺山', file: '/assets/motion/南/南禺山.webp', x: -165, y: -80, w: 330 },
]

export default function MapBackdrop({ data, camX, camY, zoom = 1, routeProgress, activeSeg, sceneNode }) {
  const segCount = data.segments.length

  // 每段的折线路径（世界坐标）与节点
  const segPaths = useMemo(
    () =>
      data.segments.map((seg, si) => ({
        d: seg.nodes.map((n, i) => `${i === 0 ? 'M' : 'L'} ${nodeWorldX(si, n)} ${n.y}`).join(' '),
        nodes: seg.nodes,
        si,
      })),
    [data]
  )

  // 段间水行连接线路径（只取属于当前经的连接：起止段都存在且节点索引有效）
  const linkPaths = useMemo(
    () =>
      LINKS.filter(({ from, to }) => {
        const fs = data.segments[from.seg]
        const ts = data.segments[to.seg]
        return fs?.nodes[from.idx] && ts?.nodes[to.idx]
      }).map(({ from, to }) => {
        const a = data.segments[from.seg].nodes[from.idx]
        const b = data.segments[to.seg].nodes[to.idx]
        const ax = nodeWorldX(from.seg, a)
        const ay = a.y
        const bx = nodeWorldX(to.seg, b)
        const by = b.y
        // 中间加两个控制点做出弧形航线
        const mx = (ax + bx) / 2
        const my = (ay + by) / 2 + 90
        return { d: `M ${ax} ${ay} Q ${mx} ${my} ${bx} ${by}`, ax, ay }
      }),
    [data]
  )

  // 当前场景对应的节点（主山，画大号）
  const majorKey = sceneNode ? `${sceneNode.segIndex}-${sceneNode.nodeIndex}` : null

  // 装饰元素：山沿路线散布，渡海之后换浪纹
  const decor = useMemo(() => {
    const items = []
    data.segments.forEach((seg, si) => {
      const isSea = !!seg.envShift // 渡海/登岛段由数据标记，硬编码 si>=2 会让非海经误铺浪纹
      seg.nodes.forEach((n, ni) => {
        const wx = nodeWorldX(si, n)
        for (let k = 0; k < 4; k++) {
          const ox = (rand(wx + k * 7) - 0.5) * 260
          const oy = (rand(wx + k * 13) - 0.5) * 300
          if (Math.abs(oy) < 40 && k > 1) continue // 别压住路线
          if (isSea) {
            if (rand(wx + k * 3) > 0.55) items.push({ type: 'wave', x: wx + ox, y: n.y + oy + 120, s: 0.9 + rand(wx + k) * 0.6 })
          } else {
            items.push({ type: 'mtn', x: wx + ox, y: n.y + oy + 60, s: 0.8 + rand(wx + k * 3) * 0.8, seed: wx + k })
          }
          if (rand(wx + k * 29) > 0.85) items.push({ type: 'cloud', x: wx + ox, y: n.y + oy - 140, s: 0.8 })
        }
      })
    })
    return items
  }, [data])

  // 当前场景是否有实景 motion 图（有则装饰山/云/浪淡出，让实景独占画面）
  const motionActive = MOTION_LAYERS.some(
    (m) => sceneNode?.segIndex === m.seg && sceneNode?.name === m.node && sceneNode?.id === m.scene
  )

  // 摄影机：地图单位 → viewBox 百分比单位（100×100）
  // 标定：zoom 1 时视野约 357 地图单位（≈ 一座山占满一屏）
  const K = 28
  const tx = 50 - (camX * K) / 100
  const ty = 50 - (camY * K) / 100
  const k = K * zoom

  return (
    <div className="map-backdrop" aria-hidden>
      <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" style={{ width: '100%', height: '100%' }}>
        <defs>
          <filter id="map-rough">
            <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="2" result="n" />
            <feDisplacementMap in="SourceGraphic" in2="n" scale="2.5" />
          </filter>
        </defs>
        <g transform={`translate(${tx} ${ty}) scale(${k / 100})`}>
          {/* 动态实景层：webp 动图，乘法混合融进纸底，仅在该场景站附近淡入 */}
          {/* 独立在 map-rough 滤镜组外：置换噪声会二次搅糊位图，毛边只留给线条装饰 */}
          {MOTION_LAYERS.map((m) => {
            const seg = data.segments[m.seg]
            const on = sceneNode?.segIndex === m.seg && sceneNode?.name === m.node && sceneNode?.id === m.scene
            const node = on ? seg?.nodes[sceneNode.nodeIndex] : seg?.nodes.find((n) => n.name === m.node)
            if (!node) return null
            return (
              <image
                key={m.scene}
                href={m.file}
                x={nodeWorldX(m.seg, node) + m.x}
                y={node.y + m.y}
                width={m.w}
                height={m.w * 0.5625}
                preserveAspectRatio="xMidYMid slice"
                className="motion-layer"
                style={{ opacity: on ? 1 : 0 }}
              />
            )
          })}
        </g>
        <g transform={`translate(${tx} ${ty}) scale(${k / 100})`} filter="url(#map-rough)">
          {/* 底层：装饰山/云/浪（实景站时淡出） */}
          <g opacity={motionActive ? 0 : 0.9} style={{ transition: 'opacity 0.5s ease' }}>
            {decor.map((it, i) =>
              it.type === 'mtn' ? (
                <MountainGlyph key={i} x={it.x} y={it.y} s={it.s} seed={it.seed} />
              ) : it.type === 'wave' ? (
                <WaveGlyph key={i} x={it.x} y={it.y} s={it.s} />
              ) : (
                <CloudGlyph key={i} x={it.x} y={it.y} s={it.s} />
              )
            )}
          </g>

          {/* 中层：段间水行连接线（航线弧线，浅蓝；实景站淡出） */}
          <g opacity={motionActive ? 0 : 1} style={{ transition: 'opacity 0.5s ease' }}>
            {linkPaths.map(({ d }, i) => (
              <path key={`link-${i}`} d={d} fill="none" stroke="rgba(90,120,140,0.45)" strokeWidth={3} strokeDasharray="6 12" strokeLinecap="round" />
            ))}
          </g>

          {/* 上层：主路线（底虚线 + 已行实线，按 routeProgress 逐段生长） */}
          {/* 场景站时非当前段压暗，让主山当主角 */}
          {segPaths.map(({ d, nodes, si }) => {
            const p = Math.min(1, Math.max(0, routeProgress[si] ?? 0))
            const xs = nodes.map((n) => nodeWorldX(si, n))
            const x0 = xs[0]
            const x1 = xs[xs.length - 1]
            const pathLen = (x1 - x0) * 1.25 // 近似长度，足够表现生长
            const visited = p >= 1 ? nodes.length : Math.floor(p * nodes.length + 0.3)
            const dim = (majorKey && si !== activeSeg) || motionActive
            return (
              <g key={si} opacity={dim ? (motionActive ? 0 : 0.15) : 1} style={{ transition: 'opacity 0.6s' }}>
                <path d={d} fill="none" stroke="rgba(58,49,40,0.35)" strokeWidth={3} strokeDasharray="14 10" />
                <path
                  d={d}
                  fill="none"
                  stroke={si === activeSeg ? 'rgba(192,57,43,0.85)' : 'rgba(58,49,40,0.6)'}
                  strokeWidth={4}
                  strokeDasharray={pathLen}
                  strokeDashoffset={pathLen * (1 - p)}
                  style={{ transition: 'stroke-dashoffset 0.2s linear' }}
                />
                {nodes.map((n, ni) => {
                  const wx = nodeWorldX(si, n)
                  const on = ni < visited
                  const isMajor = majorKey === `${si}-${ni}`
                  // 文字用固定地图单位（不乘 zoom）：屏显大小恒定 ≈ 28px
                  const fs = isMajor ? 5.5 : 3.2
                  return (
                    <g key={n.name + ni} style={{ opacity: on ? 1 : 0.35, transition: 'opacity 0.6s' }}>
                      {isMajor && (
                        <g>
                          {/* 大山体：三层叠笔，接近半屏高 */}
                          <MountainGlyph x={wx} y={n.y + 30} s={7} seed={wx} major />
                          <MountainGlyph x={wx - 90} y={n.y + 55} s={4.5} seed={wx + 1} major />
                          <MountainGlyph x={wx + 80} y={n.y + 60} s={3.8} seed={wx + 2} major />
                          {/* 山脚云纹 */}
                          <CloudGlyph x={wx - 140} y={n.y + 80} s={2.2} />
                          <CloudGlyph x={wx + 130} y={n.y + 90} s={1.8} />
                        </g>
                      )}
                      <circle cx={wx} cy={n.y} r={isMajor ? 2.2 : 1.4} fill={isMajor ? '#c0392b' : on ? '#c0392b' : 'rgba(58,49,40,0.5)'} style={{ transition: 'r 0.4s' }} />
                      <text
                        x={wx}
                        y={n.y - 8}
                        textAnchor="middle"
                        fontSize={fs}
                        fontWeight={isMajor ? 700 : 400}
                        fill="rgba(58,49,40,0.9)"
                        style={{ letterSpacing: 1 }}
                      >
                        {n.name}
                      </text>
                    </g>
                  )
                })}
              </g>
            )
          })}
        </g>
      </svg>
    </div>
  )
}
