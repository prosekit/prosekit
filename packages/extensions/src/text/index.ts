import { defineNodeSpec, type Extension } from '@prosekit/core'
import type { Attrs } from '@prosekit/pm/model'

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
 */
export function defineText(): TextExtension {
  return defineNodeSpec({
    name: 'text',
    group: 'inline',
  })
}
