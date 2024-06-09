import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

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
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '$': fileURLToPath(new URL('./public', import.meta.url))
    }
  },
  server:{
    host: '0.0.0.0',
  }
})
