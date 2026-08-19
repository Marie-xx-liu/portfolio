# 素材清单 — 天空主题 → 水的主题

参考站 `justmckissick.com` 的视觉大约 60% 来自素材，40% 来自版式。
这份文档说明：**哪些我已经做掉了**、**哪些必须你提供**、以及每张图的确切规格。

---

## 一、参考站用了什么素材（拆解结果）

| 素材 | 用途 | 数量/规格 |
|---|---|---|
| 油画感云图 | 5 层 `position:fixed` 图层，滚动时交叉淡入淡出 | 1280×1280 PNG × 3–5 |
| 满屏 hero 云图 | 首屏背景 | 同上 |
| 产品界面截图 | Work 区大卡片 | 681×511（宽栏）/ 438×328（窄栏） |
| 侧项目图 | Other Work 2×2 网格 | 600×450 × 约 20 张（带轮播） |
| 纸飞机光标 | 装饰 / 多人在线光标 | SVG |
| 简历 PDF | 导航栏 Resume 按钮 | — |

配色 `#FFFDFA` / `#1C1C1C` / `#B8C4F2`（天青紫）。
字体 ITC Garamond Std Light Condensed（Adobe 付费）+ Switzer（Fontshare 免费）。

---

## 二、我已经做掉的（你不用出任何图）

### 1. 整个水面大气层 — 零图片
`src/lib/water.ts`，一个 `<canvas>` 程序化渲染：

- **四段调色板**随滚动插值：晨雾 → 开阔白日 → 低斜阳（你那张皮划艇图的时刻）→ 夜水
- 天空渐变 + 柔光日轮 + 地平线雾带 + 水面渐变
- **反光碎金带**：随距离展开、随时间闪动的短横线，这是"看起来是水"而不是"渐变色块"的关键
- **波纹带**：断续、抖动的笔触（连续直线会读成扫描线，所以特意打断）
- **一叶扁舟**：原创的细长船身剪影 + 单人 + 举桨，随滚动从左向右漂移，带浮沉和倾斜，水下有模糊倒影
- 暗角、颗粒噪点、`prefers-reduced-motion` 降级为静帧、标签页隐藏时暂停

体积 ≈ 5KB gzip，没有任何版权风险，颜色可随时调。

### 2. 其余矢量元素
- 图片占位符里的波纹 SVG
- 导航/卡片/链接的箭头图标
- 时间线上的"航标"脉冲点

### 3. 字体替换（免费且可自托管）
| 参考站 | 本站 | 说明 |
|---|---|---|
| ITC Garamond Std Light Condensed（付费） | **Cormorant Garamond Light 300** | 同为高对比度 Garamond，气质最接近的免费选项 |
| Switzer（Fontshare 免费但不在 npm） | **Inter Variable** | 角色相同的中性无衬线；想要 1:1 可从 Fontshare 下载 Switzer 自托管，改 2 行 CSS |

---

## 三、必须你提供的（我做不了，且直接决定观感）

### ⚠️ 优先级 1 — 项目配图（8 张，缺了这个页面是空的）

这是唯一真正的瓶颈。参考站每个卡片都靠一张产品界面图撑住，我无法凭空造出你做过的系统的界面。

放到 `public/work/` 下，**文件名必须完全一致**，放进去就自动显示（页面上现在显示的占位块写着确切路径）：

| 文件 | 对应项目 | 建议尺寸 |
|---|---|---|
| `public/work/agent-platform.webp` | Enterprise AI Agent Platform 0→1 | 876×656（4:3） |
| `public/work/rag-eval.webp` | Multimodal RAG Knowledge Product | 1362×1022（4:3） |
| `public/work/credit-intelligence.webp` | Multi-Agent Credit Intelligence | 1362×1022 |
| `public/work/askbi.webp` | Metric System & AskBI | 876×656 |
| `public/work/smart-factory.webp` | AI Factory Intelligence Platform | 876×656 |
| `public/work/ifrs17.webp` | IFRS 17 Consolidation | 1362×1022 |
| `public/work/computing-hub.webp` | €38M Computing-Hub Bid | 876×656 |
| `public/work/quality-intelligence.webp` | RAG Quality Intelligence | 876×656 |
| `public/work/library.webp` | The Library | 876×656 |
| `public/work/off-the-clock.webp` | Off the Clock（个人） | 876×656 |

支持 `.webp` `.avif` `.png` `.jpg`，按这个顺序取第一个存在的。

**脱敏要求**：真实截图里的客户名、真实数据、账号信息都要处理掉。
三种可行做法，按效果排序：
1. 重绘的界面示意图（Figma 画一版结构正确、数据虚构的界面）—— 最安全也最好看
2. 真实截图 + 打码/替换文案
3. 架构图 / 数据流图（对 RAG 评估、多智能体这类项目其实比界面截图更说明问题）

### ⚠️ 优先级 2
- **简历 PDF** → `public/resume.pdf`（参考站导航栏有 Resume 按钮，现在我放的是 Email）
- **OG 分享图** → `public/og-default.png`，1200×630。发到 LinkedIn 时的预览图，现在是 404
- **公司 logo**：参考站在公司名旁放了 logo。中科院自动化所 / DiPEAK / Deloitte 的商标使用需要你判断是否合适 —— 我的建议是**不放**，只用文字，规避风险且更克制

### 优先级 3 — 可选
- 你的个人照片（参考站没有，但联系区放一张会更有人味）
- 如果之后要换成方案 3（AI 油画水面），需要你出 4–5 张 2560px 宽的图，我会给你 prompt

---

## 四、换成 AI 油画水面（方案 3）时怎么办

代码已经为此隔离好了：**只有 `WaterBackdrop.astro` 一个文件需要改**，页面和组件一行都不用动。

需要 4 张图，对应四个时刻，命名 `public/water/01.webp` … `04.webp`，2560×2560：

1. 晨雾中的静水，极淡的灰蓝，远处地平线几乎看不见
2. 开阔白日的海面，清透的蓝绿，细碎反光
3. 低斜阳下的水面，珊瑚橙与深蓝的强对比（你发我的那张皮划艇图就是这个时刻）
4. 夜色深水，靛蓝与近黑，一点月光反射

风格关键词：油画笔触、透纳（Turner）式的光、柔和边缘、无人物无船（船是我用代码画的，要保持独立可动）。

---

## 五、当前状态

- ✅ 全站结构、版式、动效、二级页、部署配置 —— 完成
- ✅ 水面主题 —— 完成（程序化，无需素材）
- ⬜ 10 张项目配图 —— **等你**
- ⬜ resume.pdf / og-default.png —— **等你**
