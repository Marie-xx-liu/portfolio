# 部署到 GitHub Pages + 自定义域名

全程免费（公开仓库）。构建由 `.github/workflows/deploy.yml` 完成，推到 `main` 就自动发布。

---

## 1 · 建仓库并推上去

**不需要买域名。** GitHub 免费给网址，两种形状随你选，区别只在仓库名：

| 仓库名 | 免费网址 | `astro.config.mjs` 里的 `BASE` |
|---|---|---|
| `marie-portfolio`（或任意名字） | `https://xx-liu-2244.github.io/marie-portfolio/` | `'/marie-portfolio'`（当前默认） |
| `xx-liu-2244.github.io` | `https://xx-liu-2244.github.io/` | `''` |

内部链接全部走 `src/lib/url.ts` 的 `href()`，会自动加上前缀，**两种都能正常跑**（已验证：子目录下所有站内链接返回 200）。所以随便选，只要 `BASE` 和仓库名对上。

> 如果仓库名不叫 `marie-portfolio`，记得把 `astro.config.mjs` 里的 `BASE` 改成 `'/你的仓库名'`。

```bash
git add -A && git commit -m "Water-themed portfolio rebuild"
```

然后在 GitHub 建仓库，并：

```bash
git remote add origin git@github.com:xx-liu-2244/<仓库名>.git
git push -u origin main
```

## 2 · 打开 Pages

仓库 → **Settings** → **Pages** → **Build and deployment** → Source 选 **GitHub Actions**。

（不要选 "Deploy from a branch"，那个模式跑不了构建。）

推一次 main，Actions 标签页里会看到 Deploy 工作流跑起来，约 1 分钟。

---

## 3 · 自定义域名（可选，想要更好看的网址再做）

上面两步做完站点已经在线了。以下只在你想要 `marieliu.com` 这种网址时才需要。

### 3.1 买域名
Cloudflare Registrar（按成本价卖，无溢价）、Namecheap、Porkbun 都行。`.com` 约 €10–12/年。域名本身是唯一必然的花费。

### 3.2 配 DNS

**用根域名**（`marieliu.com`）—— 在域名商处加 4 条 A 记录：

```
A  @  185.199.108.153
A  @  185.199.109.153
A  @  185.199.110.153
A  @  185.199.111.153
```

外加一条 AAAA（IPv6，可选但建议）：

```
AAAA  @  2606:50c0:8000::153
AAAA  @  2606:50c0:8001::153
AAAA  @  2606:50c0:8002::153
AAAA  @  2606:50c0:8003::153
```

**用子域名**（`www.marieliu.com`）—— 一条 CNAME 就够：

```
CNAME  www  xx-liu-2244.github.io.
```

> ⚠️ 如果用 Cloudflare 做 DNS，这几条记录的代理开关要设成 **DNS only（灰云）**，不要开橙云。开了会和 GitHub 的证书签发打架。

### 3.3 在 GitHub 填域名
Settings → Pages → **Custom domain** 填入域名 → Save。
GitHub 会自动在仓库里生成一个 `CNAME` 文件（**把它 pull 下来**，否则下次 push 会被覆盖掉）。

DNS 生效后（几分钟到几小时），勾上 **Enforce HTTPS**。证书由 Let's Encrypt 自动签发，免费。

### 3.4 改两行配置
`astro.config.mjs`：

```js
const SITE_URL = process.env.SITE_URL ?? 'https://marieliu.com';
const BASE = process.env.BASE_PATH ?? '';   // 自定义域名是根目录，清空
```

`src/data/site.ts` 里的 `url` 保持一致。这两个值只影响 sitemap、canonical 和分享卡片的绝对链接 —— 写错了页面看起来正常，但搜索引擎和 LinkedIn 预览会指向错误地址。

---

## 4 · 日常改内容

不用碰组件，改数据文件就行：

| 想改什么 | 改哪里 |
|---|---|
| 首屏那句话、章节文案、项目卡片 | `src/data/home.ts` |
| 项目详情页正文 | `src/data/products.ts` |
| 邮箱 / 城市 / LinkedIn | `src/data/site.ts` |
| Library 条目 | `src/data/library.ts` |
| 换图 | 丢进 `public/work/`，文件名对上即可（见 `docs/assets.md`） |

本地预览：

```bash
npm run dev
```

推到 main 即自动重新部署。
