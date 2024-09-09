import { defineCommands, toggleMark, type Extension } from '@prosekit/core'

/**
 * @internal
 */
export type ItalicCommandsExtension = Extension<{
  Commands: {
    toggleItalic: []
  }
}>

/**
 * @internal
 */
export function defineItalicCommands(): ItalicCommandsExtension {
  return defineCommands({
    toggleItalic: () => toggleMark({ type: 'italic' }),
  })
}
