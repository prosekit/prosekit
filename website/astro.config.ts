import preact from '@astrojs/preact'
import react from '@astrojs/react'
import solid from '@astrojs/solid-js'
import starlight from '@astrojs/starlight'
import type { StarlightUserConfig } from '@astrojs/starlight/types'
import svelte from '@astrojs/svelte'
import vue from '@astrojs/vue'
import type { AstroUserConfig } from 'astro'
import minifyHTML from 'astro-minify-html-swc'
import rehypeAstroRelativeMarkdownLinks from 'astro-rehype-relative-markdown-links'
import astrobook from 'astrobook'
import { fdir } from 'fdir'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeSlugCustomId from 'rehype-slug-custom-id'
import starlightThemeNova from 'starlight-theme-nova'
import UnoCSS from 'unocss/astro'
import wasm from 'vite-plugin-wasm'

type Sidebar = StarlightUserConfig['sidebar']

function generateReferenceSidebarItems() {
  // filePaths is an array like ['basic.md', 'core.md', 'core/test.md']
  const filePaths = (new fdir()).withRelativePaths().crawl('src/content/docs/references').sync().sort()
  const names = filePaths.map(filePath => filePath.replace(/\.mdx?/, ''))
  return names.map(name => {
    const isLeaf = name.split('/').length === 1
    const style = isLeaf ? 'font-weight: 600;' : 'margin-inline-start: 1rem;'
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
      ],
      sidebar: sidebar,
      components: {
        Hero: './src/components/overrides/Hero.astro',
      },
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
      ],
    }),
    UnoCSS(),
    preact({ include: ['src/*/preact/**/*'] }),
    react({ include: ['src/*/react/**/*'] }),
    svelte(),
    vue(),
    solid({ include: ['src/*/solid/**/*'] }),
    astrobook({
      directory: 'src/stories',
      title: 'ProseKit',
      subpath: 'astrobook',
    }),
    minifyHTML(),
  ],
  vite: {
    plugins: [wasm()],
    optimizeDeps: {
      // Ensures that Vite can detect all dependencies that need to be pre-bundled.
      // This avoids the need for full-page reloads when opening a page.
      entries: ['src/**/*.{ts,tsx,vue,svelte}'],
    },
  },
  markdown: {
    rehypePlugins: [
      [rehypeSlugCustomId, { enableCustomId: true }],
      [rehypeAutolinkHeadings, { behavior: 'wrap' }],
      [rehypeAstroRelativeMarkdownLinks, { collections: { docs: { base: false } } }],
    ],
  },
  experimental: {
    headingIdCompat: true,
  },
}

export default config
