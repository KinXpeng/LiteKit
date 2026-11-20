# 轻序 LiteKit · 精选链接导航

一个手工维护的「好工具收藏夹」。每个条目只是一条外链，点开直接跳到工具原站——不作中转、不代理、不插广告。

技术栈：**React 18 + TypeScript + Vite + Tailwind CSS + Ant Design 5 + React Router 6**

---

## 快速开始

```bash
cd D:\前端\项目\litekit     # 一定要进到这个目录，package.json 在这一层
npm install
npm run dev                 # http://localhost:5173
npm run build               # 产物在 dist/
npm run preview             # 本地预览打包结果
```

> **Node 版本要求：18 或更高**（Vite 5 的硬性要求，已在 22.23.2 上验证）。
> 用 nvm-windows 的话先切版本：`nvm use 22.23.2`（需要管理员权限的终端）。
> 版本不够时 `npm run dev` 会直接提示，不会抛看不懂的 crypto 报错。

---

## 起不来的时候按这个顺序排查

| 现象 | 原因 | 解法 |
| --- | --- | --- |
| `crypto$2.getRandomValues is not a function` | Node 版本低于 18 | `nvm use 22.23.2`（或 `nvm install 22`）后重试 |
| `Missing script: "dev"` / `ENOENT: package.json` | 终端不在项目目录里（在 `D:\前端\项目` 这一层） | `cd D:\前端\项目\litekit` 再执行 |
| `Cannot find module 'vite'` 之类的 | `node_modules` 没装好 | `rm -rf node_modules package-lock.json` 后重新 `npm install` |
| 双击 `index.html` 打开是白屏 | 这是 Vite 项目，不能直接用 `file://` 打开 | 走 `npm run dev`，或者 `npm run build` 后用 `npm run preview` |
| 页面打开是白屏但终端没报错 | 按 F12 看 Console；多半是端口被占，Vite 自动换了端口 | 看终端里实际打印的 `Local: http://localhost:xxxx` |
| `Port 5173 is in use` | 上次的 dev 没关掉 | 关掉旧终端，或用 `npm run dev -- --port 5174` |
| 改名 / 移动了文件夹后起不来 | 旧终端的工作目录已经不存在了 | 关掉旧终端，重新 `cd` 到新路径再启动 |

---

## 最重要的三件事

全站内容都来自 `src/config/`，**日常维护不需要改任何组件代码**。

### 1. 增删改链接 → `src/config/links.ts`

```ts
{
  id: 'my-tool',            // 唯一，小写短横线
  name: '我的工具',           // 页面上显示的名字
  url: 'https://example.com', // 必须是 http(s) 开头，域名会自动解析出来
  categoryId: 'dev',         // 必须是 categories.ts 里存在的 id
  description: '一句话说清什么时候用它', // 建议 22 字以内
  tags: ['调试'],             // 可选，参与搜索
  featured: true,            // 可选，勾上会出现在首页首屏的搜索预览里
  addedAt: '2026-11-20',     // 收录日期，首页「最近收录」按它倒序
}
```

- **加一条**：复制一段，改字段即可，页面上的数量、分类统计、最近收录全部自动更新
- **删一条**：整段删掉
- **想留档**：把 `status` 改成 `'removed'`，数据还在，但页面不再展示
- **改一条**：直接改，改了名称/分类/描述，所有页面同步变化

> 数量不用手写。首页徽标、分类卡上的数字、页脚「全部 N 个链接」，全部由 `links.ts` 现算。

### 2. 增删改分类 → `src/config/categories.ts`

```ts
{ id: 'video', name: '视频工具', slug: 'video', description: '剪辑、转码、抽帧。' }
```

加完分类后，首页分类卡、「全部链接」的筛选 chip、页脚分类列会自动多一项。
**删分类前记得把它的链接挪到别的分类**，否则开发环境控制台会报警告。

### 3. 写更新日志 → `src/config/changelog.ts`

```ts
{ id: 'c-1120-1', date: '2026-11-20', type: 'add', name: 'Squoosh', domain: 'squoosh.app' }
```

`type` 可选 `add` / `update` / `remove`；`date` 相同的条目会自动归到同一组，按日期倒序展示。
`note` 可选，会跟在域名后面（例如「已转付费」）。

---

## 其它可配置项

| 想改什么 | 改哪个文件 |
| --- | --- |
| 站点名称、邮箱、主张、页脚文案、首屏文案 | `src/config/site.ts` |
| 顶部导航（名称 + 路径） | `src/config/nav.ts` |
| 各页面的标题 / 说明 / 眉标 | `src/config/pages.ts` |
| 首页「收录标准」三条 | `src/config/principles.ts` |
| 配色、字体、圆角 | `tailwind.config.js` + `src/styles/theme.ts` |

`src/config/pages.ts` 里的文案支持占位符：`{count}` 链接总数、`{categoryCount}` 分类数、`{cycle}` 更新频率。
所以文案里写 `全部 {count} 个链接`，链接数变了文案会自动跟着变。

---

## 目录结构

```
src/
├─ config/              ← 内容都在这里，改这一个目录就能改全站
│  ├─ links.ts          ← 链接总表（最常改）
│  ├─ categories.ts     ← 分类
│  ├─ changelog.ts      ← 更新日志
│  ├─ site.ts           ← 站点身份与首屏文案
│  ├─ nav.ts            ← 导航
│  ├─ pages.ts          ← 各页标题与说明
│  ├─ principles.ts     ← 收录标准
│  └─ index.ts          ← 汇总 + 派生数据（计数、分组、排序）
├─ types/               ← 配置的类型定义（改字段前先看这里）
├─ lib/
│  ├─ derive.ts         ← 分组 / 统计 / 搜索 / 排序（纯函数）
│  ├─ format.ts         ← 日期、域名、占位符替换
│  └─ validate.ts       ← 开发环境配置体检
├─ hooks/useLinkSearch.ts ← 关键词 + 分类筛选
├─ context/SearchContext.tsx ← 命令面板开关（Ctrl/⌘ + K）
├─ components/
│  ├─ layout/           ← Header / Footer / RootLayout / 移动端抽屉
│  ├─ common/           ← 图标、Logo、区块标题、内页页头
│  ├─ links/            ← 链接行、链接表、分类 chip、搜索框
│  ├─ home/             ← 首屏、分类网格、最近收录、收录标准
│  └─ search/           ← 命令面板（Ctrl K）
├─ pages/               ← 五个页面，只做组装
└─ styles/theme.ts      ← AntD 主题 token
```

每个组件只负责一件事，页面文件只做「拼装」，单文件基本都在 100 行以内。

---

## 路由

| 路径 | 页面 |
| --- | --- |
| `/` | 首页 |
| `/links` | 全部链接（支持 `?category=dev` 直达某个分类） |
| `/categories` | 分类 |
| `/changelog` | 更新 |
| `/about` | 关于（`#contact` 可直接定位到联系模块） |

---

## 一点约定

- **配置体检**：开发环境启动后，如果 `id` 重复、`categoryId` 不存在、`url` 格式不对、日期格式不对，控制台会列出具体是哪一条。
- **搜索**：名称、描述、域名、标签都参与匹配。
- **字体**：Noto Serif SC（标题）/ Noto Sans SC（正文）/ IBM Plex Mono（小标签），通过 Google Fonts 引入。如果国内加载慢，可以把 `index.html` 里的字体链接换成本地字体或镜像。
