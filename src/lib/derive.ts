import type { Category, LinkItem } from '@/types'
import { domainOf } from './format'

export interface CategoryGroup {
  category: Category
  links: LinkItem[]
}

/** 每个分类下的链接数量 */
export function countByCategory(links: LinkItem[]): Record<string, number> {
  return links.reduce<Record<string, number>>((acc, link) => {
    acc[link.categoryId] = (acc[link.categoryId] ?? 0) + 1
    return acc
  }, {})
}

/** 按分类分组，空分类自动隐藏 */
export function groupByCategory(links: LinkItem[], categories: Category[]): CategoryGroup[] {
  return categories
    .map((category) => ({
      category,
      links: links.filter((link) => link.categoryId === category.id),
    }))
    .filter((group) => group.links.length > 0)
}

/** 取首页精选，保持配置文件里的书写顺序 */
export function pickFeatured(links: LinkItem[], max: number): LinkItem[] {
  return links.filter((link) => link.featured).slice(0, max)
}

/** 按收录时间倒序 */
export function sortByAddedAtDesc(links: LinkItem[]): LinkItem[] {
  return [...links].sort((a, b) => b.addedAt.localeCompare(a.addedAt))
}

/** 关键词搜索：名称 / 描述 / 域名 / 标签 */
export function searchLinks(links: LinkItem[], keyword: string): LinkItem[] {
  const query = keyword.trim().toLowerCase()
  if (!query) return links
  return links.filter((link) => {
    const haystack = [link.name, link.description, domainOf(link.url), ...(link.tags ?? [])]
      .join(' ')
      .toLowerCase()
    return haystack.includes(query)
  })
}

/** 按日期把更新日志分组，日期倒序 */
export function groupByDate<T extends { date: string }>(entries: T[]): Array<[string, T[]]> {
  const map = new Map<string, T[]>()
  for (const entry of entries) {
    const bucket = map.get(entry.date) ?? []
    bucket.push(entry)
    map.set(entry.date, bucket)
  }
  return [...map.entries()].sort((a, b) => b[0].localeCompare(a[0]))
}
