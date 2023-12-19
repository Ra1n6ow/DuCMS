import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// import AutoImport from 'unplugin-auto-import/vite'
// import Components from 'unplugin-vue-components/vite'
// import { ArcoResolver } from 'unplugin-vue-components/resolvers'

import { vitePluginForArco } from '@arco-plugins/vite-vue'

export default defineConfig({
  plugins: [
    vue(), // vue插件用于编译vue代码
    vitePluginForArco({
      style: 'css'
    })
    // AutoImport({
    //   resolvers: [ArcoResolver()]
    // }),
    // Components({
    //   resolvers: [
    //     ArcoResolver({
    //       sideEffect: true
    //     })
    //   ]
    // })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)) // 打包时@ 映射到 ./src
    }
  }
})
