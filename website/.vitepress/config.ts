import { createRequire } from 'node:module'

import { defineConfig } from 'vitepress'
import { tabsMarkdownPlugin } from 'vitepress-plugin-tabs'

import { replaceShortcutsPlugin } from './replace-shortcuts-plugin'
import { exampleItems } from './sidebar-example-items'
import { referenceItems } from './sidebar-reference-items'

const require = createRequire(import.meta.url)
const pkg = require('../../packages/prosekit/package.json') as {
  version: string
}

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'ProseKit',
  description: 'The Ultimate Toolkit for Text Editing',

  cleanUrls: true,
  outDir: 'dist',

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Guide', link: '/guide/what-is-prosekit' },
      { text: 'API References', link: '/references' },
      { text: 'Examples', link: '/examples' },
      {
        text: 'v' + pkg.version,
        items: [
          {
            text: 'Changelog',
            link: 'https://github.com/ocavue/prosekit/blob/master/packages/prosekit/CHANGELOG.md',
          },
        ],
      },
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
            { text: 'codeBlock', link: '/guide/nodes/code-block' },
          ],
        },

        {
          text: 'Marks',
          link: '/guide/marks/',
          items: [
            { text: 'bold', link: '/guide/marks/bold' },
            { text: 'italic', link: '/guide/marks/italic' },
            { text: 'link', link: '/guide/marks/link' },
            { text: 'underline', link: '/guide/marks/underline' },
            { text: 'strike', link: '/guide/marks/strike' },
          ],
        },

        // {
        //   text: 'Commands',
        //   items: [
        //     { text: 'insertText', link: '/guide/404' },
        //     { text: 'insertNode', link: '/guide/404' },
        //   ],
        // },

        {
          text: 'Integrations',
          items: [
            {
              text: 'React',
              link: '/guide/integrations/react',
            },
            {
              text: 'Vue',
              link: '/guide/integrations/vue',
            },
          ],
        },

        {
          text: 'Components',
          items: [
            {
              text: 'Toolbar',
              link: '/guide/components/toolbar',
            },
            {
              text: 'Inline Popover',
              link: '/guide/components/inline-popover',
            },
            {
              text: 'Autocomplete',
              link: '/guide/components/autocomplete',
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
          items: referenceItems,
        },
      ],

      '/examples': [
        {
          text: 'Examples',
          items: exampleItems,
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

  markdown: {
    config(md) {
      md.use(tabsMarkdownPlugin)
      md.use(replaceShortcutsPlugin)
    },
  },
})
