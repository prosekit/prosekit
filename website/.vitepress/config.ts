import { defineConfig } from 'vitepress'

import { referenceItems } from './sidebar-reference-items'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'ProseKit',
  description: 'The Ultimate Toolkit for Text Editing',

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
            { text: 'Extension', link: '/guide/extensions' },
            { text: 'Schemas', link: '/guide/schemas' },
            { text: 'Commands', link: '/guide/commands' },
            { text: 'Key Bindings', link: '/guide/key-bindings' },
            // { text: 'Input Rules', link: '/guide/input-rules' },
          ],
        },

        {
          text: 'Nodes',
          link: '/guide/nodes/',
          items: [
            { text: 'heading', link: '/guide/nodes/heading' },
            { text: 'list', link: '/guide/nodes/list' },
          ],
        },

        {
          text: 'Marks',
          items: [
            { text: 'bold', link: '/guide/marks/bold' },
            { text: 'italic', link: '/guide/marks/italic' },
          ],
        },

        // {
        //   text: 'Commands',
        //   items: [
        //     { text: 'insertText', link: '/guide/404' },
        //     { text: 'insertNode', link: '/guide/404' },
        //   ],
        // },

        // {
        //   text: 'Components',
        //   items: [
        //     {
        //       text: 'Autocomplete',
        //       link: '/guide/404',
        //     },
        //     {
        //       text: 'InlinePopover (WIP)',
        //       link: '/guide/404',
        //     },
        //   ],
        // },

        {
          text: 'Full API References',
          link: '/references',
        },
      ],

      '/references': [
        {
          text: 'API References',
          items: referenceItems,
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
