/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#0a1124',
        'background-alt': '#0f1c38',
        panel: 'rgba(16, 29, 58, 0.78)',
        'panel-border': 'rgba(0, 240, 255, 0.28)',
        cyan: {
          glow: '#00f0ff',
          dim: '#0284c7',
        },
        violet: {
          glow: '#a855f7',
          dim: '#7c3aed',
        },
        emerald: {
          glow: '#34d399',
        },
        amber: {
          glow: '#fbbf24',
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
        'spin-slow': 'spin 20s linear infinite',
      },
      keyframes: {
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(1000%)' },
        },
        glowPulse: {
          '0%, 100%': { opacity: '0.5' },
          '50%': { opacity: '1.0' },
        }
      }
    },
  },
  plugins: [],
}
