/** 全站类型定义 —— 配置文件的「合同」，改配置前先看这里 */

export type LinkStatus = 'active' | 'removed'

/** 分类：决定「分类」页的分组、首页的分类卡、「全部链接」页的筛选 chip */
export interface Category {
  id: string
  name: string
  slug: string
  description: string
}

/** 一条链接。status 为 removed 时保留在配置里但不出现在页面上 */
export interface LinkItem {
  id: string
  name: string
  url: string
  categoryId: string
  description: string
  tags?: string[]
  featured?: boolean
  addedAt: string
  status?: LinkStatus
}

export type ChangeType = 'add' | 'update' | 'remove'

/** 更新日志的一条记录 */
export interface ChangeEntry {
  id: string
  date: string
  type: ChangeType
  name: string
  domain?: string
  note?: string
}

export interface Principle {
  title: string
  description: string
}

export interface NavItem {
  label: string
  to: string
}

export interface SiteMeta {
  name: string
  nameEn: string
  brandFull: string
  email: string
  since: string
  updateCycle: string
  hero: {
    badge: string
    title: [string, string]
    subline: string
    metaLine: string
    primaryCta: string
    secondaryCta: string
  }
  footer: {
    brandDesc: string
    closing: string
    caption: string
    copyright: string
  }
}

export interface SectionCopy {
  eyebrow: string
  title: string
  more?: string
  moreTo?: string
}

export interface HomeSections {
  categories: SectionCopy
  recent: SectionCopy
  principles: { eyebrow: string; title: [string, string] }
}

export interface PageCopy {
  links: { eyebrow: string; title: string; desc: string }
  categories: { eyebrow: string; title: string; desc: string }
  changelog: { eyebrow: string; title: string; desc: string }
  about: {
    eyebrow: string
    title: string
    /** 导语：数组里每一项是桌面端的一行，留空则自动折行 */
    lead: string[]
    heading: string
    paragraphs: string[]
    contactTitle: string
    contactDesc: string
    contactCta: string
  }
}
