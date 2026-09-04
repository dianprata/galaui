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
      output: [
        {
          format: "es",
          entryFileNames: "[name].js",
          preserveModules: true,
          preserveModulesRoot: "src",
          banner: () => "'use client';",
          assetFileNames: (assetInfo) => {
            if (assetInfo.name && assetInfo.name.endsWith(".css")) {
              return "style.css";
            }
            return "[name].[ext]";
          },
        },
        {
          format: "cjs",
          entryFileNames: "[name].cjs",
          preserveModules: true,
          preserveModulesRoot: "src",
          banner: () => "'use client';",
          assetFileNames: (assetInfo) => {
            if (assetInfo.name && assetInfo.name.endsWith(".css")) {
              return "style.css";
            }
            return "[name].[ext]";
          },
        },
      ],
    },
    cssCodeSplit: false,
    sourcemap: false,
    minify: true,
  },
});
