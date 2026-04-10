

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Esto equivale a 0.0.0.0
    port: 5173,
    allowedHosts: ['nibalink.com', 'www.nibalink.com'], // <--- AGREGAMOS ESTO
    watch: {
      usePolling: true,
    },
  },
})
