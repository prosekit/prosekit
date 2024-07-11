import preact from '@astrojs/preact'
import react from '@astrojs/react'
import solid from '@astrojs/solid-js'
import svelte from '@astrojs/svelte'
import vue from '@astrojs/vue'
import { defineConfig } from 'astro/config'
import unocss from 'unocss/astro'

// https://astro.build/config
export default defineConfig({
  // Enable many frameworks to support all different kinds of components.
  integrations: [
    preact({ include: ['examples/preact/*/**'] }),
    react({ include: ['examples/react/**/*'] }),
    svelte(),
    vue(),
    solid({ include: ['examples/solid/**/*'] }),
    unocss({ injectReset: true }),
    {
      name: 'astro-integration-dark-mode',
      hooks: {
        'astro:config:setup': ({ addDevToolbarApp }) => {
          addDevToolbarApp('./src/helpers/dark-mode-toolbar.ts')
        },
      },
    },
  ],
  base: '_',
})
