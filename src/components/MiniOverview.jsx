// 左上角迷你总览：五经路线缩略示意，当前经高亮，其余置灰占位
export default function MiniOverview({ jingList, activeId }) {
  // 五经示意缩略路线（原型示意位，正式版从各经 JSON 生成）
  const routes = {
    dongshan: 'M 8 30 L 22 26 L 34 28 L 46 22 L 56 16',
    nanshan: 'M 8 42 L 24 40 L 40 42 L 54 38',
    xishan: 'M 8 54 L 22 56 L 38 52 L 52 54 L 62 50',
    beishan: 'M 8 66 L 26 64 L 44 66 L 58 62',
    zhongshan: 'M 8 78 L 20 76 L 34 78 L 48 74 L 60 76',
  }
  return (
    <div className="mini-overview">
      <svg width="90" height="92" viewBox="0 0 90 92">
        {jingList.map((j) => (
          <g key={j.id} opacity={j.id === activeId ? 1 : 0.35}>
            <path d={routes[j.id] || ''} className={`jing-route ${j.id === activeId ? 'active' : ''}`} />
            <text x="68" y={(routes[j.id] ? parseInt(routes[j.id].split(' ').pop()) : 0) + 4} className={`jing-label ${j.id === activeId ? 'active' : ''}`}>
              {j.name.slice(0, 1)}
            </text>
          </g>
        ))}
      </svg>
    </div>
  )
}
