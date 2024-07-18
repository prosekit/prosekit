import { defineNodeSpec } from '@prosekit/core'
import { createListSpec } from 'prosemirror-flat-list'

import type { ListAttrs } from './types'

/**
 * @internal
 */
export function defineListSpec() {
  return defineNodeSpec<'list', ListAttrs>({
    ...createListSpec(),
    name: 'list',
  })
}
