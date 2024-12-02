import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],

  theme: {
    extend: {
      boxShadow: {
        'right-bottom': '4px 4px 6px rgba(0, 0, 0, 0.2)',
      },
      fontSize: {
        'sm-regular': ['16px', { lineHeight: '1.5', fontWeight: '400' }], // Regular
        'sm-extraBold': ['16px', { lineHeight: '1.5', fontWeight: '800' }], // ExtraBold
        'md-regular': ['20px', { lineHeight: '1.5', fontWeight: '400' }], // Regular
        'md-extraBold': ['20px', { lineHeight: '1.5', fontWeight: '800' }], // ExtraBold
        'lg-regular': ['24px', { lineHeight: '1.5', fontWeight: '400' }], // Regular
        'xl-regular': ['32px', { lineHeight: '1.5', fontWeight: '400' }], // Regular
        '2xl-regular': ['40px', { lineHeight: '1.5', fontWeight: '400' }], // Regular
      },
      colors: {
        text: {
          white: '#FFFFFF',
          gray: '#626060',
          orange: '#FF811A',
        },
        background: {
          blue: '#DEE5FF',
          pink: '#FFECEC',
          yellow: '#FFF8D1',
        },
        button: {
          green: '#00AD2E',
          blue: '#B9C2FF',
          disabled: '#D2D2D2',
          red: '#FF3F3F',
          pink: '#FFB9B9',
          yellow: '#FFD641',
        },
        pressed: {
          yellow: '#F6CC36',
          pink: '#FF8C8C',
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
