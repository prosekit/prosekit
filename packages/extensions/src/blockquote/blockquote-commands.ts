import { defineCommands, insertNode, toggleWrap, wrap, type Extension } from '@prosekit/core'

export type BlockquoteCommandsExtension = Extension<{
  Commands: {
    setBlockquote: []
    insertBlockquote: []
    toggleBlockquote: []
  }
}>

/**
 * @internal
 */
export function defineBlockquoteCommands(): BlockquoteCommandsExtension {
  return defineCommands({
    setBlockquote: () => {
      return wrap({ type: 'blockquote' })
    },
    insertBlockquote: () => {
      return insertNode({ type: 'blockquote' })
    },
    toggleBlockquote: () => {
      return toggleWrap({ type: 'blockquote' })
    },
  })
}
