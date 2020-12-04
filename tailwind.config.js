module.exports = {
  purge: [
    './src/**/*.html',
    './src/**/*.js',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'ptb-orange': '#dd6e42',
        'ptb-sand': '#e8dab2',
        'ptb-dark-blue': '#4f6d7a',
        'ptb-blue': '#c0d6df',
        'ptb-gray': '#eaeaea'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
