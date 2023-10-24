import UnoCSS from 'unocss/vite'
import { defineConfig } from 'vite'
import unocssWacher from 'vite-plugin-unocss-watcher'

export default defineConfig({
  plugins: [UnoCSS(), unocssWacher(['../config/unocss-shortcut.mjs'])],
})
