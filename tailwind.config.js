/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#040711',
        panel: 'rgba(11, 19, 38, 0.72)',
        'panel-border': 'rgba(0, 240, 255, 0.2)',
        cyan: {
          glow: '#00f0ff',
          dim: '#007a82',
        },
        violet: {
          glow: '#a855f7',
          dim: '#581c87',
        },
        emerald: {
          glow: '#10b981',
        },
        amber: {
          glow: '#f59e0b',
        }
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
        display: ['"Space Grotesk"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'scanline': 'scanline 8s linear infinite',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
      },
      keyframes: {
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(1000%)' },
        },
        glowPulse: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.9' },
        }
      }
    },
  },
  plugins: [],
}
