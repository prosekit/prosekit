import {
  skipGen,
  vfs,
} from '@prosekit/dev'

import { replaceClassNames } from './meta/replace-classes'
import { scanRegistry } from './meta/scan'
import { updateRegistryItems } from './meta/update-registry-item-json'
import { updateRegistry } from './meta/update-registry-json'

async function build() {
  if (skipGen()) return

  const items = await scanRegistry()
  updateRegistry(items, 'registry/dist/r/registry.json')
  await updateRegistryItems(items, 'registry/dist/r/', replaceClassNames)
  await vfs.commit()
}

await build()
