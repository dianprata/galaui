import { defineConfig } from "vite";
import mdx from "@mdx-js/rollup";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig({
  plugins: [
    mdx(),
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "./src"),
      "@/tokens": path.resolve(import.meta.dirname, "./src/tokens"),
      "@docs": path.resolve(import.meta.dirname, "./docs"),
    },
  },
  build: {
    target: "esnext",
    outDir: "dist-app",
  },
  server: {
    port: 5173,
    host: true,
  },
});
