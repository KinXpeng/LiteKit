import type { Category } from '@/types'

/**
 * 分类配置。
 * - 数量、首页分类卡、「全部链接」的筛选 chip 全部由 links.ts 自动统计，不用手写数字
 * - 增删分类只改这里；删掉分类前记得把对应链接挪到别的分类
 */
export const categories: Category[] = [
  {
    id: 'productivity',
    name: '效率与笔记',
    slug: 'productivity',
    description: '待办、大纲、白板、随手记，打开就能写。',
  },
  {
    id: 'image',
    name: '图片处理',
    slug: 'image',
    description: '压图、抠图、格式转换，基本不用装软件。',
  },
  {
    id: 'design',
    name: '设计与配色',
    slug: 'design',
    description: '取色、配字体、找灵感，做页面前先逛一圈。',
  },
  {
    id: 'dev',
    name: '开发工具',
    slug: 'dev',
    description: '正则、JSON、编码、临时接口，调试时最常开的那几个。',
  },
  {
    id: 'writing',
    name: '文本与写作',
    slug: 'writing',
    description: '润色、翻译、查字数、随手排版。',
  },
  {
    id: 'file',
    name: '文件与转换',
    slug: 'file',
    description: 'PDF、Office、压缩包，临时救急用。',
  },
]
