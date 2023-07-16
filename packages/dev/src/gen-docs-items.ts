import { writeFile } from 'node:fs/promises'
import path from 'node:path'

import { hideInTypedoc } from './hide-in-typedoc.js'
import { vfs } from './virtual-file-system.js'

export async function genDocsItems() {
  const rootDir = await vfs.getRootDir()
  const sidebarFilePath = path.join(
    rootDir,
    'website',
    '.vitepress',
    'docs-sidebar.ts',
  )

  const items: SidebarItem[] = []

  const packages = await vfs.getScopedPublicPackages()
  for (const pkg of packages) {
    const exports = (pkg.packageJson as any).exports ?? {}
    for (const entryPoint of Object.keys(exports).sort()) {
      if (entryPoint !== '.' && hideInTypedoc(pkg.packageJson.name)) {
        continue
      }
      if (entryPoint.endsWith('.css')) {
        continue
      }

      const importPath = path
        .normalize(path.join(pkg.packageJson.name, entryPoint))
        .replace(/^@prosekit\//, '')

      const markdownLink = `/references/prosekit_${importPath.replaceAll(
        /[/-]/g,
        '_',
      )}`

      const parts = importPath.split('/')
      let currentItems = items
      let currentItem: SidebarItem | null = null

      let depth = 0
      for (const part of parts) {
        depth += 1

        currentItem = currentItems.find((item) => item.text === part) ?? {
          text: part,
          items: [],
          collapsed: depth >= 2,
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

  const content =
    `// prettier-ignore\n` +
    `export const docsItems = ` +
    JSON.stringify(items, null, 2) +
    `\n`
  await writeFile(sidebarFilePath, content)
}

export type SidebarItem = {
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
