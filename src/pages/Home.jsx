import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { JING_LIST } from '../data/jinglist.js'
import InkFluid from '../components/InkFluid.jsx'
import IntroSequence from '../components/IntroSequence.jsx'

export default function Home() {
  // 水墨画布对外暴露 injectBurst，供后续开场动画调用
  const burstRef = useRef(null)
  // 开场序列：本会话只播一次；intro 挂起时首页内容先不出（避免穿帮）
  const [intro, setIntro] = useState(() => !sessionStorage.getItem('shx-intro-done'))
  return (
    <div className="hero">
      <InkFluid burstRef={burstRef} />
      {intro && <IntroSequence onDone={() => setIntro(false)} />}
      {!intro && (
        <>
          <h1>山海经</h1>
          <p className="tagline">五经滚动长卷 · 数字地理志</p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            {JING_LIST.map((j) =>
              j.ready ? (
                <Link
                  key={j.id}
                  to={`/scroll/${j.id}`}
                  className="back-map"
                  style={{ textDecoration: 'none', display: 'inline-block' }}
                >
                  进入{j.name}
                </Link>
              ) : (
                <button key={j.id} className="back-map" disabled style={{ opacity: 0.4, cursor: 'not-allowed' }}>
                  {j.name} · 未解锁
                </button>
              ),
            )}
          </div>
          <p className="scroll-hint">↓ 选择一经，开始行旅</p>
        </>
      )}
    </div>
  )
}
