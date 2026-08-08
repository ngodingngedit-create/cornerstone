import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    chunkSizeWarningLimit: 600,
    rolldownOptions: {
      onLog(level, log, defaultHandler) {
        if (log.code === 'EVAL' && log.id && log.id.includes('node_modules/lottie-web')) {
          return
        }
        defaultHandler(level, log)
      }
    }
  }
})