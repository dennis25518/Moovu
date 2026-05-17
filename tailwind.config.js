/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#6f5ff6",
        "primary-dark": "#5849d4",
        accent: "#e3228f",
        dark: "#05070d",
        "dark-secondary": "#0f1219",
      },
    },
  },
  plugins: [],
};
