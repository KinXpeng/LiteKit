import { Tag } from 'antd'
import { categories } from '@/config'
import { ALL_CATEGORIES } from '@/hooks/useLinkSearch'

interface CategoryChipsProps {
  value: string
  onChange: (value: string) => void
}

/** 分类筛选 chip：用 AntD 的 CheckableTag，样式在 index.css 的 .chip-tag 里 */
export function CategoryChips({ value, onChange }: CategoryChipsProps) {
  const items = [{ id: ALL_CATEGORIES, name: '全部' }, ...categories.map((cat) => ({ id: cat.id, name: cat.name }))]

  return (
    <div className="flex flex-wrap items-center gap-2">
      {items.map((item) => (
        <Tag.CheckableTag
          key={item.id}
          checked={value === item.id}
          onChange={() => onChange(item.id)}
          className="chip-tag"
        >
          {item.name}
        </Tag.CheckableTag>
      ))}
    </div>
  )
}
