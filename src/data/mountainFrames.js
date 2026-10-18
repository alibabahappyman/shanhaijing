// 山志边框由山站标识生成：每站的山脊、落款纹样和配色都固定且不同。
// 使用内联 SVG 是为了保持细线清晰，也避免把整页文字烘焙进图片。
const palettes = {
  dongshan: ['#64827d', '#8b9c85', '#b4937c'],
  nanshan: ['#6f917d', '#aa9c81', '#bf918f'],
  xishan: ['#788797', '#a6a086', '#ad8f82'],
  beishan: ['#6e8393', '#93a091', '#ad9a83'],
  zhongshan: ['#838496', '#859681', '#ac9389']
}

const hash = (value) => [...value].reduce((acc, char) => ((acc * 33) ^ char.charCodeAt(0)) >>> 0, 5381)
const rng = (seed) => () => {
  seed = (seed * 1664525 + 1013904223) >>> 0
  return seed / 4294967296
}
const ornamentNames = ['bamboo', 'pine', 'plum', 'lotus', 'orchid', 'mountain']

export function getMountainOrnaments(sceneId, volumeId, index) {
  const seed = hash(`${volumeId}:${sceneId}:${index}`)
  const top = seed % ornamentNames.length
  const bottom = (top + 1 + Math.floor(seed / 17) % (ornamentNames.length - 1)) % ornamentNames.length
  return {
    top: `/assets/mountain-journal/ornament-${ornamentNames[top]}.png`,
    bottom: `/assets/mountain-journal/ornament-${ornamentNames[bottom]}.png`
  }
}

function mountainRidge(random, baseline, height, color, opacity) {
  let d = `M0 ${baseline}`
  for (let x = 0; x < 600; x += 120) {
    const peak = (0.45 + random() * 0.55) * height
    d += ` Q${x + 47} ${Math.round(baseline - peak)} ${x + 120} ${baseline}`
  }
  return `<path d="${d} L600 900H0Z" fill="${color}" opacity="${opacity}" />`
}

export function getMountainFrame(sceneId, volumeId, index, mountainName = '') {
  const key = `${volumeId}:${sceneId}:${index}`
  const seed = hash(key)
  const random = rng(seed)
  const palette = palettes[volumeId] || palettes.zhongshan
  const ink = palette[seed % palette.length]
  const secondary = palette[(seed + 1) % palette.length]
  const horizon = 785 + Math.round(random() * 20)
  const hillA = mountainRidge(random, horizon, 75 + random() * 22, ink, '.11')
  const hillB = mountainRidge(random, horizon + 31, 48 + random() * 17, secondary, '.13')
  const inset = 27 + Math.round(random() * 5)
  const line = `M${inset + 22} 77H554Q574 77 574 97V788Q574 846 516 846H85Q${inset} 846 ${inset} 793V145
    M${inset + 7} 166V770 M568 165V754 M${inset + 21} 83H390`
  const droplets = Array.from({ length: 5 }, (_, i) => {
    const x = 175 + i * 61 + Math.round(random() * 15)
    const y = 95 + Math.round(random() * 18)
    return `<circle cx="${x}" cy="${y}" r="${(1.6 + random() * 1.3).toFixed(1)}" />`
  }).join('')
  const label = mountainName.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 900" preserveAspectRatio="none">
    <defs><radialGradient id="wash"><stop stop-color="${secondary}" stop-opacity=".16" /><stop offset="1" stop-color="${secondary}" stop-opacity="0" /></radialGradient></defs>
    <ellipse cx="479" cy="183" rx="153" ry="133" fill="url(#wash)" />
    <ellipse cx="115" cy="782" rx="173" ry="112" fill="url(#wash)" />
    ${hillA}${hillB}
    <g fill="none" stroke="${ink}" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" opacity=".68">
      <path d="${line}" />
      <path d="M${inset} 145q0-40 30-58M574 142q0-43-23-59M${inset + 2} 802q8 35 45 43M570 804q-8 31-49 41" opacity=".55" />
      <path d="M${inset + 12} 198v43M568 198v43M${inset + 31} 835h47M485 835h48" opacity=".42" />
      ${droplets}
      <path d="M104 831q32-8 63 0t63 0t63 0t63 0t63 0" opacity=".48" />
      <path d="M122 839q28-7 55 0t55 0t55 0t55 0" opacity=".38" />
    </g>
    <text x="553" y="454" fill="${ink}" opacity=".58" font-family="serif" font-size="14" letter-spacing="4" writing-mode="tb">${label}</text>
  </svg>`
  return `data:image/svg+xml,${encodeURIComponent(svg)}`
}
