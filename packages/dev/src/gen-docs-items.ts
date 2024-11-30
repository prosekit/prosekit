import { writeFile } from 'node:fs/promises'
import path, { basename } from 'node:path'
import { fileURLToPath } from 'node:url'

import { uniq } from 'lodash-es'

import { readExampleMeta } from './example-meta.js'
import { hideInTypedoc } from './hide-in-typedoc.js'
import { vfs } from './virtual-file-system.js'

export async function genDocsItems() {
  await genReferenceItems()
  await genExampleItems()
}

async function genReferenceItems() {
  const rootDir = await vfs.getRootDir()
  const sidebarFilePath = path.join(
    rootDir,
    'website',
    '.vitepress',
    'sidebar-reference-items.ts',
  )

  const items: SidebarItem[] = []

  const packages = await vfs.getScopedPublicPackages()
  for (const pkg of packages) {
    const exports = (pkg.packageJson as any).exports ?? {}
    for (const entryPoint of Object.keys(exports).sort()) {
      if (entryPoint !== '.' && hideInTypedoc(pkg.packageJson.name)) {
        continue
      }

      if (entryPoint.includes('/internal/')) {
        continue
      }

      if (entryPoint.endsWith('.css')) {
        continue
      }

      const importPath = path
        .normalize(path.join(pkg.packageJson.name, entryPoint))
        .replace(/^@prosekit\//, '')

      const markdownLink = `/references/${importPath}`

      const parts = importPath.split('/')
      let currentItems = items
      let currentItem: SidebarItem | undefined

      for (const part of parts) {
        currentItem = currentItems.find((item) => item.text === part) ?? {
          text: part,
          items: [],
          collapsed: true,
        }

        if (!currentItems.includes(currentItem)) {
          currentItems.push(currentItem)
        }

        currentItems = currentItem.items ?? []
      }

      if (currentItem) {
        currentItem.link = markdownLink
      }
    }
  }

  normalizeItems(items)

  const content = `// This file is generated from ${currentFilename}\n\n`
    + `// dprint-ignore\n`
    + `export const referenceItems = `
    + JSON.stringify(items, null, 2)
    + `\n`
  await writeFile(sidebarFilePath, content)
}

async function genExampleItems() {
  const rootDir = await vfs.getRootDir()
  const sidebarFilePath = path.join(
    rootDir,
    'website',
    '.vitepress',
    'sidebar-example-items.ts',
  )

  const meta = await readExampleMeta()
  const stories = uniq(meta.examples.map((example) => example.story)).sort()
  const items: SidebarItem[] = stories.map((story) => ({
    text: story,
    link: '/examples/' + story,
  }))

  normalizeItems(items)

  const content = `// This file is generated from ${currentFilename}\n\n`
    + `// dprint-ignore\n`
    + `export const exampleItems = `
    + JSON.stringify(items, null, 2)
    + `\n`
  await writeFile(sidebarFilePath, content)
}

export interface SidebarItem {
  /**
   * The text label of the item.
   */
  text?: string

  /**
   * The link of the item.
   */
  link?: string

  /**
   * The children of the item.
   */
  items?: SidebarItem[]

  /**
   * If not specified, group is not collapsible.
   *
   * If `true`, group is collapsible and collapsed by default
   *
   * If `false`, group is collapsible but expanded by default
   */
  collapsed?: boolean
}

function normalizeItems(items?: SidebarItem[]) {
  items?.map(normalizeItem)
}

function normalizeItem(item: SidebarItem) {
  if (!(item.items && item.items.length > 0)) {
    delete item.items
    delete item.collapsed
  }
  normalizeItems(item.items)
}

const currentFilename = basename(fileURLToPath(import.meta.url))
