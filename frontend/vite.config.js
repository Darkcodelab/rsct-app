import { defineConfig } from 'vite';
import { VitePWA } from "vite-plugin-pwa";
import react from '@vitejs/plugin-react';

const manifestForPlugin = {
  registerType: "prompt",
  manifest: {
    name: "RSCT App",
    short_name: "RSCT",
    icons: [
      {
        src: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png"
      },
      {
        src: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png"
      },
    ],
    theme_color: "#171717",
    background_color: "#e8ebf2",
    display: "standalone",
    scope: "/",
    start_url: "/",
    // orientation: "portrait",
  }
};

// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  plugins: [react(), VitePWA(manifestForPlugin)],
});
