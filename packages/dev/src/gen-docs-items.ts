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

  const packages = await vfs.getPublicPackages()
  for (const pkg of packages) {
    const exports = (pkg.packageJson as any).exports ?? {}
    for (const entryPoint of Object.keys(exports)) {
      if (entryPoint !== '.' && hideInTypedoc(pkg.packageJson.name)) {
        continue
      }
      if (entryPoint.endsWith('.css')) {
        continue
      }

      const importPath = path.normalize(
        path.join(pkg.packageJson.name, entryPoint),
      )

      let text: string

      if (importPath.startsWith('@prosekit/')) {
        text = importPath.slice('@prosekit/'.length)
      } else if (importPath === 'prosekit') {
        text = importPath
      } else {
        throw new Error(`Unexpected importPath ${importPath}`)
      }

      // Remove subpath entries
      if (text.includes('/')) continue

      items.push({
        text,
        link: `/references/${importPath}`,
      })
    }
  }

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
