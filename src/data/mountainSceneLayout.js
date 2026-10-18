import { ART_LAYOUT } from './artLayout.js'

// Coordinates use the 16:9 painted scene, not the browser viewport.
// Each anchor is the creature's visible feet / tail, so transparent GIF margins
// cannot move it away from the ledge or water where it belongs.
const BEAST_ANCHORS = {
  nanshan: {
    zhaoyao: [64, 76, 190], zuyang: [64, 76, 190], dishan: [66, 76, 175],
    qingqiu: [68, 77, 215], guishan: [62, 78, 88], yaoguang: [62, 75, 185],
    luwu: [65, 76, 190], daoguo: [65, 79, 200], danxue: [66, 75, 215],
    nanyu: [65, 77, 205],
  },
  xishan: {
    qianwei: [62, 78, 195], taihua: [57, 23, 190], yuanci: [63, 77, 195],
    huangshan: [63, 77, 190], lutai: [64, 78, 190], xiaoci: [63, 79, 195],
    huaijiang: [69, 77, 200], kunlun: [68, 79, 205], yushan: [67, 79, 200],
    "zhang'e": [66, 79, 190], tianshan: [67, 78, 205], wenyao: [62, 80, 195],
    yanzi: [67, 78, 195], guishan: [65, 78, 205], yanzi4: [64, 59, 340],
  },
  beishan: {
    danhu: [66, 79, 205], danxun: [65, 77, 190], guanti: [67, 78, 190],
    daxian: [66, 79, 205], guancen: [66, 78, 190], gouwu: [66, 78, 210],
    shaoxian: [65, 80, 200], dunti: [66, 79, 195], macheng: [66, 78, 200],
    fajiu: [62, 77, 180], xuanyuan: [66, 78, 185], wufeng: [67, 78, 200],
  },
  dongshan: {
    shuzhu: [64, 78, 200], congzhuang: [67, 78, 200], taishan: [65, 79, 195],
    kongsang: [65, 88, 190], yueyu: [65, 78, 195], gengshan: [67, 82, 195],
    beishan: [44, 31, 160], shihu: [64, 79, 210], zhizhong: [64, 79, 190],
    mouyu: [65, 79, 195], beihao: [65, 77, 190], nuzheng: [65, 78, 190],
    shanshan: [66, 79, 195], qinshan: [65, 78, 195],
  },
  zhongshan: {
    xianshan: [65, 78, 210], yangshan: [66, 78, 210], aoanshan: [65, 78, 190],
    qingyaoshan: [65, 78, 195], kushan: [66, 78, 200], guyaoshan: [65, 78, 185],
    fengshan: [65, 78, 195], minshan: [67, 78, 205], guangshan: [53, 72, 195],
    dongtingshan: [65, 79, 200],
  },
}

// The landing zones keep secondary markers on features actually visible in
// each painting: ridge, stream, trees and open foreground respectively.
const SCENE_ZONES = {
  nanshan: {
    zhaoyao: [[48, 31], [72, 76], [59, 59], [63, 78]], zuyang: [[66, 29], [57, 73], [44, 59], [70, 76]],
    dishan: [[61, 31], [62, 75], [48, 58], [71, 77]], qingqiu: [[70, 31], [65, 75], [59, 54], [71, 75]],
    guishan: [[50, 28], [64, 77], [53, 60], [68, 78]], yaoguang: [[54, 27], [67, 75], [43, 60], [64, 76]],
    luwu: [[56, 31], [66, 77], [45, 62], [70, 77]], daoguo: [[49, 29], [66, 78], [54, 59], [69, 79]],
    danxue: [[51, 26], [66, 76], [49, 58], [68, 77]], nanyu: [[56, 24], [69, 77], [47, 60], [69, 77]],
  },
  xishan: {
    qianwei: [[48, 28], [58, 78], [59, 62], [65, 76]], taihua: [[55, 21], [62, 77], [49, 56], [66, 77]],
    yuanci: [[55, 29], [62, 78], [46, 59], [65, 76]], huangshan: [[69, 26], [47, 74], [60, 63], [65, 76]],
    lutai: [[54, 29], [54, 77], [64, 59], [65, 77]], xiaoci: [[44, 29], [57, 77], [46, 63], [65, 78]],
    huaijiang: [[51, 30], [63, 77], [59, 58], [70, 76]], kunlun: [[52, 29], [64, 79], [60, 57], [69, 77]],
    yushan: [[49, 31], [61, 78], [57, 62], [68, 78]], "zhang'e": [[65, 29], [49, 77], [59, 60], [68, 77]],
    tianshan: [[53, 29], [47, 78], [59, 61], [67, 77]], wenyao: [[52, 30], [60, 80], [45, 62], [64, 78]],
    yanzi: [[44, 28], [47, 78], [57, 61], [67, 77]], guishan: [[56, 26], [60, 77], [49, 58], [67, 77]],
    yanzi4: [[56, 22], [47, 77], [59, 58], [65, 67]],
  },
  beishan: {
    danhu: [[43, 26], [60, 78], [53, 59], [67, 77]], danxun: [[60, 28], [62, 77], [46, 57], [67, 77]],
    guanti: [[62, 25], [67, 78], [52, 59], [68, 77]], daxian: [[54, 25], [62, 79], [47, 58], [67, 77]],
    guancen: [[57, 28], [65, 78], [48, 60], [68, 77]], gouwu: [[53, 29], [62, 77], [49, 60], [66, 76]],
    shaoxian: [[53, 24], [61, 79], [47, 59], [66, 78]], dunti: [[49, 28], [61, 79], [47, 59], [66, 78]],
    macheng: [[46, 24], [59, 78], [50, 59], [66, 77]], fajiu: [[46, 27], [65, 77], [52, 58], [64, 77]],
    xuanyuan: [[48, 24], [65, 78], [52, 59], [67, 76]], wufeng: [[57, 29], [62, 78], [48, 60], [68, 77]],
  },
  dongshan: {
    shuzhu: [[59, 26], [58, 78], [50, 60], [66, 77]], congzhuang: [[53, 25], [66, 78], [55, 58], [67, 77]],
    taishan: [[45, 27], [64, 79], [56, 60], [67, 78]], kongsang: [[56, 28], [63, 76], [47, 57], [66, 77]],
    yueyu: [[55, 25], [65, 78], [48, 61], [67, 77]], gengshan: [[56, 26], [63, 78], [48, 59], [68, 77]],
    beishan: [[58, 28], [66, 76], [54, 57], [68, 75]], shihu: [[47, 27], [66, 79], [53, 59], [65, 78]],
    zhizhong: [[55, 26], [63, 78], [49, 61], [66, 77]], mouyu: [[52, 27], [65, 79], [54, 60], [67, 77]],
    beihao: [[48, 29], [57, 78], [57, 58], [66, 76]], nuzheng: [[51, 28], [65, 78], [53, 59], [67, 77]],
    shanshan: [[55, 26], [62, 79], [51, 58], [67, 78]], qinshan: [[47, 26], [63, 79], [51, 61], [66, 77]],
  },
  zhongshan: {
    xianshan: [[37, 31], [64, 78], [43, 57], [66, 77]], yangshan: [[55, 27], [62, 78], [48, 59], [68, 77]],
    aoanshan: [[59, 27], [63, 78], [49, 58], [67, 77]], qingyaoshan: [[58, 25], [64, 78], [49, 58], [67, 77]],
    kushan: [[45, 27], [65, 78], [56, 58], [67, 77]], guyaoshan: [[58, 27], [66, 78], [49, 60], [67, 77]],
    fengshan: [[52, 27], [61, 78], [48, 59], [67, 77]], minshan: [[54, 25], [62, 78], [48, 59], [68, 77]],
    guangshan: [[55, 26], [65, 79], [48, 59], [67, 77]], dongtingshan: [[54, 26], [65, 79], [49, 58], [67, 77]],
  },
}

export function getBeastLayout(volumeId, sceneId) {
  const placement = BEAST_ANCHORS[volumeId]?.[sceneId]
  if (!placement) return ART_LAYOUT[sceneId]?.beast
  const [x, y, width] = placement
  return { x, y, size: `clamp(${Math.round(width * .76)}px, ${Math.round(width / 18)}vw, ${width}px)`, scale: 1 }
}

export function getSceneZones(volumeId, sceneId) {
  return SCENE_ZONES[volumeId]?.[sceneId] || [[53, 29], [63, 77], [50, 59], [67, 77]]
}
