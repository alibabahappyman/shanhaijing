# 山海行卷 · Shan Hai Jing（The Wandering Myth）

以数字长卷重述《山海经》——一次民族文化的创新性表达。

有人说，中国人的浪漫，一半在诗词，一半在山海。《山海行卷》将这部先秦古籍全本体系化为一个可游、可读、可治愈的交互网页：向下滚动，就是沿上古山脉逐山行走。

**在线访问**：https://shanhaijing-nine.vercel.app/

## 作品板块

| 板块 | 内容 |
| --- | --- |
| 五藏山经滚动长卷 | 点入某一经，向下滚动即沿山脉逐山行走：路线随滚动生长、山川逐一点亮、异兽图鉴卡滑入浮现、渡海画面变色、以山神收束全卷 |
| 海内海外经寰宇志 | 八经异国异兽依经文次第在海图上浮现，可循航线逐站游历 |
| 大荒经神话卡牌 | 羲和浴日、应龙杀蚩尤等十六段上古神话，以"印章短语 + 经文 + 白话故事"的正反面卡牌呈现 |
| 异兽图鉴 | 数十种异兽配原创动图与考据档案，含"山海百灵"专题，还原"以兽喻人"的镜像寓意 |
| 编者按 | 阐明作品内核：山海经不是志怪猎奇，而是华夏最古老的浪漫与想象力 |

另含水墨卷首开场动画、背景古乐、水墨光标等沉浸细节，全站支持中英双语切换。

## 技术栈

- Vite + React 18 + React Router（hash 路由）+ GSAP
- 原生滚动监听 + IntersectionObserver（路线生长、卡片浮现）
- 数据驱动：每经一份 JSON，加经不加代码
- 纯前端静态站点，无后端，部署于 Vercel

## 目录结构

```
src/
├─ components/        长卷壳、路线生长、异兽卡、寰宇图、卷首动画等约 30 个组件
├─ data/
│  ├─ {dongshan,nanshan,xishan,beishan,zhongshan}.json   五藏山经全量数据
│  ├─ haiJing.js / haiGazetteer.js                        海内海外经
│  ├─ dahuangCards.js                                     大荒神话卡牌
│  ├─ bestiary.js / beastProfiles*.js                     异兽图鉴
│  └─ editorNote.js                                       编者按
├─ i18n/              中英双语语言上下文
├─ pages/             Home / ScrollPage / BestiaryPage / DahuangCards / HaiJingPage / EditorNotePage
└─ styles/            全局与模块样式
```

素材位于 `public/assets/`（五经长卷图、异兽动图、寰宇底图、音频、字体等），生成与处理脚本见 `scripts/`。

## 运行

```bash
npm install
npm run dev     # 开发，默认 http://localhost:5173
npm run build   # 构建产物输出到 dist/
```

## 部署

项目为纯静态站点，已部署在 Vercel：推送至 GitHub 后 Vercel 自动以 Vite 预设构建（`npm run build` → `dist/`），无需额外配置。
