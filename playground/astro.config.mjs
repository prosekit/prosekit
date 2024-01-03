import preact from '@astrojs/preact'
import react from '@astrojs/react'
import solid from '@astrojs/solid-js'
import svelte from '@astrojs/svelte'
import vue from '@astrojs/vue'
import { defineConfig } from 'astro/config'
import unocss from 'unocss/astro'

// https://astro.build/config
export default defineConfig({
  srcDir: './',
  // Enable many frameworks to support all different kinds of components.
  integrations: [
    preact({ include: ['**/preact-*/*'] }),
    react({ include: ['**/react-*/*'] }),
    svelte(),
    vue(),
    solid({ include: ['**/solid-*/*'] }),
    unocss({ injectReset: true }),
  ],
  base: 'playground/dist',
})
