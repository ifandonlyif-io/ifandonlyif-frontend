/* 
  Explore configuration options docs https://tailwindcss.com/docs/configuration#configuration-options
  Or check the default configuration https://unpkg.com/browse/tailwindcss@latest/stubs/defaultConfig.stub.js
*/
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './node_modules/react-tabs/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'iff-cyan': '#46FFE6',
        'iff-purple': '#5A0DFF',
        'iff-text': '#4F4F4F',
        'iff-grey-3': '#828282',
      },
      boxShadow: {
        'iff-button':
          '0px 4px 5px rgba(0, 0, 0, 0.6), 0px 1px 10px #4FFFDF, inset 0px 0px 3px #AEFFBB',
        'iff-button-2':
          '0px 4px 4px rgba(0, 0, 0, 0.25), 0px -1px 6px rgba(137, 255, 241, 0.75), inset 0px 0px 7px #0038FF',
        'avatar-medium': '0px 1px 4px rgba(0, 0, 0, 0.25)',
        'iff-nft-card': '19px 19px 20px 5px rgba(0, 0, 0, 0.5)',
        'iff-base': '0px 0px 8px rgba(0, 0, 0, 0.25)',
        'iff-overview': '0px 4px 18px rgba(0, 0, 0, 0.14)',
        'iff-modal': '0px 10px 6px rgba(0, 0, 0, 0.25)',
      },
      dropShadow: {
        'neon-cyan': '0px 0px 5px #46FFE6',
        'neon-purple': '0px 0px 5px #A585FF',
        'avatar-large': [
          '0px 0px 7px #999DFF',
          '0px 4px 4px rgba(0, 0, 0, 0.25)',
        ],
      },
      keyframes: {
        datspintho: {
          '60%': { transform: 'rotateY(405deg) rotateX(-360deg)' },
          '61%': { transform: 'rotateY(405deg) rotateX(-360deg)' },
          '100%': { transform: 'rotateY(405deg) rotateX(-360deg)' },
        },
      },
      animation: {
        datspintho: 'datspintho 10s 0s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
