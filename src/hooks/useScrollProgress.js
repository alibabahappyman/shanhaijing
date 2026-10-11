import { useEffect, useRef, useState } from 'react'

// 全局滚动进度 hook：返回 0~1
export function useScrollProgress() {
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight
      setProgress(total > 0 ? Math.min(1, window.scrollY / total) : 0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return progress
}

// 元素级滚动进度 hook：该元素划过视口的进度 0~1
export function useElementScrollProgress(ref) {
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    const onScroll = () => {
      const el = ref.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const vh = window.innerHeight
      // 元素顶从视口底到视口顶 = 0→1
      const p = (vh - rect.top) / (vh + rect.height)
      setProgress(Math.min(1, Math.max(0, p)))
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [ref])
  return progress
}
