import { defineNodeSpec, type Extension } from '@prosekit/core'
import { createListSpec } from 'prosemirror-flat-list'

import type { ListAttrs } from './types'



/**
 * @internal
 */
export type ListSpecExtension = Extension<{
  Nodes: {
    list: ListAttrs
  }
}>

/**
 * @internal
 */
export function defineListSpec(): ListSpecExtension {
  return defineNodeSpec<'list', ListAttrs>({
    ...createListSpec(),
    name: 'list',
  })
}
