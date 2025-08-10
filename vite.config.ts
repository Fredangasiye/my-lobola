import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

const rootDir = process.cwd();

export default defineConfig({
  plugins: [react()],
  root: path.resolve(rootDir, 'client'),
  resolve: {
    alias: {
      '@': path.resolve(rootDir, 'client/src'),
      '@shared': path.resolve(rootDir, 'shared')
    }
  },
  build: {
    outDir: path.resolve(rootDir, 'dist'),
    emptyOutDir: true,
    rollupOptions: {
      external: process.env.ROLLUP_NO_NATIVE ? ['@rollup/rollup-linux-x64-gnu'] : []
    }
  },
  server: {
    proxy: { '/api': 'http://localhost:5001' }
  },
  define: {
    'process.env.ROLLUP_NO_NATIVE': JSON.stringify(process.env.ROLLUP_NO_NATIVE || '1')
  }
})