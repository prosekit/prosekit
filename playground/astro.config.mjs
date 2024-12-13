import preact from '@astrojs/preact'
import react from '@astrojs/react'
import solid from '@astrojs/solid-js'
import svelte from '@astrojs/svelte'
import vue from '@astrojs/vue'
import { defineConfig } from 'astro/config'
import astrobook from 'astrobook'
import unocss from 'unocss/astro'
import wasm from 'vite-plugin-wasm'

// https://astro.build/config
export default defineConfig({
  // Enable many frameworks to support all different kinds of components.
  integrations: [
    preact({ include: ['*/preact/**/*'] }),
    react({ include: ['*/react/**/*'] }),
    svelte(),
    vue(),
    solid({ include: ['*/solid/**/*'] }),
    unocss({ injectReset: true }),
    astrobook({ directory: 'src/stories', title: 'ProseKit' }),
  ],
  base: 'astrobook',
  vite: {
    plugins: [wasm()],
    optimizeDeps: {
      // Ensures that Vite can detect all dependencies that need to be pre-bundled.
      // This avoids the need for full-page reloads when opening a page.
      entries: ['examples/**/*.{ts,tsx,vue,svelte}'],
    },
  },
})
