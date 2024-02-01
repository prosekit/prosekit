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

  cleanUrls: true,
  outDir: 'dist',

  // See https://github.com/antfu/shikiji/issues/86
  vite: {
    ssr: {
      noExternal: ['shikiji-twoslash', 'vitepress-plugin-twoslash'],
    },
  },

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
          link: '/guide/nodes/',
          items: [
            { text: 'Heading', link: '/guide/heading' },
            { text: 'List', link: '/guide/list' },
            { text: 'CodeBlock', link: '/guide/code-block' },
            { text: 'Mention', link: '/guide/mention' },
          ],
        },

        {
          text: 'Marks',
          link: '/guide/marks/',
          items: [
            { text: 'Bold', link: '/guide/bold' },
            { text: 'Italic', link: '/guide/italic' },
            { text: 'Link', link: '/guide/link' },
            { text: 'Underline', link: '/guide/underline' },
            { text: 'Strike', link: '/guide/strike' },
          ],
        },

        {
          items: [
            { text: 'Placeholder', link: '/guide/placeholder' },
            { text: 'Readonly', link: '/guide/readonly' },
            { text: 'Drop Cursor', link: '/guide/drop-cursor' },
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
