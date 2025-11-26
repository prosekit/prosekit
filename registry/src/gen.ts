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
  if (skipGen()) return

  debug('registry start')
  const items = await scanRegistry()
  debug('registry scan done')

  await linkSamples(items)
  debug('registry link-samples done')

  await updatePackageJSON(items)
  debug('registry update-package-json done')

  updateWebsitePages(items)

  updateLoader(items)

  updateClasses()

  updateRegistry(items, 'registry/src/registry.gen.json')

  await updateStoryMeta(items)
  debug('registry update-story-meta done')

  const updated = await vfs.commit()
  debug('registry commit done')

  debug('registry done updated=%s', updated)
}

await gen()
