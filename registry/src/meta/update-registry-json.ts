import { vfs } from '@prosekit/dev'
import { registrySchema } from 'shadcn-schema'

import { serializeExamplesJson, serializeItem } from './serialize-item'
import type { ItemAccumulator } from './types'

const REGISTRY_DIST_PATH = 'registry/dist/r/registry.json'
const EXAMPLES_GEN_PATH = 'registry/src/examples.gen.json'

/**
 * Update the root registry manifest (`registry.json`)
 */
export function updateRegistry(items: ItemAccumulator[]): void {
  const registerJson = {
    $schema: 'https://ui.shadcn.com/schema/registry.json',
    name: 'prosekit',
    homepage: 'https://prosekit.dev',
    items: items.map(serializeItem),
  }

  registrySchema.parse(registerJson)

  vfs.updateJSON(REGISTRY_DIST_PATH, registerJson)
}

export function updateExamples(items: ItemAccumulator[]): void {
  const examplesJson = serializeExamplesJson(items)
  vfs.updateJSON(EXAMPLES_GEN_PATH, examplesJson)
}
