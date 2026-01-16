import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // IMPORTANTE: Esta línea le dice a la web que está dentro de la carpeta Beauty-Page
  // Debe tener slash al principio y al final: /Nombre-Repo/
  base: '/Beauty-Page/',
})