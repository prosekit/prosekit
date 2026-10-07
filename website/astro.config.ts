import { satteri } from '@astrojs/markdown-satteri'
import preact from '@astrojs/preact'
import react from '@astrojs/react'
import solid from '@astrojs/solid-js'
import starlight from '@astrojs/starlight'
import type { StarlightUserConfig } from '@astrojs/starlight/types'
import svelte from '@astrojs/svelte'
import vue from '@astrojs/vue'
import tailwindcss from '@tailwindcss/vite'
import type { AstroUserConfig } from 'astro'
import minifyHTML from 'astro-minify-html-swc'
import astrobook from 'astrobook'
import { classReplace } from 'prosekit-registry/vite-plugin-class-replace'
import { satteriResolveMarkdownLinks } from 'satteri-resolve-markdown-links'
import starlightThemeNova from 'starlight-theme-nova'

import { version } from '../packages/prosekit/package.json'

import { generateExtensionsSidebar } from './src/sidebar/extensions.ts'
import { generateReferencesSidebar } from './src/sidebar/references.ts'

type Sidebar = StarlightUserConfig['sidebar']

const sidebar: Sidebar = [
  {
    label: 'Getting Started',
    items: [{ autogenerate: { directory: 'getting-started' } }],
  },
  {
    label: 'Guides',
    items: [{ autogenerate: { directory: 'guides' } }],
  },
  {
    label: 'Concepts',
    items: [{ autogenerate: { directory: 'concepts' } }],
  },
  {
    label: 'Frameworks',
    items: [{ autogenerate: { directory: 'frameworks' } }],
  },
  {
    label: 'Components',
    items: [{ autogenerate: { directory: 'components', collapsed: true } }],
  },
  {
    label: 'Extensions',
    items: [
      'extensions/overview',
      ...generateExtensionsSidebar(),
    ],
  },
  {
    label: 'References',
    collapsed: true,
    items: generateReferencesSidebar(),
  },
]

// https://astro.build/config
const config: AstroUserConfig = {
  site: 'https://prosekit.dev',
  redirects: {
    '/getting-started/running-on-nodejs': '/guides/server-side-rendering',
    '/getting-started/saving-and-loading': '/guides/saving-and-loading',
    '/getting-started/styling': '/guides/styling',
    '/getting-started/keyboard-shortcuts': '/guides/keyboard-shortcuts',
    '/getting-started/using-extensions': '/concepts/extensions',
    '/components/': '/components/overview',
    '/components/button': '/components/toolbar',
    '/components/user-menu': '/components/mention-menu',
    '/guides/custom-mark-views': '/guides/custom-node-views',
    '/frameworks/lit': '/frameworks/vanilla',
  },
  integrations: [
    starlight({
      title: 'ProseKit',
      social: [
        {
          icon: 'github',
          label: 'GitHub',
          href: 'https://github.com/prosekit/prosekit',
        },
        {
          icon: 'discord',
          label: 'Discord',
          href: 'https://prosekit.dev/chat',
        },
      ],
      sidebar: sidebar,
      components: {
        Hero: './src/components/overrides/Hero.astro',
      },
      customCss: [
        './src/styles/tailwind.css',
        './src/styles/typedoc.css',
      ],
      plugins: [
        starlightThemeNova({
          nav: [
            {
              label: 'Docs',
              href: '/getting-started/introduction',
            },
            {
              label: 'Examples',
              href: '/examples',
            },
          ],
        }),
      ].filter(x => !!x),
    }),
    // It seems that I have to put `react` before `preact` as a workaround for the following issue:
    // https://github.com/withastro/astro/issues/15341
    react({
      include: ['src/*/react/**/*.tsx', '**/src/components/**/*.tsx'],
      babel: {
        plugins: [
          ['babel-plugin-react-compiler'],
        ],
      },
    }),
    preact({ include: ['src/*/preact/**/*.tsx'] }),
    svelte(),
    vue(),
    solid({ include: ['**/solid/**/*.tsx'] }),
    astrobook({
      directory: 'src/stories',
      title: 'ProseKit',
      subpath: 'playground/',
      css: ['./src/styles/tailwind.css'],
      dashboardSubpath: '/',
      previewSubpath: '-/',
      homeContent: {
        title: 'ProseKit',
        subtitle: false,
        repo: {
          href: 'https://prosekit.dev/github',
        },
        version: {
          label: 'v' + version,
          href: 'https://prosekit.dev/changelog',
        },
      },
    }),
    minifyHTML(),
  ],
  vite: {
    resolve: {
      alias: {
        'loro-crdt': 'loro-crdt/base64',
      },
    },
    plugins: [
      classReplace(),
      tailwindcss(),
    ],
    optimizeDeps: {
      // Ensures that Vite can detect all dependencies that need to be pre-bundled.
      // This avoids the need for full-page reloads when opening a page.
      entries: ['src/**/*.{ts,tsx,vue,svelte}'],
    },
  },
  markdown: {
    processor: satteri({
      hastPlugins: [
        satteriResolveMarkdownLinks({ rootDir: './src/content/docs' }),
      ],
    }),
  },
}

export default config
