import {
  skipGen,
  vfs,
} from '@prosekit/dev'

import { scanRegistry } from './meta/scan'
import { updateClasses } from './meta/update-classes'
import { updateLoader } from './meta/update-loader'
import { updatePackageJSON } from './meta/update-package-json'
import { updateRegistry } from './meta/update-registry-json'
import { updateStoryMeta } from './meta/update-story-meta'
import { updateWebsitePages } from './meta/update-website-pages'
  if (skipGen()) return

  const items = await scanRegistry()
  await updatePackageJSON(items)
  await updateWebsitePages(items)
  await updateLoader(items)
  await updateClasses()
  await updateRegistry(items, 'registry/src/registry.gen.json')
  await updateStoryMeta(items)
  await vfs.commit()
}

await gen()
