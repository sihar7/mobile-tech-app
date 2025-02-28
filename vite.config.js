import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import commonjs from 'vite-plugin-commonjs';

export default defineConfig({
  plugins: [vue(), commonjs()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  build: {
    chunkSizeWarningLimit: 1000,
  },
  optimizeDeps: {
    include: ["prismjs"],
  },
});
