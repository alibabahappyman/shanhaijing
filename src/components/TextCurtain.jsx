import { useEffect, useRef, useState } from 'react'
import { useLang } from '../i18n/LanguageContext.jsx'
import './TextCurtain.css'

const LINES_EN = {
  dongshan: ['Between mountain & sea', 'Eastward we go', 'By ranges, find waters', 'Clouds part, peaks appear', 'Wind through the pines', 'Streams run to the sea', 'Ranges facing ranges', 'Where beasts hide', 'Following the currents', 'The tide draws near', 'Arrived at the shore', 'The scroll unrolls'],
  nanshan: ['Between mountain & sea', 'Southward we go', 'Deep woods, deep shadows', 'Feathers stir the wind', 'Herbs and grasses thrive', 'Mist over the ranges', 'Down streams into vales', 'A hundred birds in song', 'Sunlight through leaves', 'The hills have spirits', 'Ever south we walk', 'The scroll unrolls'],
  xishan: ['Between mountain & sea', 'Westward we go', 'Metal and jade glow hidden', 'Clouds rest on high ridges', 'Climb and gaze afar', 'Ancient trees in the wind', 'The path bends, the view turns', 'Springs sound in the vales', 'Spirited beasts appear', 'Dusk stains the ranges', 'Walking to the sky’s edge', 'The scroll unrolls'],
  beishan: ['Between mountain & sea', 'Northward we go', 'Cold ranges, seen snow', 'Long winds cross the ridges', 'Waters leave dark vales', 'Clouds veil the peaks', 'Tracing streams to their source', 'Pines sound like waves', 'Rivers winding on', 'The frost deepens', 'Into the northern lands', 'The scroll unrolls'],
  zhongshan: ['Between mountain & sea', 'Into the Central Classic', 'Ranges ringed about', 'Clouds rise from the range’s heart', 'Following the veins of land', 'Grasses and trees in glory', 'Marshes joined to marshes', 'All things flow together', 'The gods leave traces', 'Heaven and earth regard each other', 'Arrived at the middle lands', 'The scroll unrolls'],
}

const LINES = {
  dongshan: ['山海之间', '向东而行', '循山识水', '云开见岫', '风过松间', '水脉入海', '群峰相望', '异兽潜踪', '沿川寻迹', '潮声渐近', '行至海滨', '长卷初开'],
  nanshan: ['山海之间', '向南而行', '林深见影', '羽动风生', '草木葳蕤', '云气浮山', '循溪入谷', '百鸟和鸣', '日光穿叶', '山川有灵', '一路南行', '长卷初开'],
  xishan: ['山海之间', '向西而行', '金石藏辉', '云栖高岭', '循山望远', '古木临风', '峰回路转', '泉声入谷', '灵兽出没', '暮色染山', '行至天际', '长卷初开'],
  beishan: ['山海之间', '向北而行', '寒山见雪', '长风过岭', '水出幽谷', '云掩群峰', '循迹寻源', '松声如浪', '河川蜿蜒', '霜色渐深', '行入北境', '长卷初开'],
  zhongshan: ['山海之间', '入中山经', '群峰环峙', '云起山心', '循脉而行', '草木含章', '水泽相连', '万象汇流', '神灵有迹', '天地相望', '行至中土', '长卷初开'],
}

export default function TextCurtain({ volumeId, active, onOpen }) {
  const { lang } = useLang()
  const [hovered, setHovered] = useState(-1)
  const [opening, setOpening] = useState(false)
  const timer = useRef(null)
  const lines = lang === 'en' ? (LINES_EN[volumeId] || LINES_EN.dongshan) : (LINES[volumeId] || LINES.dongshan)

  useEffect(() => () => window.clearTimeout(timer.current), [])
  useEffect(() => {
    if (!active) setOpening(false)
  }, [active])

  const open = () => {
    if (opening) return
    setOpening(true)
    timer.current = window.setTimeout(onOpen, window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 680)
  }

  return (
    <div className={`text-curtain text-curtain--${volumeId}${lang === 'en' ? ' text-curtain--en' : ''}${opening ? ' is-opening' : ''}${active ? '' : ' is-inactive'}`}>
      <div className="text-curtain-rail" aria-hidden><span /><i /><span /></div>
      <div className="text-curtain-strands" aria-hidden onPointerMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect()
        setHovered(Math.max(0, Math.min(lines.length - 1, Math.floor((event.clientX - rect.left) / rect.width * lines.length))))
      }} onPointerLeave={() => setHovered(-1)}>
        {lines.map((line, index) => (
          <span
            className={`text-curtain-strand${Math.abs(index - hovered) < 2 ? ' is-breezy' : ''}`}
            key={`${volumeId}-${index}`}
            style={{ '--strand-length': `${76 + (index % 4) * 5}%`, '--sway-delay': `${Math.abs(index - hovered) * 80}ms`, '--open-offset': `${(index - 5.5) * 16}px` }}
          >{line}</span>
        ))}
      </div>
      <button className="text-curtain-open" type="button" onClick={open} disabled={opening}>
        <span className="text-curtain-open-seal" aria-hidden>卷</span>
        <span>{lang === 'en' ? 'Unroll and enter' : '开卷入山'}</span>
        <span aria-hidden>↘</span>
      </button>
      <span className="text-curtain-hint">{lang === 'en' ? 'Touch the strands — a breeze passes through' : '轻触文字，风过帘间'}</span>
    </div>
  )
}
