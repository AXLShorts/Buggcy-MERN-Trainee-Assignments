/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      logo: ['"Kode Mono"', "Roboto"],
    },
    extend: {},
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        ".no-arrows::-webkit-outer-spin-button, .no-arrows::-webkit-inner-spin-button":
          {
            "-webkit-appearance": "none",
            margin: "0",
          },
        '.no-arrows[type="number"]': {
          "-moz-appearance": "textfield",
        },
      });
    },
  ],
};
