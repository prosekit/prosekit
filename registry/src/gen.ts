import {
  skipGen,
  vfs,
} from '@prosekit/dev'

import { scanRegistry } from './meta/scan'
import { updateLoader } from './meta/update-loader'
import { updatePackageJSON } from './meta/update-package-json'
import { updateWebsitePages } from './meta/update-website-pages'
import { updateClasses } from './meta/update-classes'

async function gen() {
  if (skipGen()) return

  const items = await scanRegistry()
  await updatePackageJSON(items)
  await updateWebsitePages(items)
  await updateLoader(items)
  await updateClasses()
  await vfs.commit()
}

await gen()
