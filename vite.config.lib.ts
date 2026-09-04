import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import dts from "vite-plugin-dts";
import path from "path";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    dts({
      tsconfigPath: "./tsconfig.build.json",
      rollupTypes: false,
      outDir: "dist",
      insertTypesEntry: true,
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "./src"),
      "@/tokens": path.resolve(import.meta.dirname, "./src/tokens"),
    },
  },
  build: {
    lib: {
      entry: path.resolve(import.meta.dirname, "src/index.ts"),
      name: "GalaUI",
      formats: ["es", "cjs"],
      fileName: (format) => (format === "es" ? "index.js" : "index.cjs"),
    },
    rollupOptions: {
      external: (id) => {
        return (
          id === "react" ||
          id.startsWith("react/") ||
          id === "react-dom" ||
          id.startsWith("react-dom/") ||
          id === "@base-ui/react" ||
          id.startsWith("@base-ui/react/") ||
          id === "class-variance-authority" ||
          id === "cn" ||
          id === "lucide-react" ||
          id === "@phosphor-icons/react" ||
          id.startsWith("@phosphor-icons/react/")
        );
      },
      output: {
        banner: (chunk) => {
          if (chunk.name === "index") {
            return "'use client';";
          }
          return "";
        },
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          "react/jsx-runtime": "jsxRuntime",
        },
        assetFileNames: (assetInfo) => {
          if (assetInfo.name && assetInfo.name.endsWith(".css")) {
            return "style.css";
          }
          return "[name].[ext]";
        },
      },
    },
    cssCodeSplit: false,
    sourcemap: false,
    minify: true,
  },
});
