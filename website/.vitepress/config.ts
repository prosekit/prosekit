import { transformerTwoslash } from '@shikijs/vitepress-twoslash'
import ts from 'typescript'
import { defineConfig } from 'vitepress'

import { replaceThemesPlugin } from './markdown-it-replace-themes'
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
    outline: 2,

    logo: '/assets/logo.svg',

    nav: [
      {
        text: 'Guide',
        activeMatch: '/guide',
        link: '/guide/introduction',
      },
      {
        text: 'Extensions',
        activeMatch: '/extensions',
        link: '/extensions/heading',
      },
      {
        text: 'Components',
        activeMatch: '/components',
        link: '/components/introduction',
      },
      {
        text: 'Examples',
        activeMatch: '/examples',
        link: '/examples',
      },
      {
        text: 'References',
        activeMatch: '/references',
        link: '/references',
      },
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
          items: [
            { text: 'Heading', link: '/extensions/heading' },
            { text: 'List', link: '/extensions/list' },
            { text: 'CodeBlock', link: '/extensions/code-block' },
            { text: 'Mention', link: '/extensions/mention' },
          ],
        },

        {
          text: 'Marks',
          items: [
            { text: 'Bold', link: '/extensions/bold' },
            { text: 'Italic', link: '/extensions/italic' },
            { text: 'Link', link: '/extensions/link' },
            { text: 'Underline', link: '/extensions/underline' },
            { text: 'Strike', link: '/extensions/strike' },
          ],
        },

        {
          text: 'Functionality',
          items: [
            { text: 'Placeholder', link: '/extensions/placeholder' },
            { text: 'Text Align', link: '/extensions/text-align' },
            { text: 'Readonly', link: '/extensions/readonly' },
            { text: 'Input Rule', link: '/extensions/input-rule' },
            { text: 'Drop Cursor', link: '/extensions/drop-cursor' },
            { text: 'Gap Cursor', link: '/extensions/gap-cursor' },
            { text: 'Search', link: '/extensions/search' },
            { text: 'Commit', link: '/extensions/commit' },
          ],
        },
      ],

      '/components': [
        {
          text: 'Getting Started',
          items: [
            { text: 'Introduction', link: '/components/introduction' },
            { text: 'Installation', link: '/components/installation' },
            { text: 'Basic Editor', link: '/components/editor' },
          ],
        },
        {
          text: 'Components',
          items: [
            { text: 'Button', link: '/components/button' },
            { text: 'Toolbar', link: '/components/toolbar' },
            { text: 'Inline Menu', link: '/components/inline-menu' },
            { text: 'Slash Menu', link: '/components/slash-menu' },
            { text: 'User Menu', link: '/components/user-menu' },
          ],
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
      md.use(replaceThemesPlugin)
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
