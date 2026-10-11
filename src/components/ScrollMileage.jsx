import { useState } from 'react'

// 顶部/右侧站名指示：平时收成一根竖卷轴（只露经名），悬浮向下展开展开纸面
// 显示当前经的题跋简介与行进进度——「展卷」交互（借鉴 CGTN 卷轴 hover）
export default function ScrollMileage({ jingTitle, tagline, segTitle, step, total }) {
  const [open, setOpen] = useState(false)
  const cur = Math.min(total, Math.max(0, Math.round(step) + 1))

  return (
    <div
      className={`scroll-mileage ${open ? 'open' : ''}`}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onClick={() => setOpen(!open)} // 触屏点按切换
    >
      {/* 上轴杆 */}
      <span className="sm-rod top" aria-hidden />
      {/* 纸面：高度动画，内容固定高度避免重排 */}
      <div className="sm-paper" aria-hidden={!open}>
        <div className="sm-content">
          <p className="sm-jing">{jingTitle}</p>
          <p className="sm-tagline">{tagline}</p>
          <span className="sm-divider" aria-hidden />
          <p className="sm-seg">{segTitle}</p>
          <p className="sm-progress">
            第 {cur} 站 · 共 {total} 站
          </p>
        </div>
      </div>
      {/* 下轴杆 */}
      <span className="sm-rod bottom" aria-hidden />
    </div>
  )
}
