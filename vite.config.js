import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { visualizer } from 'rollup-plugin-visualizer';
import inspect from 'vite-plugin-inspect';

import components from 'unplugin-vue-components/vite'
import autoImport from 'unplugin-auto-import/vite'
import { VarletImportResolver } from '@varlet/import-resolver'

// https://vitejs.dev/config/
// var- is not custom element
export default defineConfig({
  plugins: [
    vue({
      template:{
        compilerOptions:{
        }
      }
    }),
    components({
      resolvers: [VarletImportResolver()]
    }),
    autoImport({
      resolvers: [VarletImportResolver({ autoImport: true })]
    }),
    visualizer({
      filename:'/dist/visualizer/stats.html',
      open: true
    }),
    inspect()
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '$': fileURLToPath(new URL('./public', import.meta.url))
    }
  },
  server:{
    host: '0.0.0.0',
  },
  build:{
    sourcemap: 'hidden'
  }
})
