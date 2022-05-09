/* 
  Explore configuration options docs https://tailwindcss.com/docs/configuration#configuration-options
  Or check the default configuration https://unpkg.com/browse/tailwindcss@latest/stubs/defaultConfig.stub.js
*/

module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'iff-purple': '#5A0DFF',
        'iff-cyan': '#46FFE6',
      },
      boxShadow: {
        'iff-button':
          '0px 4px 5px rgba(0, 0, 0, 0.6), 0px 1px 10px #4FFFDF, inset 0px 0px 3px #AEFFBB',
        'iff-button-2':
          '0px 4px 4px rgba(0, 0, 0, 0.25), 0px -1px 6px rgba(137, 255, 241, 0.75), inset 0px 0px 7px #0038FF',
      },
    },
  },
  plugins: [],
}
