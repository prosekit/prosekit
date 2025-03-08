import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import preact from '@astrojs/preact'
import react from '@astrojs/react'
import solid from '@astrojs/solid-js'
import type { StarlightUserConfig } from '@astrojs/starlight/types'
import svelte from '@astrojs/svelte'
import vue from '@astrojs/vue'
import starlight from '@prosekit/starlight-theme'
import minifyHTML from 'astro-minify-html-swc'
import rehypeAstroRelativeMarkdownLinks from 'astro-rehype-relative-markdown-links'
import { defineConfig } from 'astro/config'
import astrobook from 'astrobook'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeSlugCustomId from 'rehype-slug-custom-id'
import UnoCSS from 'unocss/astro'
import wasm from 'vite-plugin-wasm'

import { shikiConfig } from './src/shiki-config'

// Get the directory of the current file
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

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
    label: 'Functionality',
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

/**
 * Validates that all extension files in the given directory are included in the sidebar configuration
 */
function validateExtensionFiles() {
  const extensionsDir = path.join(__dirname, 'src/content/docs/extensions')
  const expectedItems: string[] = fs.readdirSync(extensionsDir)
    .filter(file => file.endsWith('.mdx'))
    .map(file => file.replace('.mdx', ''))

  // Extract all sidebar items with "extensions/" prefix
  const allSidebarItems: string[] = []
  sidebarExtensionItems.forEach(category => {
    category.items.forEach(item => {
      if (typeof item === 'string' && item.startsWith('extensions/')) {
        allSidebarItems.push(item.replace('extensions/', ''))
      }
    })
  })

  // Find files that are not included in the sidebar
  const missingItems = expectedItems.filter(file => !allSidebarItems.includes(file))

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
    items: sidebarExtensionItems,
  },
  {
    label: 'Components',
    collapsed: true,
    autogenerate: { directory: 'components', collapsed: true },
  },
  {
    label: 'References',
    collapsed: true,
    autogenerate: { directory: 'references', collapsed: true },
  },
]

// https://astro.build/config
// Validate extension files before building
validateExtensionFiles()

export default defineConfig({
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
      customCss: ['./src/styles/index.css'],
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
    shikiConfig,
  },
})
