import { SPOTS } from './spots.js'
import { PRODUCT_EN } from './productEn.js'
import { getBeastLayout, getSceneZones } from './mountainSceneLayout.js'

// 南山经原先没有逐山的景物光点；这些注释只摘取本站已有的经文与叙述。
// name/note 均为双语 {zh,en}。
const SOUTH_SPOTS = {
  zhaoyao: [
    { x: 67, y: 42, name: { zh: '桂木', en: 'Cassia Trees' }, note: { zh: '招摇之山多桂，临于西海之上。', en: 'Mount Zhaoyao is rich in cassia, standing above the Western Sea.' } },
    { x: 76, y: 66, name: { zh: '西海', en: 'Western Sea' }, note: { zh: '招摇山临于西海之上，是南山行旅的起点。', en: 'Mount Zhaoyao overlooks the Western Sea — the starting point of the southern journey.' } },
  ],
  zuyang: [
    { x: 58, y: 74, name: { zh: '怪水', en: 'Guai Waters' }, note: { zh: '怪水出焉，东流注于宪翼之水。', en: 'The Guai River rises here and flows east into the Xianyi waters.' } },
    { x: 74, y: 51, name: { zh: '玄龟', en: 'Dark Turtle' }, note: { zh: '水中玄龟鸟首虺尾，佩之不聋。', en: 'A dark turtle with a bird\'s head and viper\'s tail lives in the water; worn as an amulet, it guards against deafness.' } },
  ],
  dishan: [
    { x: 72, y: 36, name: { zh: '无草木', en: 'Bare of Plants' }, note: { zh: '柢山多水而无草木。', en: 'Mount Di has much water yet no grass or trees.' } },
    { x: 60, y: 72, name: { zh: '山陵', en: 'Hilltops' }, note: { zh: '鯥居山陵，冬死而夏生。', en: 'The Lu dwells on the hills, dying in winter and coming back to life in summer.' } },
    { x: 77, y: 63, name: { zh: '多水', en: 'Waters Abound' }, note: { zh: '柢山多水，鯥鱼却栖居山陵。', en: 'Mount Di is full of water, yet the Lu fish makes its home on dry heights.' } },
  ],
  qingqiu: [
    { x: 68, y: 77, name: { zh: '英水', en: 'Yingshui River' }, note: { zh: '英水出焉，南流注于即翼之泽。', en: 'The Ying River rises here and flows south into the Jiwi marsh.' } },
    { x: 77, y: 43, name: { zh: '青丘之泽', en: 'Marshes of Qingqiu' }, note: { zh: '这一程在青丘收束，向南进入泽国。', en: 'This leg of the journey closes at Qingqiu, turning south into the marshlands.' } },
  ],
  guishan: [
    { x: 70, y: 42, name: { zh: '丹粟', en: 'Cinnabar Grains' }, note: { zh: '柜山西临流黄，丹粟满山。', en: 'Mount Gui faces Liuhuang to the west, its slopes scattered with cinnabar grains.' } },
    { x: 76, y: 75, name: { zh: '流黄', en: 'Liuhuang' }, note: { zh: '第二程从西临流黄的柜山起。', en: 'The second leg begins at Mount Gui, which faces Liuhuang on the west.' } },
  ],
  yaoguang: [
    { x: 68, y: 54, name: { zh: '冬蛰之穴', en: 'Winter Burrow' }, note: { zh: '猾褢穴居而冬蛰，醒来便有徭役之兆。', en: 'The Huaiyuan burrows and hibernates through winter; its waking portends corvee labor.' } },
    { x: 77, y: 72, name: { zh: '大繇之兆', en: 'Omen of Great Labor' }, note: { zh: '猾褢见则县有大繇，经文以异兽记人间徭役。', en: 'When the Huaiyuan is seen, the county faces great public works — the classic records human labor through the omen of a beast.' } },
  ],
  luwu: [
    { x: 67, y: 75, name: { zh: '泽更之水', en: 'Zegeng Waters' }, note: { zh: '泽更之水出焉，南流注于滂水。', en: 'The Zegeng waters rise here and flow south into the Pang River.' } },
    { x: 77, y: 43, name: { zh: '东望日出', en: 'Sunrise to the East' }, note: { zh: '这一程在漆吴山收束，东望日出之丘。', en: 'This leg ends at Mount Qiwu, gazing east toward the hill where the sun rises.' } },
  ],
  daoguo: [
    { x: 68, y: 75, name: { zh: '泿水', en: 'Yinshui River' }, note: { zh: '泿水中有虎蛟，鱼身蛇尾，叫声像鸳鸯。', en: 'The Yin River holds the Hujiao — fish-bodied, serpent-tailed, with a cry like mandarin ducks.' } },
    { x: 76, y: 39, name: { zh: '瞿如', en: 'Quru\' }, note: { zh: \'瞿如三足人面，在水边自鸣其名。\', en: \'The Quru has three legs and a human face, calling its own name by the water\'s edge.' } },
  ],
  danxue: [
    { x: 69, y: 42, name: { zh: '金玉', en: 'Gold & Jade' }, note: { zh: '丹穴山多金玉，凤凰栖于此间。', en: 'Mount Danxue is rich in gold and jade, where the phoenix makes its home.' } },
    { x: 61, y: 76, name: { zh: '丹水', en: 'Danshui River' }, note: { zh: '丹穴之山，丹水出焉。', en: 'From Mount Danxue the Dan River rises.' } },
  ],
  nanyu: [
    { x: 69, y: 75, name: { zh: '佐水', en: 'Zuoshui River' }, note: { zh: '佐水向东南流入海。', en: 'The Zuo River flows southeast down to the sea.' } },
    { x: 76, y: 42, name: { zh: '凤凰', en: 'Phoenix' }, note: { zh: '南禺山有凤凰、鹓雏。', en: 'On Mount Nanyu dwell the phoenix and the yuanchu.' } },
  ],
}

const featureGroup = (item, beastName) => {
  if (item.beastItem) return 3
  if (beastName && item.name.includes(beastName)) return 3
  if (/[兽鸟鱼蛇狐虎鹿牛羊猴马人翼牙鸣声影踪兆惧舞戏]/.test(item.name)) return 3
  if (/[水海泽河江溪渊瀑池波源流泉湖洋]/.test(item.name)) return 1
  if (/[木林树松柏草花竹粟谷田枝蒲苇]/.test(item.name)) return 2
  if (/[巅峰岭崖顶雪冠日入]/.test(item.name)) return 0
  return 2
}

// Distinctive landmarks need exact anchors; the general scene zones below
// handle the remaining catalogue items without reusing stale viewport points.
// key 保持中文名（与 SPOTS.name.zh 对应）。
const LANDMARKS = {
  'xishan:yanzi4': {
    '崦嵫之巅': [56, 15], '孰湖之崖': [60, 62], '西极落日': [20, 32],
    '苕水': [47, 76], '举人之戏': [72, 60],
  },
  'nanshan:zhaoyao': {
    '西海': [38, 77], '桂木': [58, 60], '祝馀': [65, 55], '迷穀': [71, 67],
  },
  'zhongshan:xianshan': {
    '金玉裸岩': [40, 48], '金': [42, 53], '玉': [49, 58], '鲜水': [59, 75],
  },
  'beishan:fajiu': {
    '西山之遥': [45, 36], '石子滩': [54, 72], '漳水': [62, 78],
  },
}

const zhName = (name) => (typeof name === 'string' ? name : name?.zh || '')
// 纯中文字符串兜底为双语对象：英文模式不至空白（内容暂以中文回退）
const bi = (text) => (typeof text === 'string' ? { zh: text, en: text } : text || { zh: '', en: '' })

export function getMountainSpots(volumeId, sceneId, discoveries = []) {
  const source = volumeId === 'nanshan' ? SOUTH_SPOTS[sceneId] || [] : SPOTS[sceneId] || []
  const landmarks = LANDMARKS[`${volumeId}:${sceneId}`] || {}
  const zones = getSceneZones(volumeId, sceneId)
  const beast = getBeastLayout(volumeId, sceneId)
  const beastName = discoveries.find((item) => item.beastItem)?.name
  const beastPoint = beast ? { x: beast.x + 5, y: beast.y - 6 } : null
  const placed = beastPoint ? [beastPoint] : []
  const counts = [0, 0, 0, 0]
  const offsets = [[0, 0], [-8, 8], [9, 7], [-5, -10], [10, -9], [-13, 0], [13, 0]]
  const entries = discoveries.length ? discoveries : source

  return entries.map((item) => {
    const zh = zhName(item.name)
    const original = source.find((spot) => zhName(spot.name) === zh)
    const fixed = landmarks[zh]
    const group = featureGroup({ ...item, name: zh }, beastName)
    const index = counts[group]++
    const [dx, dy] = offsets[index % offsets.length]
    const [baseX, baseY] = group === 3 && beastPoint ? [beastPoint.x, beastPoint.y] : zones[group]
    let x = fixed?.[0] ?? (item.beastItem && beastPoint ? beastPoint.x : baseX + dx)
    let y = fixed?.[1] ?? (item.beastItem && beastPoint ? beastPoint.y : baseY + dy)

    if (!fixed && !item.beastItem) {
      let tries = 0
      while (placed.some((point) => Math.hypot(point.x - x, point.y - y) < 7) && tries < 8) {
        x += tries % 2 ? -8 : 8
        y += tries % 3 ? -5 : 6
        tries += 1
      }
    }
    x = Math.max(18, Math.min(77, x))
    y = Math.max(19, Math.min(83, y))
    placed.push({ x, y })
    const label = item.label
      || (typeof item.name === 'object' ? item.name : { zh, en: original?.name?.en || PRODUCT_EN[zh] || zh })
    return { ...item, name: zh, label, note: item.note || original?.note || '', x, y, anchor: 'art' }
  })
}

const itemKind = (name, beastName) => {
  if (name === beastName) return { zh: '异兽', en: 'Strange Beast' }
  if (/[水海泽渊河江溪泉]/.test(name)) return { zh: '水脉', en: 'Waters' }
  if (/[金玉铜银石碧雘]/.test(name)) return { zh: '矿藏', en: 'Minerals' }
  if (/[木桂竹松杉花草粟穀棘]/.test(name)) return { zh: '草木', en: 'Flora' }
  return { zh: '山中物', en: 'Mountain Find' }
}

const matchingSentence = (name, scene) => {
  const text = `${scene.quote?.split('——')[0] || ''}。${scene.narration || ''}`
  return text.split(/[。；！？]/).map((part) => part.trim()).find((part) => part.includes(name)) || ''
}

export function getMountainDiscoveries(volumeId, scene, node, beast) {
  const allSpots = volumeId === 'nanshan' ? SOUTH_SPOTS[scene.id] || [] : SPOTS[scene.id] || []
  const items = []
  const seen = new Set()
  const add = (name, note, source, inPicture = false, beastItem = false) => {
    if (!name || seen.has(name)) return
    seen.add(name)
    const spot = allSpots.find((item) => zhName(item.name) === name)
    items.push({
      name, // 中文键名：用于匹配、去重与 onSelect
      label: { zh: name, en: spot?.name?.en || PRODUCT_EN[name] || name },
      note: bi(note),
      source: bi(source),
      kind: itemKind(name, beast?.name),
      inPicture,
      beastItem,
    })
  }

  for (const product of node?.products || []) {
    const spot = allSpots.find((item) => zhName(item.name) === product)
    const match = matchingSentence(product, scene)
    const note = spot?.note || {
      zh: match ? `${match}。` : `本山物产录有${product}。`,
      en: match ? `${match}.` : `The record lists ${spot?.name?.en || product} among this mountain's produce.`,
    }
    add(product, note, { zh: '经文名物', en: 'From the Classic' }, true, product === beast?.name)
  }
  if (beast && !seen.has(beast.name)) {
    const match = matchingSentence(beast.name, scene)
    add(beast.name, match ? { zh: `${match}。`, en: `${match}.` } : scene.narration, { zh: '山中异兽', en: 'Strange Beast of the Mountain' }, true, true)
  }
  for (const spot of allSpots) add(zhName(spot.name), spot.note, { zh: '画中寻迹', en: 'Marks in the Painting' }, true)
  return items
}
