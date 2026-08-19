# 文案地图 — 每一句话住在哪里

> 全站文案都在 `src/data/*.ts` 里，**组件里没有硬编码任何业务文案**。
> 改文案不需要碰组件。改完 `git push` 即自动重新部署。

按你在页面上看到的**从上到下顺序**排列。

---

## 一、首页 `/`

### 1 · Hero 首屏
📁 `src/data/home.ts` → `export const hero`

| 字段 | 当前值 | 说明 |
|---|---|---|
| `greeting` | "Hello! Welcome to my corner of the Web." | 第一行，独占一行 |
| `line` | "I'm an AI Product Manager who has learned to read the current…" | 主句 |

> ⚠️ 长度敏感：桌面端 5 行最佳。`greeting` + `line` 合计控制在 **28–32 词**，超过会挤到 7 行并和小船打架。

---

### 2 · `#arc` 产品线索引区 ⬅️ **当前是占位文案**
📁 `src/data/home.ts` → `export const arc`

| 字段 | 状态 | 说明 |
|---|---|---|
| `arc.title` | 占位 | h2 标题。`\n` 会渲染成换行 |
| `arc.intro` | **PLACEHOLDER** | 约 60 词的引言 |
| `arc.stages[].key` | 固定 | 不要改，四个 stage 是数据键 |

四个 stage 的**显示名**在同文件 `STAGE_LABELS`：
```
custom → 'Custom delivery'   productized → 'Productized'
platform → 'Platform'        commercialized → 'Commercialized'
```
每段下方的数量是**自动算的**，不用手写。

---

### 3 · Work 公司章节（三块）
📁 `src/data/home.ts` → `export const chapters`

每个公司块的字段：

| 字段 | 出现位置 | 长度建议 |
|---|---|---|
| `org` | 大标题（左） | 一个词最佳 |
| `role` | 标题右侧 | 一行 |
| `dates` | 最右 | — |
| `stageLabel` | 日期左侧的 mono 徽标 | 1–2 词 |
| `marquee` | 标题下的跑马灯条 | 短句，会无限重复 |
| `headline` | 大号衬线标题 | **2–4 行**，约 20–28 词 |
| `description` | 正文段 | 约 60–90 词 |
| `disciplines` | 左栏「Disciplines」 | 用 ` · ` 分隔 |
| `myRole` | 右栏「My Role」 | 1–2 句 |

三块的 id（同时是锚点，改了会断链）：`zidongtaichu` / `dipeak` / `deloitte`

---

### 4 · 作品卡（8 张）
📁 `src/data/home.ts` → `chapters[].features`

| 字段 | 说明 |
|---|---|
| `title` | 卡片标题 |
| `blurb` | 卡片描述，**约 25–40 词**（超了会撑高卡片，破坏 40/60 行节奏） |
| `kind` | `product` / `engagement` — 决定视觉权重和分组，不是文案 |
| `stage` | 四选一，喂给 `#arc` 的计数 |
| `builtOn` | 指向另一张卡的 `project` id，渲染成「Built on …」 |
| `project` | 卡片 id，**同时是详情页路由和锚点** |
| `asset` | 图片路径，见 `docs/assets.md` |
| `span` | `narrow` (40%) / `wide` (60%) |

> ⚠️ `title` 改了，指向它的「Built on {title}」那行会**跟着变**——因为是从数据解析的，不是复制的。

**8 张卡的 id：**
`pm-agent-platform` · `pm-rag-eval` · `pm-catl-rag` · `pjm-ningxia-bid` ·
`bi-citic-metrics` · `pm-citic-multiagent` · `pjm-tbea-smartfactory` · `bi-ifrs17`

---

### 5 · 「Also」小栏（Library / Off the Clock）
📁 `src/data/home.ts` → `export const aside`

字段同作品卡，但没有 `kind`/`stage`（它们不是作品）。

---

### 6 · `#experience` 航程时间线
📁 `src/data/home.ts` → `export const voyage`

| 字段 | 说明 |
|---|---|
| `year` | 左栏年份 |
| `org` | 机构名 |
| `note` | 一句话，约 10–16 词 |
| `now` | `true` 的那条会加一个呼吸的定位点 |

区块标题（"Past crossings, in the order they happened"）目前**写在页面里**：
📁 `src/pages/index.astro` → 搜 `section__title--big`

---

### 7 · `#ahead` 未来方向
📁 `src/data/home.ts` → `export const ahead`

`title`（`\n` 换行）/ `subtitle` / `themes[]`（每项 `title` + `body`，body 约 35–50 词）

---

### 8 · `#contact` 联系区
📁 `src/components/ContactBlock.astro` ⬅️ **这块文案还写在组件里**

标题 "Plenty of water still ahead."、正文段、按钮文字都在组件内。
邮箱 / LinkedIn / 城市来自 `src/data/site.ts`。

> 如果你要改这块，告诉我，我把它也抽到 `home.ts` 里保持一致。

---

## 二、项目详情页 `/work/<id>`（8 页）

📁 `src/data/products.ts` → `export const projects`

| 字段 | 出现位置 |
|---|---|
| `title` | 页面大标题 |
| `client` | 标题上方的 eyebrow（已脱敏，注意保持） |
| `role` | 决定用哪套四段结构 ↓ |

**两套四段结构**（按 `role` 自动选）：

| PM / BI 项目 | 渲染标题 |
|---|---|
| `elements.design` | The Design Decision |
| `elements.tech` | How It Was Built |
| `elements.eval` | How It Was Evaluated |
| `elements.impact` | What Changed |

| PJM 项目 | 渲染标题 |
|---|---|
| `elements.background` | The Situation |
| `elements.actions` | What I Did |
| `elements.method` | Method |
| `elements.effect` | The Outcome |

> 四段的**小标题**写在 `src/pages/work/[slug].astro` 的 `SCHEMAS` 常量里。
> 详情页顶部的导语直接复用首页卡片的 `blurb`，不重复写。

---

## 三、Library 页 `/library`

📁 `src/data/library.ts` → `export const library`

每条：`title` / `problem`（一句话问题定义）/ `note`（**你的观点，目前 17 条全是 MOCK 待替换**）/ `type` / `layer` / `maturity` / `source` / `sourceName`

页面标题和引言在 📁 `src/pages/library.astro`。

---

## 四、全站

### 身份与联系方式
📁 `src/data/site.ts` → `export const site`
`name` / `tagline` / `url` / `email` / `location` / `social.linkedin`

### SEO（浏览器标签页标题 + 搜索结果摘要 + 分享卡片）
📁 `src/data/site.ts` → `export const seo`
每个路由一组 `title` / `description`。

> ⚠️ `seo['/product']` 等几个 key 对应的页面已归档，不再使用。
> 现在生效的只有 `'/'` 和 `'/library'`。详情页标题由 `[slug].astro` 自动生成。

### 导航栏
📁 `src/components/CapsuleNav.astro` → `links` 数组（Work / Experience / Library）

### 结构化数据（Google 用）
📁 `src/data/site.ts` → `export const personJsonLd`

---

## 五、优先级建议

按对读者影响排序：

1. **`arc.intro`** — 唯一的 PLACEHOLDER，且是全站叙事的总纲
2. **8 张卡的 `blurb`** — 决定读者会不会点进详情页
3. **三块 `headline` / `description`** — 公司章节的说服力主体
4. `products.ts` 的四段结构 — 详情页正文
5. `library.ts` 的 17 条 `note` — 全是 MOCK
6. `ContactBlock.astro` — 收尾

---

## 六、交给我的格式

直接按上面的路径 + 字段名给我就行，例如：

```
home.ts / arc.intro:
<新文案>

home.ts / chapters[dipeak].headline:
<新文案>

home.ts / features[pm-agent-platform].blurb:
<新文案>
```

不用管代码，我负责落位和长度校验（会检查是否撑破行数节奏）。
