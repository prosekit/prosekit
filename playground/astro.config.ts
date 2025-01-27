import preact from '@astrojs/preact'
import react from '@astrojs/react'
import solid from '@astrojs/solid-js'
import type { StarlightUserConfig } from '@astrojs/starlight/types'
import svelte from '@astrojs/svelte'
import vue from '@astrojs/vue'
import starlight from '@prosekit/starlight-theme'
import minifyHTML from 'astro-minify-html-swc'
import { defineConfig } from 'astro/config'
import astrobook from 'astrobook'
import UnoCSS from 'unocss/astro'
import wasm from 'vite-plugin-wasm'

type Sidebar = StarlightUserConfig['sidebar']

const sidebar: Sidebar = [
  {
    label: 'Getting Started',
    autogenerate: { directory: 'getting-started' },
  },
  {
    label: 'Reference',
    autogenerate: { directory: 'reference' },
  },
]

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      title: 'ProseKit',
      social: {
        github: 'https://github.com/prosekit/prosekit',
      },
      sidebar: sidebar,
      components: {
        Hero: './src/components/overrides/Hero.astro',
      },
    }),
    UnoCSS(),
    preact({ include: ['src/*/preact/**/*'] }),
    react({ include: ['src/*/react/**/*'] }),
    svelte(),
    vue(),
    solid({ include: ['src/*/solid/**/*'] }),
    astrobook({
      directory: 'src/stories',
      title: 'ProseKit',
      subpath: 'astrobook',
    }),
    minifyHTML(),
  ],
  vite: {
    plugins: [wasm()],
    optimizeDeps: {
      // Ensures that Vite can detect all dependencies that need to be pre-bundled.
      // This avoids the need for full-page reloads when opening a page.
      entries: ['src/**/*.{ts,tsx,vue,svelte}'],
    },
  },
})
