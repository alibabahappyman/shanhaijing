import { useEffect } from 'react'
import { useParams, useSearchParams, Navigate } from 'react-router-dom'
import { JING_LIST } from '../data/jinglist.js'
import ScrollScroll from '../components/ScrollScroll.jsx'
import dongshan from '../data/dongshan.json'
import beishan from '../data/beishan.json'
import xishan from '../data/xishan.json'
import nanshan from '../data/nanshan.json'
import zhongshan from '../data/zhongshan.json'

const DATA = { dongshan, beishan, xishan, nanshan, zhongshan }

export default function ScrollPage() {
  const { jing } = useParams()
  const [searchParams] = useSearchParams()
  const scene = searchParams.get('scene') || null
  // 从其他页面循迹入卷时，浏览器可能保留上次的滚动位置；长卷依赖 window 滚动驱动，
  // 先归零避免进入瞬间落在半空（表现为整页空白）
  useEffect(() => {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual'
    window.scrollTo(0, 0)
  }, [jing])
  // 从山海百灵循迹入卷时携带来源，供长卷顶栏渲染「返回山海百灵」上下文条
  const bestiaryReturn = searchParams.get('from') === 'bestiary'
    ? { type: searchParams.get('type'), beast: searchParams.get('beast') }
    : null
  const meta = JING_LIST.find((j) => j.id === jing)
  if (!meta || !meta.ready) return <Navigate to="/" replace />
  // 三经统一走长卷引擎（pinned 相机滚动）；地图路线飞行已内嵌为跳转过渡
  return <ScrollScroll key={jing} data={DATA[jing]} meta={meta} jingList={JING_LIST} initialScene={scene} bestiaryReturn={bestiaryReturn} />
}
