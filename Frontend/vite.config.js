import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server:{
    port: 3001,
    proxy: {
      "/api": {
        target: "http://localhost:3000/ ",
        changeOrigin : true
      },
      "/account-admin": {
        target: "http://localhost:3000/",
        changeOrigin : true
      },
      "/page-client": {
        target: "http://localhost:3000/",
        changeOrigin : true
      },
      "/page-client/product": {
        target: "http://localhost:3000/",
        changeOrigin : true
      },
      "/account": {
        target: "http://localhost:3000/",
        changeOrigin : true
      },
    }

  },
})
