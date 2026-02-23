/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#0072b4",
        success: "#3aad49",
        darkgray: "#505050",
      },
    },
  },
  plugins: [],
};
