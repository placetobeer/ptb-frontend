module.exports = {
  purge: [
    './src/**/*.html',
    './src/**/*.ts',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'ptb-gray': {
          '50': '#fefefe',
          '100': '#fdfdfd',
          '200': '#fafafa',
          '300': '#f7f7f7',
          '400': '#f0f0f0',
          '500': '#eaeaea',
          '600': '#d3d3d3',
          '700': '#b0b0b0',
          '800': '#8c8c8c',
          '900': '#737373'
        },
        'ptb-dark-blue': {
          '50': '#f6f8f8',
          '100': '#edf0f2',
          '200': '#d3dbde',
          '300': '#b9c5ca',
          '400': '#8499a2',
          '500': '#4f6d7a',
          '600': '#47626e',
          '700': '#3b525c',
          '800': '#2f4149',
          '900': '#27353c'
        },
        'ptb-sand': {
          '50': '#fefdfb',
          '100': '#fdfbf7',
          '200': '#f9f6ec',
          '300': '#f6f0e0',
          '400': '#efe5c9',
          '500': '#e8dab2',
          '600': '#d1c4a0',
          '700': '#aea486',
          '800': '#8b836b',
          '900': '#726b57'
        },
        'ptb-orange': {
          '50': '#fdf8f6',
          '100': '#fcf1ec',
          '200': '#f7dbd0',
          '300': '#f1c5b3',
          '400': '#e79a7b',
          '500': '#dd6e42',
          '600': '#c7633b',
          '700': '#a65332',
          '800': '#854228',
          '900': '#6c3620'
        },
        'ptb-blue': {
          '50': '#fcfdfd',
          '100': '#f9fbfc',
          '200': '#eff5f7',
          '300': '#e6eff2',
          '400': '#d3e2e9',
          '500': '#c0d6df',
          '600': '#adc1c9',
          '700': '#90a1a7',
          '800': '#738086',
          '900': '#5e696d'
        }
      },
      transformOrigin: {
        "0": "0%",
      },
      zIndex: {
        "-1": "-1",
      }
    },
    linearGradientColors: theme => theme('colors'),
    radialGradientColors: theme => theme('colors'),
    conicGradientColors: theme => theme('colors'),
  },
  variants: {
    borderColor: ['responsive', 'hover', 'focus', 'focus-within'],
    extend: {},
  },
  plugins: [
    require('tailwindcss-hero-patterns'),
  ],
}
