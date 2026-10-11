import { useState } from 'react'

// 画中异兽热点：悬浮在画卷山景上的"活物"
// - 有图：webp/gif/png 动图乘法混合融进纸底，悬浮放大 + 金色粒子光
// - 无图：一枚小朱砂"兽"字印记，不抢画面
// - 点击弹出画中详情卡（博物馆标签式），点空白处合卷
// - 弹卡内为 3D 立体轮播（参考 Figma 卡片翻转切换）：中间大卡、两侧小卡斜靠，
//   点两侧卡片或箭头旋转换位；静图未生成时显示宣纸底"兽"字占位
//   静图按命名约定 beast-{id}-1/2/3.png 放 public/img，配 gallery 字段可覆盖
// - 位置可由数据配置：beast.beastPos = { left, bottom }（CSS 值，注入 wrap 内联样式）
export default function BeastSpot({ beast }) {
  const [open, setOpen] = useState(false)
  const [imgOk, setImgOk] = useState(false)
  const [slide, setSlide] = useState(0)
  const [broken, setBroken] = useState([])
  const img = beast.img ? `${import.meta.env.BASE_URL}img/${beast.img}` : null
  // 轮播只放静图：优先 gallery 字段，缺省按 beast-{id}-1/2/3.png 命名约定取 3 张
  const files =
    beast.gallery && beast.gallery.length > 0
      ? beast.gallery
      : [1, 2, 3].map((n) => `beast-${beast.id}-${n}.png`)
  const slides = files.map((f) => `${import.meta.env.BASE_URL}img/${f}`)
  const count = slides.length
  const pos = beast.beastPos
    ? { left: beast.beastPos.left, bottom: beast.beastPos.bottom }
    : undefined

  const openPopup = () => {
    setSlide(0)
    setOpen(true)
  }
  const step = (dir) => setSlide((s) => (s + dir + count) % count)
  // 静图加载失败 → 用占位卡顶上这一张，不打断轮播
  const markBroken = (src) => {
    setBroken((b) => (b.includes(src) ? b : [...b, src]))
  }

  return (
    <div className="beast-spot-wrap" style={pos}>
      <button className="beast-spot" onClick={openPopup} aria-label={`异兽${beast.name}`}>
        {img ? (
          <img
            src={img}
            alt={beast.name}
            onLoad={() => setImgOk(true)}
            onError={(e) => (e.target.style.display = 'none')}
          />
        ) : null}
        {/* 无图兜底印记：图加载成功后隐藏 */}
        {!imgOk && <span className="beast-spot-seal">兽</span>}
        {/* 悬浮金色粒子光 */}
        <span className="beast-sparks" aria-hidden>
          {[...Array(7)].map((_, k) => (
            <i key={k} className="beast-spark" style={{ '--d': `${k}` }} />
          ))}
        </span>
      </button>

      {open && (
        <>
          <div className="beast-veil" onClick={() => setOpen(false)} />
          <div className="beast-popup" role="dialog" aria-label={beast.name}>
            <p className="beast-popup-kicker">山中异兽</p>
            <h3 className="beast-popup-name">{beast.name}</h3>
            {count > 0 && (
              <div className="beast-carousel">
                {/* 3D 立体轮播：每张卡按 (slide - k) 相对位置取 -1/0/1，分布在左中右 */}
                {slides.map((src, k) => {
                  const rel = (((k - slide) % count) + count) % count
                  if (rel > 1 && rel < count - 1) return null // 只呈现中卡与相邻两卡
                  const side = rel === 0 ? 'center' : rel === 1 ? 'right' : 'left'
                  return (
                    <button
                      key={k}
                      className={`beast-card ${side}`}
                      onClick={() => setSlide(k)}
                      aria-label={`第${k + 1}张`}
                    >
                      {broken.includes(src) ? (
                        <span className="beast-carousel-placeholder">
                          <span>兽</span>
                        </span>
                      ) : (
                        <img
                          src={src}
                          alt={`${beast.name} ${k + 1}`}
                          onError={() => markBroken(src)}
                        />
                      )}
                    </button>
                  )
                })}
                {count > 1 && (
                  <>
                    <button
                      className="beast-carousel-arrow prev"
                      onClick={() => step(-1)}
                      aria-label="上一张"
                    >
                      ‹
                    </button>
                    <button
                      className="beast-carousel-arrow next"
                      onClick={() => step(1)}
                      aria-label="下一张"
                    >
                      ›
                    </button>
                  </>
                )}
                {count > 1 && (
                  <div className="beast-carousel-dots" role="tablist">
                    {slides.map((_, k) => (
                      <button
                        key={k}
                        role="tab"
                        aria-selected={k === slide}
                        aria-label={`第${k + 1}张`}
                        className={`beast-carousel-dot${k === slide ? ' on' : ''}`}
                        onClick={() => setSlide(k)}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}
            <p className="beast-popup-quote">{beast.quote}</p>
            <p className="beast-popup-hint">点空白处合卷</p>
          </div>
        </>
      )}
    </div>
  )
}
