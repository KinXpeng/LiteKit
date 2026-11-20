/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        /* v3：纯白底，不再用灰白 canvas */
        canvas: '#FFFFFF',
        surface: '#FFFFFF',
        ink: {
          DEFAULT: '#0A0B0D',
          soft: '#3A4048',
          muted: '#5A6070',
          faint: '#98A0AE',
          ghost: '#B4BAC6',
        },
        line: {
          DEFAULT: '#EFF1F4',
          soft: '#F4F5F8',
        },
        /* 只用一个蓝，不再做蓝→青渐变（那是「AI 味」最重的一种处理） */
        accent: {
          DEFAULT: '#3157FF',
          soft: '#F5F8FF',
        },
        /* 页脚专用深色阶：deep 是底，line 是分隔线，dim/mid/text 是三级文字 */
        deep: {
          DEFAULT: '#0A0B0D',
          line: '#23262E',
          dim: '#6E7684',
          mid: '#8C93A0',
          text: '#B0B6C2',
        },
      },
      fontFamily: {
        sans: ['"Noto Sans SC"', '"PingFang SC"', '"Microsoft YaHei"', 'system-ui', 'sans-serif'],
        serif: ['"Noto Serif SC"', '"Songti SC"', '"SimSun"', 'Georgia', 'serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      maxWidth: {
        shell: '1440px',
      },
      letterSpacing: {
        label: '0.16em',
        wide2: '0.28em',
      },
      boxShadow: {
        /* 卡片浮起：近距离勾边 + 远距离柔影 */
        card: '0 20px 44px -20px rgba(15, 23, 56, 0.09), 0 2px 6px -1px rgba(15, 23, 56, 0.04)',
        /* 大块浮层（首屏卡、列表卡） */
        float: '0 40px 80px -24px rgba(13, 23, 71, 0.13), 0 8px 20px -6px rgba(13, 23, 71, 0.06)',
        /* 输入框、次级按钮 */
        lift: '0 2px 8px -2px rgba(15, 25, 64, 0.06)',
        /* 主按钮的落地光 */
        glow: '0 14px 30px -8px rgba(15, 25, 90, 0.24)',
      },
      transitionTimingFunction: {
        smooth: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
}
