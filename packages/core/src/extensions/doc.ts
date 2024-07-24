import type { Attrs } from '@prosekit/pm/model'

import type { Extension } from '../types/extension'

import { defineNodeSpec } from './node-spec'

/**
 * @internal
 */
export type DocExtension = Extension<{ Nodes: { doc: Attrs } }>

/**
 * @public
 */
export function defineDoc(): DocExtension {
  return defineNodeSpec({
    name: 'doc',
    content: 'block+',
    topNode: true,
  })
}
