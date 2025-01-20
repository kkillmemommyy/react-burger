import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/react-burger/',
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  appType: 'spa'
});


