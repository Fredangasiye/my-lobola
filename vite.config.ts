import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// This defines the root directory of your project
const rootDir = process.cwd();

export default defineConfig({
  plugins: [react()],
  // The root of our frontend is the 'client' folder
  root: path.resolve(rootDir, 'client'),
  
  // This is the COMPLETE "dictionary"
  resolve: {
    alias: {
      '@': path.resolve(rootDir, 'client/src'),
      '@shared': path.resolve(rootDir, 'shared') // <-- THIS IS THE MISSING DEFINITION
    }
  },
  
  // This tells Vite where to put the final build files
  build: {
    outDir: path.resolve(rootDir, 'dist'),
    emptyOutDir: true,
  },

  // This tells the dev server how to talk to your backend API
  server: {
    proxy: {
      '/api': 'http://localhost:5001'
    }
  }
})