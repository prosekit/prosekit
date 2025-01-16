import preact from '@astrojs/preact'
import react from '@astrojs/react'
import solid from '@astrojs/solid-js'
import starlight from '@astrojs/starlight'
import svelte from '@astrojs/svelte'
import vue from '@astrojs/vue'
import { defineConfig } from 'astro/config'
import astrobook from 'astrobook'
import UnoCSS from 'unocss/astro'
import wasm from 'vite-plugin-wasm'

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      title: 'My Docs',
      social: {
        github: 'https://github.com/withastro/starlight',
      },
      sidebar: [
        {
          label: 'Guides',
          items: [
            // Each item here is one entry in the navigation menu.
            { label: 'Example Guide', slug: 'guides/example' },
          ],
        },
        {
          label: 'Reference',
          autogenerate: { directory: 'reference' },
        },
      ],
      customCss: [
        // Relative path to your custom CSS file
        './src/styles/custom.css',
      ],
      components: {
        Header: './src/components/overrides/Header.astro',
        Search: './src/components/overrides/Search.astro',
        TwoColumnContent: './src/components/overrides/TwoColumnContent.astro',
        ThemeProvider: './src/components/overrides/ThemeProvider.astro',
        ThemeSelect: './src/components/overrides/ThemeSelect.astro',
        SocialIcons: './src/components/overrides/SocialIcons.astro',
        SiteTitle: './src/components/overrides/SiteTitle.astro',
        PageFrame: './src/components/overrides/PageFrame.astro',
        MobileMenuToggle: './src/components/overrides/MobileMenuToggle.astro',
        Hero: './src/components/overrides/Hero.astro',
      },
    }),
    UnoCSS(),
    preact({ include: ['*/preact/**/*'] }),
    react({ include: ['*/react/**/*'] }),
    svelte(),
    vue(),
    solid({ include: ['*/solid/**/*'] }),
    astrobook({ directory: 'src/stories', title: 'ProseKit', subpath: 'astrobook' }),
  ],
  vite: {
    plugins: [wasm()],
    optimizeDeps: {
      // Ensures that Vite can detect all dependencies that need to be pre-bundled.
      // This avoids the need for full-page reloads when opening a page.
      entries: ['examples/**/*.{ts,tsx,vue,svelte}'],
    },
  },
})
