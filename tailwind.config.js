module.exports = {
  darkMode: "class",
  content: [ 
    
    "./src/**/*.{js,jsx,ts,tsx}",

],
  theme: {
    screens: {
      'xs': '470px',
      'lg': '1024px',
    },
    extend: {
      screens:{
        'xl': '1920px'
      }
    },
  },
  plugins: [],
}
