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
 */
export function defineText(): TextExtension {
  return defineNodeSpec({
    name: 'text',
    group: 'inline',
  })
}
