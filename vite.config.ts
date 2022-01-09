import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  root:'./',
  resolve:{
    alias:{
      '@':path.join(__dirname,'./src'),
      '@style':path.join(__dirname,'./src/style'),
      '@utils':path.join(__dirname,'./src/utils')
    }
  }
})
