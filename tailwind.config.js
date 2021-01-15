module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    boxShadow: {
      sm: '0px 0px 15px 2px rgba(0,0,0,0.3)',
    },
    backgroundColor: (theme) => ({
      ...theme('colors'),
      primary: '#0a354f',
      even: '#e8eef4',
      odd: '#fff',
    }),
    placeholderColor: {
      grey: '#cdd3d8',
    },
    extend: {
      fontSize: {
        xxs: '0.5rem',
      },
      lineHeight: {
        2: '0.1rem',
      },
      textColor: {
        'light-grey': '#6a95b2',
      },
    },
  },
  variants: {
    backgroundColor: ['responsive', 'first', 'last', 'even', 'odd', 'hover', 'focus'],
    extend: {
      margin: ['last'],
    },
  },
  plugins: [],
};
