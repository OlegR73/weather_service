import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  preview: {
    port: process.env.PORT || 3000,
    host: true,
    allowedHosts: ['weather-service-c2pe.onrender.com']
  }
})
