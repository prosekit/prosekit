import { skipGen, vfs } from '@prosekit/dev'

import { updateClasses } from './meta/update-classes'

async function gen() {
  if (skipGen()) return

  updateClasses()
  await vfs.commit()
}

await gen()
