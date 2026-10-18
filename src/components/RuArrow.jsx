/* 国风箭头组件：菱形尖 + 折线箭身 + 尾菱，参考商周纹样的几何语言。
   dir: left(返回) | right | up-right(跳转) | down(展开) | grand-right(大版跳转，嵌回纹) */
export default function RuArrow({ dir = 'right', grand = false }) {
  const cls = `ru-arrow${grand ? ' ru-arrow--grand' : ''}`
  if (dir === 'left') return (
    <svg className={cls} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M20 12H6.5" stroke="currentColor" strokeWidth="1.6" />
      <path d="M10.5 5.5 4 12l6.5 6.5 2.2-2.2L8.4 12l4.3-4.3Z" fill="currentColor" />
      <path d="M20 9.6v4.8" stroke="currentColor" strokeWidth="1.6" />
      <path d="M19.2 12 17.4 10.2h3.6Z" fill="currentColor" />
    </svg>
  )
  if (dir === 'up-right') return (
    <svg className={cls} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 19 15.5 8.5" stroke="currentColor" strokeWidth="1.6" />
      <path d="M9.2 4.8 19.2 4.8 19.2 14.8 16.6 12.2 16.6 9.2 13.6 9.2 11 6.6Z" fill="currentColor" transform="rotate(0 19.2 4.8)" />
      <path d="M17 20h3v-3" stroke="currentColor" strokeWidth="1.6" opacity=".55" />
    </svg>
  )
  if (dir === 'down') return (
    <svg className={cls} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 4v11" stroke="currentColor" strokeWidth="1.6" />
      <path d="M12 20.5 6.8 13h10.4Z" fill="currentColor" />
      <path d="M8.5 4.8h7" stroke="currentColor" strokeWidth="1.6" opacity=".55" />
    </svg>
  )
  if (dir === 'grand-right') return (
    <svg className={cls} viewBox="0 0 40 24" fill="none" aria-hidden="true">
      {/* 箭身中段嵌回纹漩涡 */}
      <path d="M2 12h6" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 8.5h7v7h-4.4v-3.6h2.6" stroke="currentColor" strokeWidth="1.5" />
      <path d="M15 12h9" stroke="currentColor" strokeWidth="1.5" />
      {/* 菱形箭头端 */}
      <path d="M24 12l6-4.4v8.8Z" fill="currentColor" />
      <path d="M30 12l3.5-2.6v5.2Z" fill="currentColor" opacity=".6" />
      {/* 尾端小菱 */}
      <path d="M2.8 12 5 9.8 7.2 12 5 14.2Z" fill="currentColor" />
    </svg>
  )
  // right（默认）
  return (
    <svg className={cls} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 12h13.5" stroke="currentColor" strokeWidth="1.6" />
      <path d="M13.5 5.5 20 12l-6.5 6.5-2.2-2.2 4.3-4.3-4.3-4.3Z" fill="currentColor" />
      <path d="M4 9.6v4.8" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  )
}
