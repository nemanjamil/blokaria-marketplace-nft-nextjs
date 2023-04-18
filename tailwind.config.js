/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/app/**/*.{js,ts,jsx,tsx}',
  ],
  //darkMode: media, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
    // extend: {
    //   maxWidth: {
    //     "8xl": "1920px"
    //   },
    // },
  },
  variants: {
    extend: {
      opacity: ["disabled"],
      cursor: ["disabled"]
    }
  },
  plugins: [],
}
