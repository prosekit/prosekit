import { skipGen, vfs } from '@prosekit/dev'

import { debug } from './meta/debug'
import { linkSamples } from './meta/link-samples'
import { scanRegistry } from './meta/scan'
import { checkStoryMeta } from './meta/story-meta'
import { updateClasses } from './meta/update-classes'
import { updateLoader } from './meta/update-loader'
import { updatePackageJSON } from './meta/update-package-json'
import { updateExamples } from './meta/update-registry-json'
import { updateWebsitePages } from './meta/update-website-pages'

async function gen() {
  if (skipGen()) return

  debug('registry start')
  const items = await scanRegistry()
  debug('registry scan done')

  checkStoryMeta(items)

  await linkSamples(items)
  debug('registry link-samples done')

  await updatePackageJSON(items)
  debug('registry update-package-json done')

  updateWebsitePages(items)

  updateLoader(items)

  updateClasses()

  updateExamples(items)

  const updated = await vfs.commit()
  debug('registry commit done')

  debug('registry done updated=%s', updated)
}

await gen()
