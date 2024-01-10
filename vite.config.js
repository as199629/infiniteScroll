import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: "./",
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:49501/',
        // Referer: 'http://localhost:8888/api',
        changeOrigin: true,
        secure: false,
        headers: {
          target: 'http://localhost:49501/',
          // Referer: 'http://localhost:8888/api',
        },
        rewrite: (path) => path.replace(/^\/api/, '')
      },
    },
  },
})
