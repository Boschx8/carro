import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
  ],
  resolve: {
    alias: {
      // three-stdlib VRMLLoader references chevrotain which isn't shipped — stub it out
      '../libs/chevrotain.js': path.resolve(__dirname, 'src/empty.ts'),
    },
  },
})
