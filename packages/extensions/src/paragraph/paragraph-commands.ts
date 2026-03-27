import { defineCommands, setBlockType, type Extension } from '@prosekit/core'
import type { Command } from '@prosekit/pm/state'

/**
 * @internal
 */
export type ParagraphCommandsExtension = Extension<{
  Commands: {
    setParagraph: []
  }
}>

/**
 * @internal
 */
export function setParagraph(): Command {
  return setBlockType({ type: 'paragraph' })
}

/**
 * @internal
 */
export function defineParagraphCommands(): ParagraphCommandsExtension {
  return defineCommands({ setParagraph })
}
