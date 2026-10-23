/** @type {import('tailwindcss').Config} */
/* Theme-aware colours read CSS variables set per section by data-theme="ink" | "paper" (see index.css). */
const v = (name) => `rgb(var(--${name}) / <alpha-value>)`;

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: v('bg'),
        fg: v('fg'),
        surface: v('surface'),
        accent: v('accent'),
        ink: {
          DEFAULT: '#0B0A08',
          950: '#0B0A08',
          900: '#100E0C',
          850: '#151310',
          800: '#1B1814',
          700: '#26221D',
          600: '#37322B',
        },
        bone: {
          DEFAULT: '#F2EDE3',
          50: '#FAF8F3',
          100: '#F2EDE3',
          200: '#E7E0D2',
          300: '#D3CABA',
        },
        honey: {
          DEFAULT: '#F2D27A',
          200: '#FAEBC2',
          300: '#F6DE9C',
          400: '#F2D27A',
          500: '#E2B758',
          600: '#B98E35',
          700: '#8A6511',
        },
        signal: {
          live: '#9FD8A8',
          wait: '#F2D27A',
          alert: '#F0A58A',
        },
      },
      fontFamily: {
        sans: ['"Geist Variable"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        serif: ['"Instrument Serif"', 'ui-serif', 'Georgia', 'serif'],
        mono: ['"Geist Mono Variable"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      maxWidth: {
        site: '1360px',
      },
      transitionTimingFunction: {
        out: 'cubic-bezier(0.22, 1, 0.36, 1)',
        inout: 'cubic-bezier(0.65, 0, 0.35, 1)',
      },
      keyframes: {
        marquee: { from: { transform: 'translateX(0)' }, to: { transform: 'translateX(-50%)' } },
        pulse2: { '0%,100%': { opacity: '1' }, '50%': { opacity: '0.35' } },
        ping2: { '0%': { transform: 'scale(1)', opacity: '0.7' }, '100%': { transform: 'scale(2.6)', opacity: '0' } },
        lane: { from: { left: '-3%' }, to: { left: '103%' } },
        bob: { '0%,100%': { transform: 'translateY(-3px)' }, '50%': { transform: 'translateY(3px)' } },
      },
      animation: {
        marquee: 'marquee 48s linear infinite',
        pulse2: 'pulse2 2.4s ease-in-out infinite',
        ping2: 'ping2 2s cubic-bezier(0, 0, 0.2, 1) infinite',
      },
    },
  },
  plugins: [],
};
