/**
 * 应用配置文件
 * 修改此文件可自定义默认主题和其他配置
 */

export const appConfig = {
  // 主题配置
  theme: {
    // 默认主题: 'light' | 'dark'
    defaultTheme: 'light' as 'light' | 'dark',
  },

  // 应用名称
  appName: '轻序 / LiteKit',

  // Logo 配置
  logo: {
    // Logo 文字
    text: '轻序 / LiteKit',
    // Logo 图标文字
    icon: 'K',
  },

  // 导航配置
  navigation: {
    // 导航链接
    links: [
      { path: '/', label: '首页' },
      { path: '/lab', label: '实验室' },
      { path: '/file-converter', label: '文件转换' },
      { path: '/image-processor', label: '图片处理' },
    ],
  },

  // 版权信息
  copyright: '© 2026 LiteKit. 保留所有权利。',
}

export default appConfig
