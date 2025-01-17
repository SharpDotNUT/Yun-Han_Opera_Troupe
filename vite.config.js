import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import components from "unplugin-vue-components/vite";
import { VarletImportResolver } from "@varlet/import-resolver";
import { VitePWA } from 'vite-plugin-pwa';
export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {},
      },
    }),
    components({
      resolvers: [VarletImportResolver()],
    }),
    VitePWA({ registerType: 'autoUpdate'})
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    host: "0.0.0.0"
  },
  build: {
    sourcemap: "hidden",
    outDir: "./dist",
  },
  define: {
    BUILD_TIME: new Date().getTime(),
  },
});
