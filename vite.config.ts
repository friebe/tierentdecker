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
        theme_color: "#f69435",
        background_color: "#f69435",
        display: "standalone",
        scope: "/",
        start_url: "/",
        short_name: "Vite PWA",
        description: "Vite PWA Demo",
        name: "Vite PWA",
      },
    })
  ],
  preview: {
    https: true, // Aktiviert HTTPS im Preview-Modus
    port: 3000,  // Wähle deinen Port
  },
})
