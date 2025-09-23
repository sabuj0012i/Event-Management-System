import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tailwindcss(),react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: [
        'icons/icon-192x192.png',
        'icons/icon-512x512.png'
      ],
      manifest: {
        name: "Event Management System",
        short_name: "Event",
        start_url: "/",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#2563eb",
        icons: [
          {
            src: "/icons/icon-192x192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any maskable"
          },
          {
            src: "/icons/icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable"
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
        navigateFallback: '/',
        runtimeCaching: [
          {
            urlPattern: ({ url }) => url.origin === self.location.origin && url.pathname.startsWith('/api'),
            handler: 'NetworkFirst',
            options: {
              cacheName: 'api-cache',
              networkTimeoutSeconds: 10,
              cacheableResponse: { statuses: [0, 200] }
            }
          },
          {
            urlPattern: ({ request }) => request.destination === 'image',
            handler: 'CacheFirst',
            options: {
              cacheName: 'image-cache',
              expiration: { maxEntries: 100, maxAgeSeconds: 60 * 60 * 24 * 30 },
              cacheableResponse: { statuses: [0, 200] }
            }
          },
          {
            urlPattern: ({ request }) => request.destination === 'style' || request.destination === 'script' || request.destination === 'worker',
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'assets-cache',
              cacheableResponse: { statuses: [0, 200] }
            }
          }
        ]
      }
    })
  ]
})
