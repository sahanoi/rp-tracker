/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        background: "#000000",
        foreground: "#ffffff",
        surface: "#1a1a1a",
        "surface-elevated": "#242424",
        muted: "#a3a3a3",
        "border-subtle": "#2e2e2e",
        accent: "#ff4d2e",
      },
    },
  },
  plugins: [],
};
