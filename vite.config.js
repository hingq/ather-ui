import { fileURLToPath, URL } from 'node'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(),

  AutoImport({
    imports: ['vue', 'vue-router'], //自动引入相关函数
  }),
  ],
  build: {
    lib: {
      entry: fileURLToPath(new URL('./src/index.js', import.meta.url)),
      name: 'he-ui',
      formats: ['cjs', 'es'],
      // fileName: 'he-component-ui'
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue'
        },
      }
    }
  },
  // server:{
  //   host:'0.0.0.0',
  //   port:8080
  // },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
