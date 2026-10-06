/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#f8fafc',
        'background-alt': '#ffffff',
        panel: 'rgba(255, 255, 255, 0.88)',
        'panel-border': 'rgba(203, 213, 225, 0.7)',
        cyan: {
          glow: '#0284c7',
          dim: '#0369a1',
          bright: '#00b4d8',
          light: '#e0f2fe',
        },
        indigo: {
          glow: '#6366f1',
          dim: '#4f46e5',
          light: '#e0e7ff',
        },
        violet: {
          glow: '#8b5cf6',
          dim: '#7c3aed',
          light: '#ede9fe',
        },
        emerald: {
          glow: '#059669',
          dim: '#047857',
          light: '#d1fae5',
        },
        amber: {
          glow: '#d97706',
          dim: '#b45309',
          light: '#fef3c7',
        },
        rose: {
          glow: '#e11d48',
          dim: '#be123c',
          light: '#ffe4e6',
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
