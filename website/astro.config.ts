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

const sidebarExtensionItems = [
  {
    label: 'Nodes',
    /// keep-sorted
    items: [
      'extensions/blockquote',
      'extensions/code-block',
      'extensions/heading',
      'extensions/horizontal-rule',
      'extensions/image',
      'extensions/list',
      'extensions/mention',
      'extensions/table',
    ],
  },
  {
    label: 'Marks',
    /// keep-sorted
    items: [
      'extensions/bold',
      'extensions/code',
      'extensions/italic',
      'extensions/link',
      'extensions/strike',
      'extensions/underline',
    ],
  },
  {
    label: 'Others',
    /// keep-sorted
    items: [
      'extensions/commit',
      'extensions/drop-cursor',
      'extensions/enter-rule',
      'extensions/file',
      'extensions/gap-cursor',
      'extensions/input-rule',
      'extensions/loro',
      'extensions/placeholder',
      'extensions/readonly',
      'extensions/search',
      'extensions/text-align',
      'extensions/yjs',
    ],
  },
]

function generateReferenceSidebarItems(): { slug: string }[] {
  // filePaths is an array like ['basic.md', 'core.md', 'core/test.md']
  const filePaths = (new fdir()).withRelativePaths().crawl('src/content/docs/references').sync().sort()
  const names = filePaths.map(filePath => filePath.replace(/\.mdx?/, ''))
  const items = names.map(name => ({ slug: `references/${name}` }))
  return items
}

function generateExtensionsSidebarItems() {
  /// keep-sorted
  const nodeNames = [
    'blockquote',
    'code-block',
    'heading',
    'horizontal-rule',
    'image',
    'list',
    'mention',
    'table',
  ]
  /// keep-sorted
  const markNames = [
    'bold',
    'code',
    'italic',
    'link',
    'strike',
    'underline',
  ]
  /// keep-sorted
  const otherNames = [
    'commit',
    'drop-cursor',
    'enter-rule',
    'file',
    'gap-cursor',
    'input-rule',
    'loro',
    'placeholder',
    'readonly',
    'search',
    'text-align',
    'yjs',
  ]

  const nodeItems: string[] = []
  const markItems: string[] = []
  const othersItems: string[] = []

  // filePaths is an array like ['bold.mdx', 'code.mdx']
  const filePaths = (new fdir()).withRelativePaths().crawl('src/content/docs/extensions').sync().sort()
  const names = filePaths.map(filePath => filePath.replace(/\.mdx?/, ''))

  for (const name of names) {
    const item = `extensions/${name}`
    if (nodeNames.includes(name)) {
      nodeItems.push(item)
    } else if (markNames.includes(name)) {
      markItems.push(item)
    } else if (otherNames.includes(name)) {
      otherNames.push(item)
    } else {
      throw new Error(`Unable to classify ${item}. Please update astro.config.ts to fix it`)
    }
  }

  return [
    { label: 'Nodes', items: nodeItems },
    { label: 'Marks', items: markItems },
    { label: 'Others', items: othersItems },
  ]
}

/**
 * Validates that all extension files in the given directory are included in the sidebar configuration
 */
function validateExtensionFiles() {
  // filePaths is an array like ['bold.mdx', 'code.mdx']
  const filePaths: string[] = (new fdir()).withRelativePaths().crawl('src/content/docs/extensions').sync()

  const expectedItems = filePaths.map(filePath => filePath.replace(/\.mdx?/, '')).map(item => `extensions/${item}`)
  const actualItems = sidebarExtensionItems.flatMap(group => group.items)
  const missingItems = expectedItems.filter(item => !actualItems.includes(item))

  if (missingItems.length > 0) {
    console.error('Error: The following extension files are not included in the sidebar configuration:')
    missingItems.forEach(file => console.error(`  - ${file}`))
    throw new Error('Missing extension files in sidebar configuration')
  }
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
// Validate extension files before building
validateExtensionFiles()

const config: AstroUserConfig = {
  integrations: [
    starlight({
      title: 'ProseKit',
      social: {
        github: 'https://github.com/prosekit/prosekit',
      },
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
