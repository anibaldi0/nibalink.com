// frontend/vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'auto', // Forzamos la inyección
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'] // Cache de assets
      },
      manifest: {
        name: 'Nibalink Dashboard',
        short_name: 'Nibalink',
        description: 'Monitoreo de Infraestructura Oracle Cloud',
        theme_color: '#0f172a',
        background_color: '#0f172a',
        display: 'standalone',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
            porpose: 'any' // el icono tal cual
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable' // el icono queda mejor arreglado
          }
        ]
      }
    })
  ],
  server: {
    host: true,
    port: 5173,
    allowedHosts: ['nibalink.com', 'www.nibalink.com'],
    watch: {
      usePolling: true,
    },
  },
})