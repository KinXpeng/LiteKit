import type { SiteMeta } from '@/types'

/** 站点身份与文案 */
export const site: SiteMeta = {
  name: '轻序',
  nameEn: 'CURATED LINKS',
  brandFull: '轻序 LiteKit',
  email: 'hi@kinxpeng.cn',
  since: '2024.03',
  updateCycle: '每两周',
  hero: {
    badge: '{count} 个链接 · 每个都自己用过',
    title: ['好用的工具，', '都收在这里。'],
    subline: '一个手工维护的链接收藏夹。点开直接跳到工具原站——不作中转、不代理、不插广告。',
    metaLine: '手工筛选 · 每周更新 · 不接广告',
    primaryCta: '开始浏览',
    secondaryCta: '推荐一个工具',
  },
  footer: {
    brandDesc: '手工整理的链接收藏夹，每两周加一批新的。',
    closing: '好工具，值得被找到。',
    caption: 'CURATED LINKS — 每两周加一批新的。',
    copyright: '2026 · 轻序 LiteKit',
  },
}
