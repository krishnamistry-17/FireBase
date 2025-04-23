/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@material-tailwind/react/theme/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        green: {
          dark: "#075e54",
          lightdark: "	#128c7e",
          lightgreen: "	#25d366",
          neon: "	#dcf8c6",
          bg: "#ece5dd",
        },
        red: {
          dark: "#db1c07",
        },
        yellow: {
          yelbg: "#FFF3E3",
          dark: "#B88E2F",
          btn: "#B88E2F",
          light: "#FCF8F3",
        },
        line: {
          light: "#E8E8E8",
        },
        white: {
          light: "#FFFFFF",
          pagebg: "#F5F5F5",
        },
        black: {
          border: "#D9D9D9",
          para: "#333333",
          light: "#9F9F9F",
          paradark: "#666666",
          dark: "#3A3A3A",
          darkest: "#000000",
          bname: "#242424",
        },
        blue: {
          light: "#69a2ff",
          default: "#1fb6ff",
          dark: "#051787",
        },
        pink: {
          light: "#be7699",
          second: "#d65e98",
          DEFAULT: "#ff49db",
          dark: "#a11056",
        },
        gray: {
          comapreg: "#727272",
          graygridbg: "#C4C4C4",
          darkest: "#1f2d3d",
          dark: "#3c4858",
          DEFAULT: "#c0ccda",
          light: "#e0e6ed",
          lightest: "#f9fafc",
          graybg: "#F4F5F7",
          graypara: "#898989",
          graymoney: "#B0B0B0",
          lightpara: "#616161",
        },
        cream: {
          bglight: "#F9F1E7",
          bg: "#FAF3EA",
        },
        purple: {
          light: "#816DFA",
        },
      },
      fontFamily: {
        sans: ["ui-sans-serif", "system-ui"],
        serif: ["ui-serif", "Georgia"],
        poppins: ["Poppins", "sans-serif"],
      },
      screens: {
        xs: "320px",
        sm: "480px",
        md: "768px",
        lg: "992px",
        xl: "1440px",
      },
      textShadow: {
        stroke: "2px black", // Custom text-stroke style
        DEFAULT:
          "3px 3px 5px rgba(0, 4, 4, 0.5), 0px 4px 4px rgba(248, 249, 249, 0.5)",
      },
      translate: {
        "-50%": "-50%",
      },
    },
  },
  plugins: [],
};
