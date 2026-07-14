/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: '#0a0e17',
          secondary: '#141b2d',
          tertiary: '#1a2332',
        },
        text: {
          primary: '#e8edf2',
          secondary: '#6b7a8f',
        },
        accent: {
          green: '#00ff41',
          red: '#ff0040',
          amber: '#ffaa00',
        },
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'monospace'],
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        'pulse-green': 'pulseGreen 2s ease-in-out infinite',
        'pulse-yellow': 'pulseYellow 1.5s ease-in-out infinite',
        'pulse-red': 'pulseRed 1s ease-in-out infinite',
        'slide-up': 'slideUp 0.3s ease-out',
        'fade-in': 'fadeIn 0.5s ease-out',
        'rescue-heartbeat': 'rescueHeartbeat 0.6s ease-in-out 3',
      },
      keyframes: {
        pulseGreen: {
          '0%, 100%': { boxShadow: '0 0 5px rgba(0,255,65,0.4)' },
          '50%': { boxShadow: '0 0 25px rgba(0,255,65,0.8)' },
        },
        pulseYellow: {
          '0%, 100%': { boxShadow: '0 0 5px rgba(255,170,0,0.4)' },
          '50%': { boxShadow: '0 0 25px rgba(255,170,0,0.8)' },
        },
        pulseRed: {
          '0%, 100%': { boxShadow: '0 0 5px rgba(255,0,64,0.4)' },
          '50%': { boxShadow: '0 0 25px rgba(255,0,64,0.8)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        rescueHeartbeat: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.2)' },
        },
      },
    },
  },
  plugins: [],
};