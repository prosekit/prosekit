import {
  skipGen,
  vfs,
} from '@prosekit/dev'

import { scanRegistry } from './meta/scan'
import { updatePackageJSON } from './meta/update-package-json'
import { updateWebsitePages } from './meta/update-website-pages'

async function gen() {
  if (skipGen()) return

  const items = await scanRegistry()
  await updatePackageJSON(items)
  await updateWebsitePages(items)
  await vfs.commit()
}

await gen()
