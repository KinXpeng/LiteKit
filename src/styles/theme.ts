import type { ThemeConfig } from 'antd'

/** Ant Design 主题：把设计稿的中性色系接进 antd token */
export const antdTheme: ThemeConfig = {
  token: {
    colorPrimary: '#2F6BFF',
    colorText: '#16181D',
    colorTextSecondary: '#5B6270',
    colorTextPlaceholder: '#9BA1AB',
    colorBorder: '#E7E8ED',
    colorBorderSecondary: '#F2F3F6',
    colorBgContainer: '#FFFFFF',
    borderRadius: 10,
    borderRadiusLG: 14,
    controlHeight: 40,
    fontFamily: '"Noto Sans SC", "PingFang SC", "Microsoft YaHei", system-ui, sans-serif',
    fontSize: 13,
    boxShadow: 'none',
  },
  components: {
    Input: {
      activeShadow: 'none',
      hoverBorderColor: '#C9CED8',
      activeBorderColor: '#16181D',
      paddingInline: 14,
      fontSize: 13,
    },
    Button: {
      primaryShadow: 'none',
      defaultShadow: 'none',
      fontWeight: 500,
    },
    Modal: {
      borderRadiusLG: 16,
      paddingContentHorizontalLG: 0,
    },
    Tag: {
      defaultBg: '#F2F3F6',
      defaultColor: '#5B6270',
    },
    Empty: {
      colorTextDescription: '#9BA1AB',
    },
    Divider: {
      colorSplit: '#E7E8ED',
    },
    Tooltip: {
      colorBgSpotlight: '#16181D',
    },
  },
}
