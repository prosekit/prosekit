// @ts-check
import starlight from '@astrojs/starlight'
import { defineConfig } from 'astro/config'
import UnoCSS from 'unocss/astro'

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
      },
    }),
    UnoCSS(),
  ],
})
