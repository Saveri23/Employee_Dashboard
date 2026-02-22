import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "./", // ✅ Important for deployment: makes paths relative
  server: {
    proxy: {
      "/api": {
        target: "https://backend.jotish.in",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, "/backend_dev"),
      },
    },
  },
});