# 山海经 · 五经滚动长卷（shanhai-scroll）

《山海经》数字地理志的"读经模式"：在世界地图点进某一经，进入该经的**滚动叙事长卷**——向下滑动 = 沿这条山脉行走。

上位项目文档见 `D:\素材\山海经\东山经滚动叙事-项目文档.md`。

## 技术栈

- Vite + React 18 + React Router（hash 路由）
- 原生滚动监听 + IntersectionObserver（路线生长、卡片浮现）
- 数据驱动：每经一份 JSON，加经不加代码

## 目录结构

```
src/
├─ components/
│  ├─ ScrollScroll.jsx   长卷壳（滚动进度、段落追踪、渡海变色）
│  ├─ RouteSVG.jsx       路线生长动效（虚线随滚动延伸、节点点亮）
│  ├─ BeastCard.jsx      异兽图鉴卡（滑入+微旋转）
│  ├─ GodDivider.jsx     山神转场/收束
│  └─ MiniOverview.jsx   左上五经迷你总览（当前经高亮）
├─ data/
│  ├─ jinglist.js        五经元信息（未完成的经置灰占位）
│  └─ dongshan.json      东山经全量数据（路线节点/物产/异兽/山神/文案）
└─ pages/
   ├─ Home.jsx           五经入口
   └─ ScrollPage.jsx     长卷路由页
```

## 素材占位说明

所有图片用**带名字的虚线占位框**。补素材时把 PNG 放进 `public/img/`，文件名与 JSON 中的 `img` 字段一致即可自动显示：

- 异兽：`beast-<id>.png`（如 `beast-congcong.png` 从从、`beast-qiuyu.png` 犰狳）
- 山神：`god-<name>.png`（如 `god-dragon.png` 人身龙首神、`god-goat.png` 人身羊角神）

## 运行

```bash
npm install
npm run dev
```

浏览器打开提示的地址（默认 http://localhost:5173）。

## 当前状态

- ✅ 东山经长卷全流程可滚（溯水 → 穿林 → 渡海变色 → 登岛 → 尾屏）
- ⬜ 南山经 / 西山经 / 北山经 / 中山经：待路线图素材与数据
