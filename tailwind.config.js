/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'breathe': 'breathe 4s ease-in-out infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        breathe: {
          '0%, 100%': { 
            opacity: '0.3', 
            transform: 'scale(1)' 
          },
          '50%': { 
            opacity: '0.6', 
            transform: 'scale(1.1)' 
          },
        },
        glow: {
          '0%, 100%': { 
            boxShadow: '0 0 20px rgba(6, 182, 212, 0.4)' 
          },
          '50%': { 
            boxShadow: '0 0 40px rgba(6, 182, 212, 0.6), 0 0 60px rgba(6, 182, 212, 0.4)' 
          },
        },
        float: {
          '0%, 100%': { 
            transform: 'translateY(0)' 
          },
          '50%': { 
            transform: 'translateY(-20px)' 
          },
        },
      },
    },
  },
  plugins: [],
}