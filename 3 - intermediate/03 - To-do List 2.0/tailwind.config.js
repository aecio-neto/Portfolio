/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./*.{html,js}'],
  darkMode: `class`,
  theme: {
    screens: {
      sm: '375px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    fontFamily: {
      sans: ["'Josefin Sans'", 'sans-serif'],
      serif: ['Merriweather', 'serif'],
    },
    extend: {
      backgroundImage: {
        'dark': "url('/images/bg-desktop-dark.jpg')",
        'light': "url('/images/bg-desktop-light.jpg')",
        'mobile-dark': "url('/images/bg-mobile-dark.jpg')",
        'mobile-light': "url('/images/bg-mobile-light.jpg')",
        'check': "url('images/icon-check.svg')",

      },
      colors: {
        // Light mode
        BrightBlue: 'hsl(220, 98%, 61%)',
        CheckBackground: 'linear-gradient hsl(192, 100%, 67%) to hsl(280, 87%, 65%)',
        VeryLightGray: 'hsl(0, 0%, 98%)',
        VeryLightGrayishBlue: 'hsl(236, 33%, 92%)',
        LightGrayishBlue: 'hsl(233, 11%, 84%)',
        DarkGrayishBlue: 'hsl(236, 9%, 61%)',
        VeryDarkGrayishBlue: 'hsl(235, 19%, 35%)',
        // Dark Mode
        VeryDarkBlue: 'hsl(235, 21%, 11%)',
        VeryDarkDesaturatedBlue: 'hsl(235, 24%, 19%)',
        LightGrayishBlue: 'hsl(234, 39%, 85%)',
        HoverLightGrayishBlue: 'hsl(236, 33%, 92%)',
        DarkGrayishBlue: 'hsl(234, 11%, 52%)',
        VeryDarkGrayishBlue: 'hsl(233, 14%, 35%)',
        VeryDarkGrayishBlue: 'hsl(237, 14%, 26%)',
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
}
