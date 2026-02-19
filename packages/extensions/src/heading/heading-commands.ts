import { defineCommands, insertNode, setBlockType, toggleNode, type Extension } from '@prosekit/core'

import type { HeadingAttrs } from './heading-types.ts'

/**
 * @internal
 */
export type HeadingCommandsExtension = Extension<{
  Commands: {
    setHeading: [attrs?: HeadingAttrs | undefined]
    insertHeading: [attrs?: HeadingAttrs | undefined]
    toggleHeading: [attrs?: HeadingAttrs | undefined]
  }
}>

/**
 * @internal
 */
export function defineHeadingCommands(): HeadingCommandsExtension {
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
