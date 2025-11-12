import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import basicSsl from '@vitejs/plugin-basic-ssl'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), basicSsl()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://192.168.15.20:3000',
        changeOrigin: true,
        secure: false,
      }
    }
  }
})
