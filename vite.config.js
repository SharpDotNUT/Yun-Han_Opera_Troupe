import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import inspect from "vite-plugin-inspect";
import components from "unplugin-vue-components/vite";
import autoImport from "unplugin-auto-import/vite";
import { VarletImportResolver } from "@varlet/import-resolver";

import {VitePWA} from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {},
      }
    }),
    components({
      resolvers: [VarletImportResolver()],
    }),
    autoImport({
      resolvers: [VarletImportResolver({ autoImport: true })],
    }),
    inspect(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: "My App",
        short_name: "My App",
        description: "My App",
        theme_color: "#ffffff",
      },
    })
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      "$": fileURLToPath(new URL("./public", import.meta.url)),
    },
  },
  server: {
    host: "0.0.0.0",
    port: "10001",
  },
  build: {
    sourcemap: "hidden",
    outDir: "./dist", // 确保这是相对路径
  },
  define:{
    BUILD_TIME: new Date().getTime()
  }
});
