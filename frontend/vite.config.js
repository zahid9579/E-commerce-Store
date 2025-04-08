import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import {flowbiteplugin} from "flowbite/plugin"

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    flowbiteplugin
  ],
  server: {
    proxy: {
      "/api/": "http://localhost:5000",
    },
  },
});
