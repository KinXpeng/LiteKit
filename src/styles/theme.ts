import type { ThemeConfig } from 'antd'

/**
 * Ant Design 主题：把 v3 的中性色系接进 antd token。
 * 这里的值必须和 tailwind.config.js 保持一致，否则弹窗 / 输入框会和页面脱节。
 */
export const antdTheme: ThemeConfig = {
  token: {
    colorPrimary: '#3157FF',
    colorText: '#0A0B0D',
    colorTextSecondary: '#5A6070',
    colorTextPlaceholder: '#98A0AE',
    colorBorder: '#EFF1F4',
    colorBorderSecondary: '#F4F5F8',
    colorBgContainer: '#FFFFFF',
    borderRadius: 12,
    borderRadiusLG: 18,
    controlHeight: 40,
    fontFamily: '"Noto Sans SC", "PingFang SC", "Microsoft YaHei", system-ui, sans-serif',
    fontSize: 13,
    boxShadow: 'none',
    boxShadowSecondary: '0 40px 80px -24px rgba(13, 23, 71, 0.13), 0 8px 20px -6px rgba(13, 23, 71, 0.06)',
  },
  components: {
    Input: {
      activeShadow: 'none',
      hoverBorderColor: '#C9CED8',
      activeBorderColor: '#0A0B0D',
      paddingInline: 14,
      fontSize: 13,
    },
    Button: {
      primaryShadow: 'none',
      defaultShadow: 'none',
      fontWeight: 500,
    },
    Modal: {
      borderRadiusLG: 18,
      paddingContentHorizontalLG: 0,
    },
    Tag: {
      defaultBg: '#F5F6F8',
      defaultColor: '#5A6070',
    },
    Empty: {
      colorTextDescription: '#98A0AE',
    },
    Divider: {
      colorSplit: '#EFF1F4',
    },
    Tooltip: {
      colorBgSpotlight: '#0A0B0D',
    },
  },
}
