import {
  skipGen,
  vfs,
} from '@prosekit/dev'

import { updateClasses } from './meta/update-classes'

async function gen() {
  if (skipGen()) return

  await updateClasses()
  await vfs.commit()
}

await gen()
