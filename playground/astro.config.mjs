import preact from '@astrojs/preact'
import react from '@astrojs/react'
import solid from '@astrojs/solid-js'
import svelte from '@astrojs/svelte'
import vue from '@astrojs/vue'
import { defineConfig } from 'astro/config'
import unocss from 'unocss/astro'
import unocssWatcher from 'vite-plugin-unocss-watcher'

// https://astro.build/config
export default defineConfig({
  srcDir: './',
  vite: {
    plugins: [unocssWatcher(['../config/unocss-shortcut.mjs'])],
  },
  // Enable many frameworks to support all different kinds of components.
  integrations: [
    preact({ include: ['**/preact-*/*'] }),
    react({ include: ['**/react-*/*'] }),
    svelte(),
    vue(),
    solid({ include: ['**/solid-*/*'] }),
    unocss({}),
  ],
  base: 'playground/dist',
})
