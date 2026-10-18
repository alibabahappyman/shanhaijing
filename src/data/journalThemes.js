const themeGroups = {
  waters: new Set(['shanyu', 'boyu', 'gaigai', 'heluo', 'wenyao', 'zhuru', 'dongdong']),
  fierce: new Set(['qiongqi', 'paoxiao', 'yayu', 'juzu', 'heyu', 'zhuyan', 'fuxi', 'feiyi', 'dashe']),
  celestial: new Set(['dijiang', 'luanniao', 'yingwu', 'bifang', 'yingzhao', 'jingwei', 'songsi', 'huangniao', 'rushou'])
}

const themes = {
  waters: { label: { zh: '水域灵踪', en: 'Waterside Spirits' }, frame: '/assets/bestiary/frame-waters.png', colors: ['#8ccfca', '#87bfd4', '#b7d9bd', '#94c7ba'] },
  fierce: { label: { zh: '荒山异相', en: 'Fierce Wilderness' }, frame: '/assets/bestiary/frame-fierce.png', colors: ['#dca17e', '#d2a077', '#e2ab8b', '#c8916e'] },
  celestial: { label: { zh: '云天神羽', en: 'Celestial Plumage' }, frame: '/assets/bestiary/frame-celestial.png', colors: ['#dec389', '#accdca', '#cdb896', '#a9c9df'] },
  mountain: { label: { zh: '山川遗珍', en: 'Treasures of the Range' }, frame: '/assets/bestiary/frame-mountain.png', colors: ['#b6c997', '#d9bd82', '#9fc1ae', '#d4af91'] }
}

const individualFrameIds = new Set([
  'congcong', 'shanyu', 'dongdong', 'qiuyu', 'zhuru', 'xiegou', 'lingling',
  'jingjing', 'yuhu', 'gaigai', 'juzu', 'heyu', 'dangkang', 'boyu',
  'feiyi', 'luanniao', 'yingwu', 'fuxi', 'zhuyan', 'yingzhao', 'luwu',
  'bifang', 'wenyao', 'qiongqi', 'ershu', 'songsi', 'changshe', 'zhujian',
  'paoxiao', 'yayu', 'duyu', 'heluo', 'tianma', 'jingwei', 'huangniao',
  'dashe', 'dijiang', 'juanyang', 'rushou', 'shuhu',
  'mingshe', 'huashe', 'fuzhu', 'wuluo', 'shangao', 'yonghe',
  'kuiniu', 'jimeng', 'diernv', 'feifei', 'xiwangmu',
  'xingxing', 'lushu', 'lu', 'jiuweihu', 'zhuniao', 'huahuai',
  'gudiao', 'quru', 'hujiao', 'fenghuang', 'yuanchu',
])

const frameOverrides = {
  fuzhu: '/assets/bestiary/frame-fuzhu-clear.png',
  shangao: '/assets/bestiary/frame-shangao-clear.png',
  juanyang: '/assets/bestiary/frame-juanyang-clear.png',
  feifei: '/assets/bestiary/frame-feifei-clear.png',
  xiwangmu: '/assets/bestiary/frame-xiwangmu-clear.png',
  jimeng: '/assets/bestiary/frame-jimeng-clear.png'
}

const individualAccents = {
  juanyang: '#c7b28b',
  rushou: '#d8c390',
  shuhu: '#c5b6dc',
  mingshe: '#c5aa76',
  huashe: '#87afbc',
  fuzhu: '#b8c5b1',
  wuluo: '#bfa9b8',
  shangao: '#c48d78',
  yonghe: '#bba577',
  kuiniu: '#8ca4b8',
  jimeng: '#85afa6',
  diernv: '#b7aec9',
  feifei: '#d5ccae',
  xiwangmu: '#b9c7ad'
}

export function getJournalTheme(beast) {
  const type = Object.keys(themeGroups).find((group) => themeGroups[group].has(beast.id)) || 'mountain'
  const theme = themes[type]
  const hash = [...beast.id].reduce((value, char) => value * 31 + char.charCodeAt(0), 7) >>> 0
  return {
    type,
    label: theme.label,
    style: {
      '--journal-frame': `url("${frameOverrides[beast.id] || (individualFrameIds.has(beast.id) ? `/assets/bestiary/frame-${beast.id}.png` : theme.frame)}")`,
      '--journal-accent': individualAccents[beast.id] || theme.colors[hash % theme.colors.length],
      '--journal-wash-x': `${22 + hash % 59}%`,
      '--journal-wash-y': `${20 + Math.floor(hash / 7) % 50}%`
    }
  }
}
