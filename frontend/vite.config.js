import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [ 
    tailwindcss(),
    react(),
    ],
  server: {
    host: '0.0.0.0',
    port: 5173 ,
  }
});