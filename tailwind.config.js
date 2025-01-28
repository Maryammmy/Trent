/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#223f7f",
        secondary: "#6A6A6A",
      },
    },
  },
  plugins: [
    require("tailwindcss-rtl"), // إضافة الـ RTL plugin هنا
  ],
};
