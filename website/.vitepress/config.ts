import { defineConfig } from 'vitepress'

import { docsItems } from './docs-sidebar'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'ProseKit',
  description: 'A VitePress Site',

  cleanUrls: true,
  outDir: 'dist',

  rewrites: {
    'references/index.md': 'references.md',
  },

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Guide', link: '/guide/what-is-prosekit' },
      { text: 'API References', link: '/references' },
      { text: 'Examples', link: '/examples' },
    ],

    sidebar: {
      '/guide': [
        {
          text: 'Introduction',
          items: [
            { text: 'What is ProseKit', link: '/guide/what-is-prosekit' },
            { text: 'Getting Started', link: '/guide/getting-started' },
          ],
        },

        {
          text: 'Core Concepts',
          items: [
            { text: 'Extension', link: '/guide/404' },
            { text: 'Node', link: '/guide/404' },
            { text: 'Mark', link: '/guide/404' },
            { text: 'Commands', link: '/guide/404' },
            { text: 'Keymap', link: '/guide/404' },
          ],
        },

        {
          text: 'Nodes',
          items: [
            { text: 'Use Built-in Nodes', link: '/guide/404' },
            { text: 'Add a Custom Node', link: '/guide/404' },
          ],
        },

        {
          text: 'Marks',
          items: [
            { text: 'Use Built-in Marks', link: '/guide/404' },
            { text: 'Add a Custom Mark', link: '/guide/404' },
          ],
        },

        {
          text: 'Components',
          items: [
            {
              text: 'AutocompletePopover',
              link: '/guide/404',
            },
            {
              text: 'InlinePopover',
              link: '/guide/404',
            },
          ],
        },

        {
          text: 'Full API References',
          link: '/references',
        },
      ],

      '/references': [
        {
          text: 'API References',
          items: docsItems,
        },
      ],
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/ocavue/prosekit' },
    ],

    search: {
      provider: 'local',
    },
  },
})
