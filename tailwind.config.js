/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        canvas: '#FAFAFB',
        surface: '#FFFFFF',
        ink: {
          DEFAULT: '#16181D',
          soft: '#3A3F47',
          muted: '#5B6270',
          faint: '#9BA1AB',
        },
        line: {
          DEFAULT: '#E7E8ED',
          soft: '#F2F3F6',
        },
        accent: {
          DEFAULT: '#2F6BFF',
          soft: '#EFF4FE',
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
      transitionTimingFunction: {
        smooth: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
}
