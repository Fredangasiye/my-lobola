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
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['@radix-ui/react-slot', '@radix-ui/react-dialog']
        }
      }
    }
  },
  server: {
    proxy: { '/api': 'http://localhost:5001' }
  },
  optimizeDeps: {
    exclude: ['@rollup/rollup-linux-x64-gnu']
  },
  define: {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production')
  }
})