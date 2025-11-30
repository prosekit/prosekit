import { debug } from './debug'
import { genChangeset } from './gen-changeset'
import { genChangesetConfigJson } from './gen-changeset-config-json'
import { genComponents } from './gen-components'
import { genPackageJson } from './gen-package-json'
import { genSizeLimitJson } from './gen-size-limit-json'
import { skipGen } from './skip-gen'
import { vfs } from './vfs'
import { syncWorkspacePackages } from './workspace-sync'

async function gen(): Promise<boolean> {
  debug('gen start')

  if (skipGen()) return false

  await genComponents()
  debug('gen gen-components done')

  await genPackageJson()
  debug('gen gen-package-json done')

  await genChangesetConfigJson()
  debug('gen gen-changeset-config-json done')

  await genSizeLimitJson()
  debug('gen gen-size-limit-json done')

  await genChangeset()
  debug('gen gen-changeset done')

  await syncWorkspacePackages()
  debug('gen sync-workspace-packages done')

  const updated = await vfs.commit()
  debug('gen commit done')

  debug('gen done updated=%s', updated)
  return updated
}

await gen()
