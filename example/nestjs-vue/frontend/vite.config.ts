import { defineConfig } from "vite"
import Ogrest from "../../../dist/rollup/plugin.js"
import vue from "@vitejs/plugin-vue"
import path from "path"
export default defineConfig({
  plugins: [Ogrest(), vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      "backend": path.resolve(__dirname, '../backend/src')
    }
  },
  esbuild: {
    exclude: /\.controller.ts$/
  },
  optimizeDeps: {
    exclude: ['@nestjs/common', '@nestjs/swagger']
  }
})