import type { Category, ChangeEntry, LinkItem } from '@/types'

/**
 * 开发环境下的配置体检。只打印警告，不阻塞渲染。
 * 加完链接跑一次 `npm run dev`，控制台没警告就说明配置是干净的。
 */
export function validateConfig(
  links: LinkItem[],
  categories: Category[],
  changes: ChangeEntry[],
): void {
  const problems: string[] = []
  const categoryIds = new Set(categories.map((item) => item.id))
  const seenLinkIds = new Set<string>()
  const seenChangeIds = new Set<string>()

  if (categoryIds.size !== categories.length) {
    problems.push('categories.ts 里有重复的 id')
  }

  for (const link of links) {
    if (seenLinkIds.has(link.id)) problems.push(`links.ts: id "${link.id}" 重复`)
    seenLinkIds.add(link.id)

    if (!categoryIds.has(link.categoryId)) {
      problems.push(`links.ts: "${link.name}" 的 categoryId "${link.categoryId}" 不存在`)
    }
    if (!/^https?:\/\//.test(link.url)) {
      problems.push(`links.ts: "${link.name}" 的 url 必须以 http(s):// 开头`)
    }
    if (!/^\d{4}-\d{2}-\d{2}$/.test(link.addedAt)) {
      problems.push(`links.ts: "${link.name}" 的 addedAt 要写成 YYYY-MM-DD`)
    }
    if (!link.description) problems.push(`links.ts: "${link.name}" 少了 description`)
  }

  for (const entry of changes) {
    if (seenChangeIds.has(entry.id)) problems.push(`changelog.ts: id "${entry.id}" 重复`)
    seenChangeIds.add(entry.id)
  }

  if (problems.length > 0) {
    console.warn(`[config] 配置有 ${problems.length} 处问题：\n· ` + problems.join('\n· '))
  }
}
