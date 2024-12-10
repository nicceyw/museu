import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path' // Importa path para configurar o alias

export default defineConfig({
  base: '/museu/',
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
