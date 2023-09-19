/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'main-bg':'#303041',
        'low-bg':'#3D3A50',
        'accent':'#0EA2F6',
        'low-accent':'#F4FCFE',
        'text-color':'#F4FCFE',
      },
      fontFamily:{
        airbnb: [
            "AirbnbCereal", "sans-serif"
        ]
      }
    },
  },
  plugins: [],
}

