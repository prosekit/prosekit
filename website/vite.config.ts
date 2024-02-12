import { fileURLToPath, URL } from 'node:url'

import vueJsx from '@vitejs/plugin-vue-jsx'
import UnoCSS from 'unocss/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    target: ['es2022', 'chrome89', 'edge89', 'firefox89', 'safari15'],
  },
  css: {
    transformer: 'lightningcss',
  },
  resolve: {
    alias: [
      {
        find: '@',
        replacement: fileURLToPath(new URL('./', import.meta.url)),
      },
    ],
  },
  plugins: [UnoCSS(), vueJsx()],
})
