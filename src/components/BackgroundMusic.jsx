import { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useLang } from '../i18n/LanguageContext.jsx'
import './BackgroundMusic.css'

const TRACKS = {
  home: '/assets/audio/shenmi1.mp3',      // 首页 · 总地图
  scroll: '/assets/audio/guili4.mp3',     // 五经长卷
  dahuang: ['/assets/audio/guili1.mp3', '/assets/audio/guili2.mp3', '/assets/audio/guili3.mp3'], // 大荒轮换
  bestiary: '/assets/audio/guli1.mp3',    // 山海百灵
  haijing: '/assets/audio/wenwan1.mp3',   // 山海志（山川遗珍）
  editor: '/assets/audio/wenwan2.mp3',    // 编者记
}

const STORAGE_KEY = 'xianhua-bgm-on'

function trackForPath(pathname) {
  if (pathname.startsWith('/scroll')) return { key: 'scroll', src: TRACKS.scroll }
  if (pathname.startsWith('/dahuang')) {
    // 每次进入大荒按序轮换一首，避免总听同一曲
    const n = Math.floor(Date.now() / 36e5) % TRACKS.dahuang.length
    return { key: 'dahuang', src: TRACKS.dahuang[n] }
  }
  if (pathname.startsWith('/bestiary')) return { key: 'bestiary', src: TRACKS.bestiary }
  if (pathname.startsWith('/haijing')) return { key: 'haijing', src: TRACKS.haijing }
  if (pathname.startsWith('/editor-note')) return { key: 'editor', src: TRACKS.editor }
  return { key: 'home', src: TRACKS.home }
}

const MusicContext = createContext(null)
export const useBackgroundMusic = () => useContext(MusicContext)

export default function BackgroundMusic({ children }) {
  const location = useLocation()
  const { lang } = useLang()
  const audioRef = useRef(null)
  const fadeTimer = useRef(null)
  const [enabled, setEnabled] = useState(() => localStorage.getItem(STORAGE_KEY) === '1')
  const [playing, setPlaying] = useState(false)
  const [current, setCurrent] = useState(null) // { key, src }
  const targetRef = useRef(trackForPath(location.pathname))

  // 路由变化时立即切换曲目
  useEffect(() => {
    targetRef.current = trackForPath(location.pathname)
  }, [location.pathname])

  // 音量渐变工具：从当前值到目标值
  const fadeTo = (audio, to, duration = 900, onDone) => {
    clearInterval(fadeTimer.current)
    const from = audio.volume
    const steps = Math.max(1, Math.round(duration / 50))
    let i = 0
    fadeTimer.current = setInterval(() => {
      i += 1
      const v = from + (to - from) * (i / steps)
      audio.volume = Math.min(1, Math.max(0, v))
      if (i >= steps) {
        clearInterval(fadeTimer.current)
        audio.volume = to
        onDone?.()
      }
    }, 50)
  }

  // 播放状态与曲目同步
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    const target = targetRef.current

    if (!enabled) {
      if (!audio.paused) {
        fadeTo(audio, 0, 600, () => { audio.pause(); setPlaying(false) })
      }
      return
    }

    if (current && current.src === target.src) {
      if (audio.paused) {
        audio.play().then(() => { setPlaying(true); fadeTo(audio, 0.32, 1200) }).catch(() => {})
      } else if (audio.volume === 0) {
        fadeTo(audio, 0.32, 600)
      }
      return
    }

    // 换曲：先快速淡出，再换源淡入
    const switchTrack = () => {
      setCurrent(target)
      audio.src = target.src
      audio.loop = true
      audio.volume = 0
      audio.play().then(() => {
        setPlaying(true)
        fadeTo(audio, 0.32, 1200)
      }).catch(() => setPlaying(false))
    }
    if (audio.paused) switchTrack()
    else fadeTo(audio, 0, 500, switchTrack)
  }, [enabled, current, location.pathname])

  // 浏览器策略：首次交互后才真正出声
  useEffect(() => {
    const unlock = () => {
      if (enabled) {
        const audio = audioRef.current
        if (audio && audio.paused) {
          audio.play().then(() => { setPlaying(true); fadeTo(audio, 0.32, 1200) }).catch(() => {})
        }
      }
      window.removeEventListener('pointerdown', unlock)
      window.removeEventListener('keydown', unlock)
    }
    window.addEventListener('pointerdown', unlock)
    window.addEventListener('keydown', unlock)
    return () => {
      window.removeEventListener('pointerdown', unlock)
      window.removeEventListener('keydown', unlock)
    }
  }, [enabled])

  const value = useMemo(() => ({ enabled, playing }), [enabled, playing])

  const toggle = () => {
    const next = !enabled
    setEnabled(next)
    localStorage.setItem(STORAGE_KEY, next ? '1' : '0')
    if (!next) {
      const audio = audioRef.current
      if (audio && !audio.paused) fadeTo(audio, 0, 600, () => { audio.pause(); setPlaying(false) })
    }
    // 开启时交给上面的同步 effect 处理
  }

  return (
    <MusicContext.Provider value={value}>
      {children}
      <div className={`bgm-widget ${location.pathname === '/' ? 'bgm-widget--left' : ''}`}>
        <button
          type="button"
          className={`bgm-toggle ${enabled ? 'is-on' : ''} ${playing ? 'is-playing' : ''}`}
          onClick={toggle}
          aria-label={lang === 'en' ? (enabled ? 'Turn off background music' : 'Turn on background music') : (enabled ? '关闭背景音乐' : '开启背景音乐')}
          title={lang === 'en' ? (enabled ? 'Turn off background music' : 'Turn on background music') : (enabled ? '关闭背景音乐' : '开启背景音乐')}
        >
          <span className="bgm-icon" aria-hidden="true">♪</span>
          <span className="bgm-bars" aria-hidden="true"><i /><i /><i /></span>
        </button>
        <audio ref={audioRef} loop preload="none" />
      </div>
    </MusicContext.Provider>
  )
}
