import type { Attrs } from '@prosekit/pm/model'

import type { Extension } from '../types/extension'

import { defineNodeSpec } from './node-spec'

/**
 * @internal
 */
export type TextExtension = Extension<{
  Nodes: {
    text: Attrs
  }
}>

/**
 * @public
 *
 * @deprecated Use the following import instead:
 *
 * ```ts
 * import { defineText } from 'prosekit/extensions/text'
 * ```
 */
export function defineText(): TextExtension {
  console.warn(
    '[prosekit] The `defineText` function from `prosekit/core` is deprecated. Use the following import instead: `import { defineText } from "prosekit/extensions/text"`.',
  )

  return defineNodeSpec({
    name: 'text',
    group: 'inline',
  })
}
