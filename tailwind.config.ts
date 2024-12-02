import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],

  theme: {
    extend: {
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
