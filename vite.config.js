import { fileURLToPath, URL } from "node:url";
import fs from "node:fs";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import inspect from "vite-plugin-inspect";
import components from "unplugin-vue-components/vite";
import autoImport from "unplugin-auto-import/vite";
import { VarletImportResolver } from "@varlet/import-resolver";

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
    autoImport({
      resolvers: [VarletImportResolver({ autoImport: true })],
    }),
    inspect()
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      $: fileURLToPath(new URL("./public", import.meta.url)),
    },
  },
  server: {
    host: "0.0.0.0",
    port: "10001",
    https:{
      key: fs.readFileSync('./localhost+2-key.pem'),
      cert: fs.readFileSync('./localhost+2.pem')
    }
  },
  build: {
    sourcemap: "hidden",
    outDir: "./dist",
  },
  define: {
    BUILD_TIME: new Date().getTime(),
  },
});
