import { defineCommands, toggleMark, type Extension } from '@prosekit/core'

/**
 * @internal
 */
export type SubSupCommandsExtension = Extension<{
  Commands: {
    toggleSubscript: []
    toggleSuperscript: []
  }
}>

/**
 * @internal
 */
export function defineSubSupCommands(): SubSupCommandsExtension {
  return defineCommands({
    toggleSubscript: () => toggleMark({ type: 'subscript' }),
    toggleSuperscript: () => toggleMark({ type: 'superscript' }),
  })
}
