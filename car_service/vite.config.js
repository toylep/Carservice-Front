import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': 'http://127.0.0.1:8000',
      // '/media':{
      //   target:'home/toylep/kursach_ud/back/back/carservice/',
      //   changeOrigin:true,
      // }
    },
  },
  plugins: [
    vue(),
  ]
  
})
