import { vfs } from './vfs'
import { getPrivatePackages } from './workspace-packages'

export async function genChangesetConfigJson(): Promise<void> {
  const privatePackages = await getPrivatePackages()

  const ignoreNames: string[] = privatePackages
    .map((pkg) => pkg.packageJson.name)
    .sort()

  const json = await vfs.readJSON<{ ignore?: string[] }>('.changeset/config.json')
  json.ignore = ignoreNames
  vfs.updateJSON('.changeset/config.json', json)
}
