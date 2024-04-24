/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: "class",

  theme: {
    extend: {
      backgroundImage: {
        "themeColor": "linear-gradient(to right, #ce6cf7, #5860cb)"
      },
      keyframes: {
        rotate: {
          "0%": {
            backgroundPosition: "0 0"
          },
          "50%": {
            backgroundPosition: "400% 0"
          },
          "100%": {
            backgroundPosition: "0 0"
          },
        },
        btnanimate: {
          "0%": {
            backgroundPosition: "0 0",
          },
          "100%": {
            backgroundPosition: "400%",
          }
        },
        CardBorderanimate: {
          "0%": {
            transform: "scaleX(0)",
            transformOrigin: "left"
          },
          "50%":
          {
            transform: "scaleX(1)",
            transformOrigin: "left",
          },
          "50.1%":
          {
            transform: "scaleX(1)",
            transformOrigin: "right"
          },
          "100%":
          {
            transform: "scaleX(0)",
            transformOrigin: " right"
          }
        }
      },
      animation: {
        borderAnimation: "rotate 20s linear infinite",
        buttonAnimation: "btnanimate 8s linear infinite",
        cardborderanimation: "CardBorderanimate 4s linear infinite"
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar')({ nocompatible: true }),
  ],
  variants: {
    scrollbar: ["dark"],
    // ...
  },
}
