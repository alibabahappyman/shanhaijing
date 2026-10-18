import { useEffect, useRef, useState } from 'react'
import IntroSequence from '../components/IntroSequence.jsx'
import WorldAtlas from '../components/WorldAtlas.jsx'
// 水墨流体画布：总地图页底的落墨效果（划过拖墨、点击炸墨花）
import InkFluid from '../components/InkFluid.jsx'
import { useLang } from '../i18n/LanguageContext.jsx'
import './Home.css'

export default function Home() {
  const { lang } = useLang()
  // 水墨画布对外暴露 injectBurst，供后续开场动画调用
  const burstRef = useRef(null)
  const [intro, setIntro] = useState(() => !sessionStorage.getItem('shx-intro-done'))
  // 总图「重看卷首」：清除标记后发事件，让首页重新挂载卷首封面
  useEffect(() => {
    const replay = () => setIntro(true)
    window.addEventListener('shx-replay-intro', replay)
    return () => window.removeEventListener('shx-replay-intro', replay)
  }, [])
  useEffect(() => { document.title = lang === 'en' ? 'The Wandering Myth · Shan Hai Jing' : '山海行卷 · Shan Hai Jing' }, [lang])
  return (
    <div className={`hero home-landing${intro ? ' home-landing--intro' : ''}`}>
      <InkFluid burstRef={burstRef} />
      {intro && <IntroSequence onDone={() => setIntro(false)} />}
      {!intro && <WorldAtlas />}
    </div>
  )
}
