import path from 'node:path'

import { vfs } from '@prosekit/dev'
import { registryItemSchema } from 'shadcn/schema'

import { serializeItem } from './serialize-item'
import type { ItemAccumulator } from './types'

/**
 * Update the individual item manifest (`<example-name>.json`)
 */
export async function updateRegistryItems(
  items: ItemAccumulator[],
  outputDir: string,
  updateText: (content: string) => string,
): Promise<void> {
  for (const item of items) {
    const itemJson = serializeItem(item)
    itemJson['$schema'] = 'https://ui.shadcn.com/schema/registry-item.json'
    for (const file of itemJson.files ?? []) {
      const text = await vfs.read(file.path)
      file['content'] = updateText(text)
    }

    registryItemSchema.parse(itemJson)

    const outputPath = path.join(outputDir, `${item.name}.json`)
    await vfs.updateJSON(outputPath, itemJson)
  }
}
