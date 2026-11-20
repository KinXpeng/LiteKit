import type { LinkItem } from '@/types'
import {
  countByCategory,
  groupByCategory,
  pickFeatured,
  sortByAddedAtDesc,
  searchLinks,
} from '@/lib/derive'
import { categories } from './categories'
import { changelog } from './changelog'
import { linkCatalog } from './links'
import { nav } from './nav'
import { homeSections, pageCopy } from './pages'
import { principles } from './principles'
import { site } from './site'

export { categories, changelog, homeSections, nav, pageCopy, principles, site }

/** 页面上可见的链接：过滤掉已下架 */
export const links: LinkItem[] = linkCatalog.filter((link) => link.status !== 'removed')

export const totalLinks = links.length
export const categoryCount = categories.length

export const categoryCounts = countByCategory(links)
export const categoryGroups = groupByCategory(links, categories)
export const featuredLinks = pickFeatured(links, 3)
export const recentLinks = sortByAddedAtDesc(links).slice(0, 6)

export const getCategory = (id: string) => categories.find((item) => item.id === id)
export const search = (keyword: string) => searchLinks(links, keyword)

/** 最近一次更新的日期，页脚和首页会用到 */
const sortedChanges = [...changelog].sort((a, b) => b.date.localeCompare(a.date))
export const latestChangeDate = sortedChanges.length > 0 ? sortedChanges[0].date : ''

/** 给文案里的占位符统一供数 */
export const templateVars = {
  count: totalLinks,
  categoryCount,
  cycle: site.updateCycle,
}
