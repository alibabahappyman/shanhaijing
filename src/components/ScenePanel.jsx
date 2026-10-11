// 竖排题跋文字列：替代原半透明面板
// - 引文随本站滚动进度连续流动（translateY），逐字显影
// - side 决定贴左/贴右（避开主山构图），无底框，纸色光晕保证可读
const clamp01 = (v) => Math.min(1, Math.max(0, v))

export default function ScenePanel({ scene, seg, active, progress = 0 }) {
  const beast = scene.beast ? (seg.beasts || []).find((b) => b.id === scene.beast) : null
  const side = scene.side === 'right' ? 'right' : 'left'
  const p = Math.max(-1, Math.min(1, progress))
  // 站心可见度：向前后两站方向淡出
  const vis = clamp01(1 - Math.abs(p) * 1.35)
  // 滚动流动：站内从下往上走
  const y = -p * 90
  // 逐字显影：可见度映射到字符数
  const quoteChars = (scene.quote || '').split('')
  const narrChars = (scene.narration || '').split('')
  const lit = quoteChars.length * clamp01((1 - Math.abs(p)) * 1.3)
  const litN = narrChars.length * clamp01((1 - Math.abs(p)) * 1.15)

  return (
    <section
      className={`scene-col scene-col-${side} ${active ? 'active' : ''}`}
      style={{
        opacity: vis,
        transform: `translateY(${y}px)`,
        visibility: vis <= 0.01 ? 'hidden' : 'visible',
      }}
    >
      <p className="scene-col-kicker">{scene.kicker}</p>
      <h2 className="scene-col-title" aria-label={scene.title}>
        {scene.title.split('').map((c, i) => (
          <span key={i} aria-hidden style={{ transitionDelay: `${0.12 + i * 0.055}s` }}>
            {c}
          </span>
        ))}
      </h2>
      <div className="scene-col-quotes">
        <p className="scene-col-quote">
          {quoteChars.map((c, i) => (
            <span key={i} style={{ opacity: i < lit ? 1 : 0.18 }}>{c}</span>
          ))}
        </p>
        <p className="scene-col-narr">
          {narrChars.map((c, i) => (
            <span key={i} style={{ opacity: i < litN ? 0.85 : 0.12 }}>{c}</span>
          ))}
        </p>
      </div>
    </section>
  )
}
