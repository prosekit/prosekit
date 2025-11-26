import {
  skipGen,
  vfs,
} from '@prosekit/dev'

import { debug } from './meta/debug'
import { linkSamples } from './meta/link-samples'
import { scanRegistry } from './meta/scan'
import { updateClasses } from './meta/update-classes'
import { updateLoader } from './meta/update-loader'
import { updatePackageJSON } from './meta/update-package-json'
import { updateRegistry } from './meta/update-registry-json'
import { updateStoryMeta } from './meta/update-story-meta'
import { updateWebsitePages } from './meta/update-website-pages'

async function gen() {
  if (skipGen()) {
    debug('registry:skip')
    return
  }

  const items = await scanRegistry()
  debug('registry:items=%d', items.length)

  await linkSamples(items)

  await updatePackageJSON(items)

  updateWebsitePages(items)

  updateLoader(items)

  updateClasses()

  updateRegistry(items, 'registry/src/registry.gen.json')

  await updateStoryMeta(items)

  const updated = await vfs.commit()
  debug('registry:done updated=%s', updated)
}

await gen()
