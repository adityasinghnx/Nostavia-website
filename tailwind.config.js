/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        page: '#FFFFFF',
        surface: {
          DEFAULT: '#F8F9FA',
          raised: '#FFFFFF',
          dark: '#000000',
        },
        line: {
          DEFAULT: '#E5E7EB',
          bright: '#D1D5DB',
          dark: '#1F2937',
        },
        brand: {
          purple: '#DFB4FF',
          periwinkle: '#D1C4FF',
          ice: '#B8DBFF',
          cyan: '#92D0EA',
          teal: '#69C3D3',
          DEFAULT: '#69C3D3',
        },
        blue: {
          DEFAULT: '#69C3D3',
          dim: '#92D0EA',
          wash: '#EFF6FF',
        },
        optimal: '#059669',
        'in-range': '#64748B',
        /* Human OS reference palette. hos-yellow is for fills and rules only, never text on white. */
        hos: {
          black: '#0A0A0B',
          navy: '#121A31',
          yellow: '#F5D97B',
          amber: '#8A6511',
          hairline: '#E6E3DA',
          card: '#F6F5F1',
          cream: '#FDF6E1',
          mist: '#F4F5F7',
          grey: '#57534E',
        },
        outlier: '#D97706',
        text: {
          DEFAULT: '#0F172A',
          muted: '#475569',
          faint: '#94A3B8',
          dark: '#000000',
        },
      },
      fontFamily: {
        display: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        body: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        mono: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        control: '6px',
        card: '12px',
      },
      boxShadow: {
        card: '0 4px 20px -2px rgba(0, 0, 0, 0.05), 0 2px 6px -1px rgba(0, 0, 0, 0.03)',
        megamenu: '0 20px 40px -15px rgba(0, 0, 0, 0.08), 0 0 1px 1px rgba(0, 0, 0, 0.05)',
      },
    },
  },
  plugins: [],
};
