import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: [
        "logox192.png",
        "logox512.png",
        "logox.png"
      ],

      devOptions: {
        enabled: true
      },

      manifest: {
        name: "Zhongke India Taskflow Manager",
        short_name: "Zhongke CRM",
        description: "Internal Task Management CRM",

        theme_color: "#1c7ab8",
        background_color: "#ffffff",

        display: "standalone",
        orientation: "portrait",
        start_url: "/",
        scope: "/",

        icons: [
          {
            src: "/logox192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any maskable"
          },
          {
            src: "/logox512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable"
          }
        ]
      }
    })
  ]
});
