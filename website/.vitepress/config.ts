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
            { text: 'Extension (WIP)', link: '/guide/404' },
            { text: 'Node (WIP)', link: '/guide/404' },
            { text: 'Mark (WIP)', link: '/guide/404' },
            { text: 'Commands (WIP)', link: '/guide/404' },
            { text: 'Keymap (WIP)', link: '/guide/404' },
          ],
        },

        {
          text: 'Nodes',
          items: [
            { text: 'Use Built-in Nodes (WIP)', link: '/guide/404' },
            { text: 'Add a Custom Node (WIP)', link: '/guide/404' },
          ],
        },

        {
          text: 'Marks',
          items: [
            { text: 'Use Built-in Marks (WIP)', link: '/guide/404' },
            { text: 'Add a Custom Mark (WIP)', link: '/guide/404' },
          ],
        },

        {
          text: 'Components',
          items: [
            {
              text: 'Autocomplete (WIP)',
              link: '/guide/404',
            },
            {
              text: 'InlinePopover (WIP)',
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
