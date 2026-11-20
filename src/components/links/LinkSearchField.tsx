import { Input } from 'antd'
import { IconSearch } from '@/components/common/icons'

interface LinkSearchFieldProps {
  value: string
  onChange: (value: string) => void
  className?: string
}

/** 页内搜索框（「全部链接」页顶部） */
export function LinkSearchField({ value, onChange, className }: LinkSearchFieldProps) {
  return (
    <Input
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder="搜名字或域名"
      allowClear
      prefix={<IconSearch className="text-ink-faint" />}
      className={className}
      style={{ height: 46, borderRadius: 11 }}
    />
  )
}
