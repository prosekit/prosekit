import vueJsx from '@vitejs/plugin-vue-jsx'
import UnoCSS from 'unocss/vite'
import { defineConfig } from 'vite'
import unocssWacher from 'vite-plugin-unocss-watcher'

export default defineConfig({
  build: {
    target: ['es2022', 'chrome89', 'edge89', 'firefox89', 'safari15'],
  },
  plugins: [
    UnoCSS(),
    unocssWacher(['../config/unocss-shortcut.mjs']),
    vueJsx(),
  ],
})
