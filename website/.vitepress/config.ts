import ts from 'typescript'
import { defineConfig } from 'vitepress'
import { transformerTwoslash } from 'vitepress-plugin-twoslash'

import { replaceShortcutsPlugin } from './replace-shortcuts-plugin'
import { exampleItems } from './sidebar-example-items'
import { referenceItems } from './sidebar-reference-items'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'ProseKit',
  description: 'Ultimate Rich Text Editor',

  cleanUrls: !process.env.PROSEKIT_NO_CLEAN_URLS,
  outDir: 'dist',

  // prettier-ignore
  head: [
    ['link', { rel: "icon", type: "image/svg+xml", href: "/assets/logo.svg"}],
    ['link', { rel: "mask-icon", href: "/assets/logo.svg", color: "#ffffff"}],
    ['meta', { name: "theme-color", content: "#ffffff"}],
    ['meta', { property: "twitter:card", content: "summary_large_image" }],
    ['meta', { property: "twitter:image", content: "https://prosekit.dev/assets/cover.png" }],
    ['meta', { property: "og:image", content: "https://prosekit.dev/assets/cover.png" }],
  ],

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    outline: [2, 3],

    logo: '/assets/logo.svg',

    nav: [
      { text: 'Guide', link: '/guide/introduction' },
      { text: 'Extensions', link: '/extensions/heading' },
      { text: 'Components', link: '/components/toolbar' },
      { text: 'References', link: '/references' },
    ],

    sidebar: {
      '/guide': [
        {
          text: 'Overview',
          items: [
            { text: 'Introduction', link: '/guide/introduction' },
            { text: 'Get Started', link: '/guide/get-started' },
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
      ],

      '/extensions': [
        {
          text: 'Nodes',
          link: '/extensions/nodes/',
          items: [
            { text: 'Heading', link: '/extensions/heading' },
            { text: 'List', link: '/extensions/list' },
            { text: 'CodeBlock', link: '/extensions/code-block' },
            { text: 'Mention', link: '/extensions/mention' },
          ],
        },

        {
          text: 'Marks',
          link: '/extensions/marks/',
          items: [
            { text: 'Bold', link: '/extensions/bold' },
            { text: 'Italic', link: '/extensions/italic' },
            { text: 'Link', link: '/extensions/link' },
            { text: 'Underline', link: '/extensions/underline' },
            { text: 'Strike', link: '/extensions/strike' },
          ],
        },

        {
          items: [
            { text: 'Placeholder', link: '/extensions/placeholder' },
            { text: 'Readonly', link: '/extensions/readonly' },
            { text: 'Drop Cursor', link: '/extensions/drop-cursor' },
          ],
        },
      ],

      '/components': [
        {
          text: 'Toolbar',
          link: '/components/toolbar',
        },
        {
          text: 'Inline Popover',
          link: '/components/inline-popover',
        },
        {
          text: 'Autocomplete',
          link: '/components/autocomplete',
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

    codeTransformers: [
      transformerTwoslash({
        twoslashOptions: {
          compilerOptions: {
            moduleResolution: ts.ModuleResolutionKind.Bundler,
          },
        },
      }),
    ],
  },
})
