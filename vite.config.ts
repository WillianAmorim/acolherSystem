import path from "path";
import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import { viteStaticCopy } from "vite-plugin-static-copy";

export default defineConfig({
  
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        {
          src: "public/_redirects",
          dest: "", 
        },
      ],
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
