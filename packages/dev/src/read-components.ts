import { vfs } from './virtual-file-system'

/**
 * Returns a list of components names in kebab case
 * e.g. { 'resizable': [ 'resizable-handle', 'resizable-root' ] }
 */
export async function readComponents(): Promise<GroupedComponents> {
  const pkg = await vfs.getPackageByName('@prosekit/web')
  const filePaths = await vfs.getFilePathsByPackage(pkg)

  const result: GroupedComponents = {}

  for (const filePath of filePaths) {
    const re = /components\/(?<group>.*)\/(?<component>.*)\/setup\.ts$/
    const match = re.exec(filePath)

    if (!match) {
      continue
    }

    const { group, component } = match.groups as Record<string, string>
    const components = (result[group] ||= [])
    components.push(component)
  }

  return result
}

export type GroupedComponents = { [group: string]: string[] }
