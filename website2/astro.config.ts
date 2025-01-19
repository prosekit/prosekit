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
      title: 'ProseKit',
      social: {
        github: 'https://github.com/prosekit/prosekit',
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
      expressiveCode: {
        // Replace the default themes with a custom set of bundled themes:
        // "dracula" (a dark theme) and "solarized-light"
        themes: ['one-dark-pro', 'one-light'],
        styleOverrides: {
          borderRadius: '0',
          borderWidth: '0',
          borderColor: 'transparent',
          gutterBorderColor: 'transparent',
          frames: {
            frameBoxShadowCssValue: 'none',
          }
        }
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
