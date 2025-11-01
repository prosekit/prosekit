import { vfs } from '@prosekit/dev'
import { registrySchema } from 'shadcn/schema'

import { serializeItem } from './serialize-item'
import type { ItemAccumulator } from './types'

/**
 * Update the root registry manifest (`registry.json`)
 */
export async function updateRegistry(items: ItemAccumulator[], outputPath: string): Promise<void> {
  const registerJson = {
    $schema: 'https://ui.shadcn.com/schema/registry.json',
    name: 'prosekit',
    homepage: 'https://prosekit.dev',
    items: items.map(serializeItem),
  }

  registrySchema.parse(registerJson)

  await vfs.updateJSON(outputPath, registerJson)
}
