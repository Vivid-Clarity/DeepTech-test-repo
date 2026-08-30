import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Port is fixed so the site is always at http://localhost:5173
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    strictPort: true,
  },
  preview: {
    port: 4173,
    strictPort: true,
  },
})
