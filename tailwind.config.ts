import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,jsx,tsx,ts}",
    "./page.tsx",
  ],

  theme: {
    extend: {
      colors: {
        primary: "#0D92F4",
        darkPrimary: "#1D6A63",
        fontColor1: "#2C2C2C",
        fontColor2: "#727272",
        secondary: "#737373",
        darkSecondary: "#8C8C8C",
        lightSecondary: "#F9F9F9",
        borderColor: "#BBBBBB",
        borderColor2: "#DCDCDC",
        borderColor3: "#D5DFE4",
        backgroundColor: "#FFFDFD",
        tabColor: "#FBFBFB",
        tabBorder: "#DADEDE",
      },
      fontFamily: {
        Sans: ["IBM Plex Sans", "sans-serif"],
      },
      boxShadow: {
        NavShadow: " 0px 4px 4px 0px #0000000A",
        sideShadow: "-4px 0px 4px 0px #0000000A",
        TableShadow: "0px 4px 4px 0px rgba(0, 0, 0, 6%)",
        DivShadow: "8px 8px 21.5px 0px #00000026",
      },
    },
    screens: {
      custom: "700px",
      xs: "480px",
      ss: "620px",
      sm: "768px",
      md: "1060px",
      lg: "1200px",
      xl: "1700px",
    },
  },

  plugins: [require("@tailwindcss/forms"), require("tailwindcss-rtl")],
};
export default config;
