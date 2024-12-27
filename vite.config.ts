import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'auto',

      manifest: {
        start_url: '/',
        display: 'standalone',
        name: 'tierentdecker',
        short_name: 'tierentdecker',
        description: 'tierentdecker',
        theme_color: '#ffffff',
      },
    })
  ],
  preview: {
    https: true, // Aktiviert HTTPS im Preview-Modus
    port: 3000,  // Wähle deinen Port
  },
})
