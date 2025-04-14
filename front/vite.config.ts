import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
    allowedHosts: ["5851-2804-14c-87b0-9fbd-ba0e-5f7d-13d-649.ngrok-free.app"]
  },
})
