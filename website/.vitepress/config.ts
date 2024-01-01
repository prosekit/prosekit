import { createRequire } from 'node:module'

import { defineConfig } from 'vitepress'

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
  description: 'Ultimate Rich Text Editor',

  cleanUrls: true,
  outDir: 'dist',

  // prettier-ignore
  head: [
    ['link', { rel: "icon", type: "image/svg+xml", href: "/assets/logo.svg"}],
    ['link', { rel: "mask-icon", href: "/assets/logo.svg", color: "#ffffff"}],
    ['meta', { name: "theme-color", content: "#ffffff"}],
    ['meta', { property: "twitter:card", content: "summary_large_image" }],
    ['meta', { property: "twitter:image", content: "https://prosekit.dev/assets/cover.jpg" }],
    ['meta', { property: "og:image", content: "https://prosekit.dev/assets/cover.jpg" }],
  ],

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    outline: [2, 3],

    logo: '/assets/logo.svg',

    nav: [
      { text: 'Guide', link: '/guide/installation' },
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
          text: 'Getting Started',
          items: [
            { text: 'Installation', link: '/guide/installation' },
            { text: 'Styling', link: '/guide/styling' },
          ],
        },

        {
          text: 'Core Concepts',
          items: [
            { text: 'Extensions', link: '/guide/extensions' },
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
            { text: 'Heading', link: '/guide/nodes/heading' },
            { text: 'List', link: '/guide/nodes/list' },
            { text: 'CodeBlock', link: '/guide/nodes/code-block' },
            { text: 'Mention', link: '/guide/nodes/mention' },
          ],
        },

        {
          text: 'Marks',
          link: '/guide/marks/',
          items: [
            { text: 'Bold', link: '/guide/marks/bold' },
            { text: 'Italic', link: '/guide/marks/italic' },
            { text: 'Link', link: '/guide/marks/link' },
            { text: 'Underline', link: '/guide/marks/underline' },
            { text: 'Strike', link: '/guide/marks/strike' },
          ],
        },

        {
          text: 'Extensions',
          items: [
            { text: 'Placeholder', link: '/guide/extensions/placeholder' },
            { text: 'Readonly', link: '/guide/extensions/readonly' },
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
            {
              text: 'Svelte',
              link: '/guide/integrations/svelte',
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
      md.use(replaceShortcutsPlugin)
    },
  },
})
