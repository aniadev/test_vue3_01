/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {}
  },
  plugins: [require('@tailwindcss/typography')],
  presets: [
    {
      theme: {
        extend: {
          fontSize: {
            base: '16px'
          },
          fontWeight: {
            base: '400'
          },
          lineHeight: {
            base: '24px'
          }
        }
      }
    }
  ]
}
