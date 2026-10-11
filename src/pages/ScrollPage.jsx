import { useParams, Navigate } from 'react-router-dom'
import { JING_LIST } from '../data/jinglist.js'
import ScrollScroll from '../components/ScrollScroll.jsx'
import dongshan from '../data/dongshan.json'
import beishan from '../data/beishan.json'
import xishan from '../data/xishan.json'

const DATA = { dongshan, beishan, xishan }

export default function ScrollPage() {
  const { jing } = useParams()
  const meta = JING_LIST.find((j) => j.id === jing)
  if (!meta || !meta.ready) return <Navigate to="/" replace />
  return <ScrollScroll data={DATA[jing]} meta={meta} jingList={JING_LIST} />
}
