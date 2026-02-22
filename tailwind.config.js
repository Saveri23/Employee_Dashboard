export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#6366F1",
        secondary: "#0EA5E9",
        dark: "#111827",
      },
      boxShadow: {
        premium: "0 15px 35px rgba(0,0,0,0.1)",
      },
    },
  },
  plugins: [],
};