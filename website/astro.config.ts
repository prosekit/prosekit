import fs from 'node:fs'
import path from 'node:path'

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
import rehypeAstroRelativeMarkdownLinks from 'astro-rehype-relative-markdown-links'
import astrobook from 'astrobook'
import { fdir } from 'fdir'
import { classReplace } from 'prosekit-registry/vite-plugin-class-replace'
import starlightThemeNova from 'starlight-theme-nova'
import wasm from 'vite-plugin-wasm'

type Sidebar = StarlightUserConfig['sidebar']

function copyRegistry(): void {
  const rootDir = path.join(import.meta.dirname, '..')
  const sourceDir = path.join(rootDir, 'registry', 'dist', 'r')
  const targetDir = path.join(rootDir, 'website', 'public', 'r')

  fs.cpSync(sourceDir, targetDir, { recursive: true })
}

function generateReferenceSidebarItems() {
  // filePaths is an array like ['basic.md', 'core.md', 'core/test.md']
  const filePaths = (new fdir()).withRelativePaths().crawl('src/content/docs/references').sync().sort()
  return filePaths.map(filePath => {
    // Remove the file extension
    let name = filePath.replace(/\.mdx?/, '')

    // Remove the dot because Starlight doesn't allow '.' in the slug
    name = name.replaceAll('.', '')

    const isLeaf = name.includes('/')
    const style = isLeaf ? 'margin-inline-start: 1rem;' : 'font-weight: 600;'
    return { slug: `references/${name}`, attrs: { style } }
  })
}

function generateExtensionsSidebarItems() {
  const classification = {
    node: ['blockquote', 'code-block', 'heading', 'horizontal-rule', 'image', 'list', 'mention', 'table', 'doc', 'paragraph', 'text', 'hard-break'],
    mark: ['bold', 'code', 'italic', 'link', 'strike', 'underline'],
    other: ['commit', 'drop-cursor', 'enter-rule', 'file', 'gap-cursor', 'input-rule', 'loro', 'placeholder', 'readonly', 'search', 'text-align', 'yjs'],
  }

  const nodeItems: string[] = []
  const markItems: string[] = []
  const otherItems: string[] = []

  // filePaths is an array like ['bold.mdx', 'code.mdx']
  const filePaths = (new fdir()).withRelativePaths().crawl('src/content/docs/extensions').sync().sort()
  const names = filePaths.map(filePath => filePath.replace(/\.mdx?/, ''))

  for (const name of names) {
    const item = `extensions/${name}`
    if (classification.node.includes(name)) {
      nodeItems.push(item)
    } else if (classification.mark.includes(name)) {
      markItems.push(item)
    } else if (classification.other.includes(name)) {
      otherItems.push(item)
    } else {
      throw new Error(`Unable to classify extension ${name}. Please update astro.config.ts to fix it`)
    }
  }

  return [
    { label: 'Nodes', items: nodeItems },
    { label: 'Marks', items: markItems },
    { label: 'Others', items: otherItems },
  ]
}

const sidebar: Sidebar = [
  {
    label: 'Getting Started',
    collapsed: true,
    autogenerate: { directory: 'getting-started' },
  },
  {
    label: 'Extensions',
    collapsed: true,
    items: generateExtensionsSidebarItems(),
  },
  {
    label: 'Components',
    collapsed: true,
    autogenerate: { directory: 'components', collapsed: true },
  },
  {
    label: 'References',
    collapsed: true,
    items: generateReferenceSidebarItems(),
  },
]

// https://astro.build/config
const config: AstroUserConfig = {
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
        './src/styles/global.css',
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
    preact({ include: ['src/*/preact/**/*.tsx'] }),
    react({
      include: ['src/*/react/**/*.tsx'],
      babel: {
        plugins: [
          ['babel-plugin-react-compiler'],
        ],
      },
    }),
    svelte(),
    vue(),
    solid({ include: ['**/solid/**/*.tsx'] }),
    astrobook({
      directory: 'src/stories',
      title: 'ProseKit',
      subpath: 'playground/',
      css: ['./src/styles/global.css'],
      dashboardSubpath: '/',
      previewSubpath: '-/',
    }),
    minifyHTML(),
    {
      name: 'copy-registry',
      hooks: {
        'astro:build:done': copyRegistry,
      },
    },
  ],
  vite: {
    plugins: [
      classReplace(),
      wasm(),
      tailwindcss(),
    ],
    optimizeDeps: {
      // Ensures that Vite can detect all dependencies that need to be pre-bundled.
      // This avoids the need for full-page reloads when opening a page.
      entries: ['src/**/*.{ts,tsx,vue,svelte}'],
    },
  },
  markdown: {
    // Disable smartypants to prevent converting "..." into "…"
    smartypants: false,

    rehypePlugins: [
      [rehypeAstroRelativeMarkdownLinks, { collections: { docs: { base: false } } }],
    ],
  },
  experimental: {
    headingIdCompat: true,
  },
}

export default config
