import type { Attrs } from '@prosekit/pm/model'

import type { Extension } from '../types/extension'

import { defineNodeSpec } from './node-spec'

/**
 * @internal
 */
export type DocExtension = Extension<{ Nodes: { doc: Attrs } }>

/**
 * @public
 *
 * @deprecated Use the following import instead:
 *
 * ```ts
 * import { defineDoc } from 'prosekit/extensions/doc'
 * ```
 */
export function defineDoc(): DocExtension {
  console.warn(
    '[prosekit] The `defineDoc` function from `prosekit/core` is deprecated. Use the following import instead: `import { defineDoc } from "prosekit/extensions/doc"`.',
  )

  return defineNodeSpec({
    name: 'doc',
    content: 'block+',
    topNode: true,
  })
}
