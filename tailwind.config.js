/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        surface: {
          DEFAULT: '#050510',
          raised: '#0c0c18',
          overlay: '#14141e',
          highlight: '#1e1e2a',
        },
        teal: {
          DEFAULT: '#22d3ee',
          glow: 'rgba(34,211,238,0.3)',
          dim: '#0e7490',
          light: '#67e8f9',
        },
        gold: {
          DEFAULT: '#d4a574',
          glow: 'rgba(212,165,116,0.3)',
          dim: '#8a7040',
          light: '#e8c89e',
        },
        jade: {
          DEFAULT: '#2dd4bf',
          glow: 'rgba(45,212,191,0.3)',
        },
        parchment: {
          DEFAULT: '#f0e6d3',
          dim: '#c4b8a6',
        },
        ink: {
          light: '#1a1a2e',
          DEFAULT: '#0d0d1a',
          dark: '#050510',
        },
        border: {
          subtle: 'rgba(255,255,255,0.06)',
          active: 'rgba(34,211,238,0.5)',
          gold: 'rgba(212,165,116,0.3)',
        },
      },
      fontFamily: {
        display: ['Cinzel', 'serif'],
        body: ['Noto Serif', 'Georgia', 'serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-teal': 'pulse-teal 2s ease-in-out infinite',
        'pulse-gold': 'pulse-gold 2.5s ease-in-out infinite',
        'ink-drip': 'ink-drip 1.2s ease-out forwards',
        'brush-reveal': 'brush-reveal 0.8s ease-out forwards',
        'spin-slow': 'spin-slow 12s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        'pulse-teal': {
          '0%, 100%': { boxShadow: '0 0 8px rgba(34,211,238,0.2), 0 0 24px rgba(34,211,238,0.1)' },
          '50%': { boxShadow: '0 0 16px rgba(34,211,238,0.4), 0 0 48px rgba(34,211,238,0.2)' },
        },
        'pulse-gold': {
          '0%, 100%': { boxShadow: '0 0 8px rgba(212,165,116,0.2), 0 0 24px rgba(212,165,116,0.1)' },
          '50%': { boxShadow: '0 0 16px rgba(212,165,116,0.4), 0 0 48px rgba(212,165,116,0.2)' },
        },
        'ink-drip': {
          '0%': { transform: 'scaleY(0)', opacity: '0', transformOrigin: 'top' },
          '60%': { transform: 'scaleY(1.05)', opacity: '1' },
          '100%': { transform: 'scaleY(1)', opacity: '1', transformOrigin: 'top' },
        },
        'brush-reveal': {
          '0%': { clipPath: 'inset(0 100% 0 0)' },
          '100%': { clipPath: 'inset(0 0% 0 0)' },
        },
        'spin-slow': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      boxShadow: {
        'glow-teal': '0 0 20px rgba(34,211,238,0.3), 0 0 60px rgba(34,211,238,0.1)',
        'glow-gold': '0 0 20px rgba(212,165,116,0.3), 0 0 60px rgba(212,165,116,0.1)',
        'glow-jade': '0 0 20px rgba(45,212,191,0.3), 0 0 60px rgba(45,212,191,0.1)',
        'inner-glow': 'inset 0 1px 0 rgba(255,255,255,0.05)',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
        '800': '800ms',
      },
    },
  },
  plugins: [],
}