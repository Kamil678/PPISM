import {
  defineConfig
} from 'vite'
import vue from '@vitejs/plugin-vue'
import {
  quasar,
  transformAssetUrls
} from '@quasar/vite-plugin'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/PPISM/',
  build: {
    emptyOutDir: false,
    outDir: '../docs'
  },
  plugins: [vue()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "./src/assets/styles/variables.scss";@import "./src/assets/styles/main.scss";',
      },
    },
  },
})