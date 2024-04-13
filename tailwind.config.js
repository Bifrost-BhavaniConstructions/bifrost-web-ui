/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'main-bg':'#303041',
        'main-bg-success':'rgba(63,131,79,0.62)',
        'main-bg-error':'rgba(131,63,63,0.62)',
        'low-bg':'#3D3A50',
        "low-bg-floating": "rgba(185,173,123,0.28)",
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

