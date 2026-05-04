import { DefaultMap } from '@ocavue/utils'

import { getPackageJsonExports } from './get-package-json-exports'
import { vfs } from './vfs'
import { getPackageByName } from './workspace-packages'

const REF_OUTPUT = 'website/src/sidebar/references.gen.json'

type SidebarItem = string | {
  label: string
  collapsed: boolean
  items: string[]
}

const FLAT_GROUPS = ['core', 'basic']
const EXCLUDED_GROUPS = new Set(['lit'])

export async function genReferencesSidebarJson(): Promise<void> {
  const umbrellaPackage = await getPackageByName('prosekit')
  const exports = getPackageJsonExports(umbrellaPackage) ?? {}

  const groups = new DefaultMap<string, string[]>(() => [])
  for (const entry of Object.keys(exports)) {
    if (entry === '.') continue
    const label = entry.replace(/^\.\//, '')
    const first = label.split('/')[0]
    if (EXCLUDED_GROUPS.has(first)) continue
    const slug = `references/${label.replaceAll('.', '')}`
    groups.get(first).push(slug)
  }

  for (const items of groups.values()) {
    items.sort((a, b) => a.localeCompare(b))
  }

  const result: SidebarItem[] = []

  for (const name of FLAT_GROUPS) {
    const entries = groups.get(name)
    if (entries) {
      result.push(...entries)
      groups.delete(name)
    }
  }

  for (const key of [...groups.keys()].sort()) {
    result.push({
      label: key,
      collapsed: true,
      items: groups.get(key),
    })
  }

  vfs.updateJSON(REF_OUTPUT, result)
}
