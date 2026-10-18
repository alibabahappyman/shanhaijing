import { useMemo } from 'react'

// An illustrated itinerary: the order and spacing of stops come from the jing data.
// It is a reading map, not a claim about the mountains' real-world coordinates.
export default function JourneyMap({ data, sections, from, to, progress }) {
  const northbound = data.id === 'beishan'
  const nodes = useMemo(() => {
    const flat = data.segments.flatMap((segment, seg) => segment.nodes.map((node) => ({ ...node, seg })))
    return flat.map((node, index) => ({
      ...node,
      index,
      x: northbound ? 650 + (node.x - 550) * .16 + Math.sin(index * .54) * 68 : index * 112,
      y: northbound ? (flat.length - index - 1) * 112 : 435 + (node.y - 350) * .27 + Math.sin(index * .66) * 52,
    }))
  }, [data, northbound])

  const sceneNode = (sceneIndex) => {
    const scene = data.scenes[Math.max(0, Math.min(data.scenes.length - 1, sceneIndex - 1))]
    const index = nodes.findIndex((node) => node.seg === scene.seg && node.name === scene.node)
    return nodes[Math.max(0, index)]
  }

  const start = sceneNode(from)
  const end = sceneNode(to)
  const smooth = progress * progress * (3 - 2 * progress)
  const coverOffset = northbound ? { x: 0, y: 480 } : { x: -480, y: 0 }
  const closingOffset = northbound ? { x: 0, y: -480 } : { x: 480, y: 0 }
  const fromOffset = from === 0 ? coverOffset : from > data.scenes.length ? closingOffset : { x: 0, y: 0 }
  const toOffset = to === 0 ? coverOffset : to > data.scenes.length ? closingOffset : { x: 0, y: 0 }
  const cameraX = start.x + fromOffset.x + (end.x + toOffset.x - start.x - fromOffset.x) * smooth
  const cameraY = start.y + fromOffset.y + (end.y + toOffset.y - start.y - fromOffset.y) * smooth
  const scale = 1.14 - .24 * Math.sin(Math.PI * progress)
  const traveledIndex = from === 0 ? 0 : from > data.scenes.length ? nodes.length - 1 : start.index
  const destinationIndex = to === 0 ? 0 : to > data.scenes.length ? nodes.length - 1 : end.index
  const markerPosition = traveledIndex + (destinationIndex - traveledIndex) * smooth
  const low = Math.floor(markerPosition)
  const high = Math.min(nodes.length - 1, low + 1)
  const distances = nodes.map((node, index) => index === 0 ? 0 : Math.hypot(node.x - nodes[index - 1].x, node.y - nodes[index - 1].y))
  const totalDistance = distances.reduce((sum, distance) => sum + distance, 0)
  const traveledDistance = distances.slice(1, low + 1).reduce((sum, distance) => sum + distance, 0)
    + distances[high] * (markerPosition - low)
  const routeProgress = totalDistance ? traveledDistance / totalDistance : 0
  const marker = {
    x: nodes[low].x + (nodes[high].x - nodes[low].x) * (markerPosition - low),
    y: nodes[low].y + (nodes[high].y - nodes[low].y) * (markerPosition - low),
  }

  const path = nodes.map((node, index) => `${index ? 'L' : 'M'} ${node.x} ${node.y}`).join(' ')
  const near = nodes.filter((node) => Math.abs(node.x - cameraX) < 1050 && Math.abs(node.y - cameraY) < 750)
  const stopKeys = new Set(data.scenes.map((scene) => `${scene.seg}:${scene.node}`))
  const section = data.segments[end.seg]

  return (
    <div className={`sh-map sh-map--${northbound ? 'north' : 'east'}`}>
      <div className="sh-map-top"><div className="sh-map-title"><span className="sh-map-stamp">山<br />行<br />图</span><div><small>山海经 · {data.title}</small><strong>{section.title}</strong><p className="sh-map-section-intro">{sections?.[end.seg]}</p></div></div><span className="sh-map-count">{String(Math.min(data.scenes.length, Math.max(1, to))).padStart(2, '0')} <i>/</i> {String(data.scenes.length).padStart(2, '0')}</span></div>
      <svg className="sh-map-canvas" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" role="img" aria-label={`从${start.name}前往${end.name}的山行路线`}>
        <defs>
          <pattern id="sh-map-grain" width="110" height="110" patternUnits="userSpaceOnUse"><circle cx="8" cy="14" r=".75" fill="currentColor" opacity=".22"/><circle cx="72" cy="68" r=".7" fill="currentColor" opacity=".16"/><circle cx="37" cy="93" r=".6" fill="currentColor" opacity=".12"/></pattern>
        </defs>
        <rect width="1600" height="900" fill="url(#sh-map-grain)" opacity=".3" />
        <g className="sh-map-world" transform={`translate(800 410) scale(${scale}) translate(${-cameraX} ${-cameraY})`}>
          {near.map((node) => (node.index % 2 === 0 || stopKeys.has(`${node.seg}:${node.name}`)) && (
            <g key={`ridge-${node.index}`} className="sh-map-ridge" transform={`translate(${node.x} ${node.y - 28})`}>
              <path d="M -54 13 C -32 8 -23 -20 -10 -34 C -4 -43 2 -41 8 -30 C 19 -10 29 6 55 14" />
              <path d="M -28 13 C -13 3 -5 -17 0 -22 M 11 -14 C 18 -1 28 9 39 12" />
              <path d="M -66 24 Q -9 15 59 24" />
            </g>
          ))}
          <path className="sh-map-route-base" d={path} />
          <path className="sh-map-route-ink" d={path} pathLength="1000" strokeDasharray="1000 1000" strokeDashoffset={1000 * (1 - routeProgress)} />
          {near.map((node) => {
            const stop = stopKeys.has(`${node.seg}:${node.name}`)
            const important = node.index === start.index || node.index === end.index
            return <g key={`stop-${node.index}`} className={`sh-map-stop ${important ? 'sh-map-stop--major' : ''}`} transform={`translate(${node.x} ${node.y})`}>
              <circle r={stop ? 5 : 2.4} />
              {(important || (stop && node.index % 2 === 0)) && <text y="-68" textAnchor="middle">{node.name}</text>}
            </g>
          })}
          <g className="sh-map-traveler" transform={`translate(${marker.x} ${marker.y})`}><circle r="20" className="sh-map-traveler-outer"/><circle r="5" className="sh-map-traveler-inner"/></g>
        </g>
      </svg>
      <div className="sh-map-side-label">循山而行 · 次第入画</div>
      <div className="sh-map-compass" aria-hidden><b>{northbound ? '北' : '东'}</b><span>{northbound ? '↑' : '→'}</span><small>{northbound ? 'N' : 'E'}</small></div>
      <div className="sh-map-bottom">{data.segments.map((segment, index) => <span key={segment.title} className={index === end.seg ? 'sh-map-current-segment' : ''}>{String(index + 1).padStart(2, '0')} · {segment.title.split('·').pop().trim()}</span>)}</div>
    </div>
  )
}
