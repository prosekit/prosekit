import fs from 'node:fs'
import path from 'node:path'
import { styleText } from 'node:util'

import preact from '@astrojs/preact'
import react from '@astrojs/react'
import solid from '@astrojs/solid-js'
import starlight from '@astrojs/starlight'
import type { StarlightUserConfig } from '@astrojs/starlight/types'
import svelte from '@astrojs/svelte'
import vue from '@astrojs/vue'
import tailwindcss from '@tailwindcss/vite'
import type {
  AstroIntegrationLogger,
  AstroUserConfig,
} from 'astro'
import minifyHTML from 'astro-minify-html-swc'
import rehypeAstroRelativeMarkdownLinks from 'astro-rehype-relative-markdown-links'
import astrobook from 'astrobook'
import { classReplace } from 'prosekit-registry/vite-plugin-class-replace'
import starlightThemeNova from 'starlight-theme-nova'
import { exec } from 'tinyexec'
import wasm from 'vite-plugin-wasm'

type Sidebar = StarlightUserConfig['sidebar']

function generateReferenceSidebarItems() {
  // filePaths is an array like ['basic.md', 'core.md', 'core/test.md']
  const filePaths = fs.globSync('**/*.mdx?', { cwd: 'src/content/docs/references' }).sort()
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
    mark: ['bold', 'code', 'italic', 'link', 'strike', 'underline', 'text-color', 'background-color'],
    other: ['commit', 'drop-cursor', 'enter-rule', 'file', 'gap-cursor', 'input-rule', 'loro', 'placeholder', 'readonly', 'search', 'text-align', 'yjs'],
  }

  const nodeItems: string[] = []
  const markItems: string[] = []
  const otherItems: string[] = []

  // filePaths is an array like ['bold.mdx', 'code.mdx']
  const filePaths = fs.globSync('**/*.mdx?', { cwd: 'src/content/docs/extensions' }).sort()
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
      throw new Error(`Unable to classify extension ${name}. Please update ${import.meta.filename} to fix it`)
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

async function copiedRegistry(logger: AstroIntegrationLogger) {
  const startTime = Date.now()
  const rootDir = path.join(import.meta.dirname, '..')
  const sourceDir = path.join(rootDir, 'registry', 'dist', 'r')
  const targetDir = path.join(rootDir, 'website', 'public', 'r')

  let maxAttempts = 2
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      fs.accessSync(sourceDir)
    } catch {
      if (attempt === maxAttempts) {
        throw new Error(`sourceDir does not exist: ${styleText('blue', sourceDir)}`)
      }

      logger.warn(`sourceDir does not exist: ${styleText('blue', sourceDir)}, trying to build it...`)
      await exec('pnpm', ['-w', 'build:registry'], { timeout: 20_000, throwOnError: true })
      break
    }
  }
  fs.cpSync(sourceDir, targetDir, { recursive: true })
  const endTime = Date.now()
  const duration = endTime - startTime
  logger.info(
    `copied registry from ${styleText('blue', sourceDir)} `
      + `to ${styleText('blue', targetDir)} `
      + `in ${styleText('green', `${duration}ms`)}`,
  )
}

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
      css: ['./src/styles/tailwind.css'],
      dashboardSubpath: '/',
      previewSubpath: '-/',
    }),
    minifyHTML(),
    {
      name: 'copy-registry',
      hooks: {
        'astro:config:done': async ({ logger }) => {
          await copiedRegistry(logger)
        },
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
