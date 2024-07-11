import {
  defineCommands,
  insertNode,
  setBlockType,
  toggleNode,
} from '@prosekit/core'

import type { HeadingAttrs } from './types'

export function defineHeadingCommands() {
  return defineCommands({
    setHeading: (attrs?: HeadingAttrs) => {
      return setBlockType({ type: 'heading', attrs })
    },
    insertHeading: (attrs?: HeadingAttrs) => {
      return insertNode({ type: 'heading', attrs })
    },
    toggleHeading: (attrs?: HeadingAttrs) => {
      return toggleNode({ type: 'heading', attrs })
    },
  })
}
