import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "rc-dark-blue-dm": "hsl(209, 23%, 22%)",
        "rc-very-dark-blue-dm": "hsl(207, 26%, 17%)",
        "rc-very-dark-blue-lm": "hsl(200, 15%, 8%)",
        "rc-dark-gray-lm": "hsl(0, 0%, 52%)",
        "rc-very-light-gray-lm-bg": "hsl(0, 0%, 98%)",
        "rc-white": "hsl(0, 0%, 100%)"
      },
      fontFamily: {
        nunitosans: ["Nunito Sans", "sans-serif"],
      },
      fontWeight: {
        normal: "300",
        semiBold: "600",
        bold: "800",
      },
      fontSize: {
        "homepage-base": "14px",
        "details-base": "16px",
      },
      boxShadow: {
        "rc-shadow": "0px 0px 10px 0px rgba(0,0,0,0.25)",
      }
    },
  },
  plugins: [
    require("@tailwindcss/aspect-ratio"),
  ],
};
export default config;
