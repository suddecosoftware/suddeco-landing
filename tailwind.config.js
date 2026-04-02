/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./client/src/**/*.{ts,tsx,js,jsx}", "./client/index.html"],
  theme: {
    extend: {
      colors: {
        navy: { 800: "#1E3A5F", 900: "#0F1F3D" },
        amber: { 400: "#FBBF24", 500: "#F59E0B" }
      }
    }
  },
  plugins: [],
}