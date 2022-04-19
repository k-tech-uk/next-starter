const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
  },
  mode: 'jit',
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'], // remove unused styles in production
  darkMode: 'media',
  // theme: {
  //   extend: {
  //     colors: {
  //       brand: {

  //         grey: {
  //           900: '#939598',
  //           100: '#e6e6f1',
  //           50: '#F3F3F3'
  //         },
  //       }
  //     }
  //   },
  //   fontFamily: {
  //     sans: ['CUSTOM_FONT', ...defaultTheme.fontFamily.sans],
  //     heading: ['CUSTOM_FONT', ...defaultTheme.fontFamily.sans],
  //   },
  // },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/typography'), require('@tailwindcss/forms')],
};
