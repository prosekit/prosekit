import fs from 'node:fs'
import { fileURLToPath, URL } from 'node:url'

import vueJsx from '@vitejs/plugin-vue-jsx'
import UnoCSS from 'unocss/vite'
import { defineConfig } from 'vite'
import unocssWacher from 'vite-plugin-unocss-watcher'

const __dirname = fileURLToPath(new URL('./', import.meta.url))

// When deploying to Netlify, sometimes the build fails with 422 Unprocessable
// Entity error. I suspect it's because I deploy the same content in a short time.
// As a workaround, a unique file is created for each build.
fs.writeFileSync(
  './public/build.log',
  `Build at ${new Date().toISOString()} ${process.env.GITHUB_SHA}`,
)

export default defineConfig({
  build: {
    target: ['es2022', 'chrome89', 'edge89', 'firefox89', 'safari15'],
  },
  resolve: {
    alias: [
      {
        find: '@',
        replacement: __dirname,
      },
    ],
  },
  plugins: [
    UnoCSS(),
    unocssWacher(['../config/unocss-shortcut.mjs']),
    vueJsx(),
  ],
})
