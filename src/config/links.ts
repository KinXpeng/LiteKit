import type { LinkItem } from '@/types'

/**
 * ============================================================
 *  链接总表 —— 全站唯一数据源
 * ============================================================
 *
 *  日常维护只需要动这个文件：
 *
 *  · 新增一条：复制一段对象，改 id / name / url / categoryId / description / addedAt
 *  · 删除一条：整段删掉（若想留档，把 status 改成 'removed'）
 *  · 修改一条：直接改字段；改了名字或分类，页面会自动跟着变
 *  · 置顶到首页：featured: true（首页最多取 3 条，按本文件里的顺序）
 *
 *  字段说明
 *  - id          唯一标识，小写短横线，别重复（重复会在控制台报警告）
 *  - url         外部站点地址，域名会自动从 url 里解析出来展示
 *  - categoryId  必须是 categories.ts 里存在的 id
 *  - description 一行说清「什么时候用它」，建议 22 字以内
 *  - addedAt     收录日期（YYYY-MM-DD），首页「最近收录」按它倒序
 *  - tags        可选，参与搜索匹配
 *  - status      可选，'removed' 表示已下架：保留数据但不在页面出现
 * ============================================================
 */
export const linkCatalog: LinkItem[] = [
  // ── 效率与笔记 ─────────────────────────────────────────────
  {
    id: 'notion',
    name: 'Notion',
    url: 'https://www.notion.so',
    categoryId: 'productivity',
    description: '文档、待办、表格混着写',
    tags: ['笔记', '协作'],
    addedAt: '2024-05-12',
  },
  {
    id: 'excalidraw',
    name: 'Excalidraw',
    url: 'https://excalidraw.com',
    categoryId: 'productivity',
    description: '手绘风格的白板，离线也能用',
    tags: ['白板', '画图'],
    featured: true,
    addedAt: '2026-11-18',
  },
  {
    id: 'tldraw',
    name: 'tldraw',
    url: 'https://tldraw.com',
    categoryId: 'productivity',
    description: '轻量白板，协作拖拽很顺',
    tags: ['白板'],
    addedAt: '2026-11-18',
  },
  {
    id: 'linear',
    name: 'Linear',
    url: 'https://linear.app',
    categoryId: 'productivity',
    description: '团队 issue 管理，快且干净',
    tags: ['项目管理'],
    addedAt: '2025-02-08',
  },
  {
    id: 'craft',
    name: 'Craft',
    url: 'https://www.craft.do',
    categoryId: 'productivity',
    description: '排版好看的文档工具',
    tags: ['文档'],
    addedAt: '2026-11-18',
  },
  {
    id: 'capacities',
    name: 'Capacities',
    url: 'https://capacities.io',
    categoryId: 'productivity',
    description: '以「对象」组织的笔记',
    tags: ['笔记'],
    addedAt: '2026-09-14',
  },
  {
    id: 'heptabase',
    name: 'Heptabase',
    url: 'https://heptabase.com',
    categoryId: 'productivity',
    description: '白板式知识库，适合梳理',
    tags: ['知识库'],
    addedAt: '2026-06-02',
  },

  // ── 图片处理 ───────────────────────────────────────────────
  {
    id: 'squoosh',
    name: 'Squoosh',
    url: 'https://squoosh.app',
    categoryId: 'image',
    description: '浏览器里压图，格式随便转',
    tags: ['压缩'],
    addedAt: '2026-11-05',
  },
  {
    id: 'tinypng',
    name: 'TinyPNG',
    url: 'https://tinypng.com',
    categoryId: 'image',
    description: '老牌压图，稳定很少出错',
    tags: ['压缩'],
    addedAt: '2025-11-20',
  },
  {
    id: 'photopea',
    name: 'Photopea',
    url: 'https://www.photopea.com',
    categoryId: 'image',
    description: '网页版 PS，能开 PSD',
    tags: ['修图', 'PSD'],
    featured: true,
    addedAt: '2026-11-05',
  },
  {
    id: 'removebg',
    name: 'remove.bg',
    url: 'https://www.remove.bg',
    categoryId: 'image',
    description: '一键抠图，边缘还算干净',
    tags: ['抠图'],
    addedAt: '2026-03-11',
  },
  {
    id: 'iloveimg',
    name: 'iLoveIMG',
    url: 'https://www.iloveimg.com',
    categoryId: 'image',
    description: '批量裁剪、转格式、加水印',
    tags: ['批处理'],
    addedAt: '2025-08-19',
  },

  // ── 设计与配色 ─────────────────────────────────────────────
  {
    id: 'coolors',
    name: 'Coolors',
    url: 'https://coolors.co',
    categoryId: 'design',
    description: '五秒生成一套能用的配色',
    tags: ['配色'],
    addedAt: '2024-09-06',
  },
  {
    id: 'fontshare',
    name: 'Fontshare',
    url: 'https://www.fontshare.com',
    categoryId: 'design',
    description: '免费商用字体，质量意外地好',
    tags: ['字体'],
    addedAt: '2025-04-22',
  },
  {
    id: 'mobbin',
    name: 'Mobbin',
    url: 'https://mobbin.com',
    categoryId: 'design',
    description: '真实 App 界面截图库',
    tags: ['灵感', 'UI'],
    addedAt: '2026-01-15',
  },
  {
    id: 'figma-community',
    name: 'Figma Community',
    url: 'https://www.figma.com/community',
    categoryId: 'design',
    description: '免费模板和插件',
    tags: ['模板'],
    addedAt: '2025-06-30',
  },
  {
    id: 'haikei',
    name: 'Haikei',
    url: 'https://haikei.app',
    categoryId: 'design',
    description: '生成波浪、渐变、噪点背景',
    tags: ['背景'],
    addedAt: '2026-07-08',
  },

  // ── 开发工具 ───────────────────────────────────────────────
  {
    id: 'regex101',
    name: 'regex101',
    url: 'https://regex101.com',
    categoryId: 'dev',
    description: '正则调试，逐段解释',
    tags: ['正则'],
    featured: true,
    addedAt: '2024-07-03',
  },
  {
    id: 'carbon',
    name: 'Carbon',
    url: 'https://carbon.now.sh',
    categoryId: 'dev',
    description: '代码截图，导出好看',
    tags: ['截图'],
    addedAt: '2025-01-19',
  },
  {
    id: 'jwt-io',
    name: 'jwt.io',
    url: 'https://jwt.io',
    categoryId: 'dev',
    description: 'JWT 解析，看得懂 payload',
    tags: ['调试'],
    addedAt: '2025-09-11',
  },
  {
    id: 'jsoncrack',
    name: 'JSON Crack',
    url: 'https://jsoncrack.com',
    categoryId: 'dev',
    description: 'JSON 转成关系图',
    tags: ['JSON'],
    addedAt: '2026-10-08',
  },
  {
    id: 'hoppscotch',
    name: 'Hoppscotch',
    url: 'https://hoppscotch.io',
    categoryId: 'dev',
    description: '在线调接口，比 Postman 轻',
    tags: ['API'],
    addedAt: '2026-02-27',
  },
  {
    id: 'devdocs',
    name: 'DevDocs',
    url: 'https://devdocs.io',
    categoryId: 'dev',
    description: '所有文档合成一个搜索框',
    tags: ['文档'],
    addedAt: '2024-11-02',
  },

  // ── 文本与写作 ─────────────────────────────────────────────
  {
    id: 'deepl',
    name: 'DeepL',
    url: 'https://www.deepl.com',
    categoryId: 'writing',
    description: '长句翻译，比机翻顺',
    tags: ['翻译'],
    addedAt: '2024-10-21',
  },
  {
    id: 'quillbot',
    name: 'QuillBot',
    url: 'https://quillbot.com',
    categoryId: 'writing',
    description: '英文改写，降重时能用',
    tags: ['改写'],
    addedAt: '2025-03-17',
  },
  {
    id: 'hemingway',
    name: 'Hemingway',
    url: 'https://hemingwayapp.com',
    categoryId: 'writing',
    description: '揪出长句和被动语态',
    tags: ['校对'],
    addedAt: '2026-04-09',
  },
  {
    id: 'xiezuocat',
    name: '秘塔写作猫',
    url: 'https://www.xiezuocat.com',
    categoryId: 'writing',
    description: '中文校对和润色',
    tags: ['校对'],
    addedAt: '2026-08-26',
  },

  // ── 文件与转换 ─────────────────────────────────────────────
  {
    id: 'ilovepdf',
    name: 'iLovePDF',
    url: 'https://www.ilovepdf.com',
    categoryId: 'file',
    description: 'PDF 合并拆分，最常用',
    tags: ['PDF'],
    addedAt: '2024-06-14',
  },
  {
    id: 'cloudconvert',
    name: 'CloudConvert',
    url: 'https://cloudconvert.com',
    categoryId: 'file',
    description: '什么格式都能转',
    tags: ['转换'],
    addedAt: '2025-05-23',
  },
  {
    id: 'zamzar',
    name: 'Zamzar',
    url: 'https://www.zamzar.com',
    categoryId: 'file',
    description: '冷门格式的备选',
    tags: ['转换'],
    addedAt: '2026-10-22',
  },
  {
    id: 'stirlingpdf',
    name: 'Stirling PDF',
    url: 'https://stirlingpdf.com',
    categoryId: 'file',
    description: '可自建的 PDF 工具箱',
    tags: ['PDF', '自建'],
    addedAt: '2026-05-04',
  },

  // ── 已下架（保留记录，页面不展示）─────────────────────────
  {
    id: 'typora',
    name: 'Typora',
    url: 'https://typora.io',
    categoryId: 'writing',
    description: 'Markdown 编辑器，已转付费',
    tags: ['Markdown'],
    status: 'removed',
    addedAt: '2024-08-01',
  },
]
