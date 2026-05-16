import { defineCommands, toggleMark, type Extension } from '@prosekit/core'

/**
 * @internal
 */
export type SuperscriptCommandsExtension = Extension<{
  Commands: {
    toggleSuperscript: []
  }
}>

/**
 * @internal
 */
export function defineSuperscriptCommands(): SuperscriptCommandsExtension {
  return defineCommands({
    toggleSuperscript: () => toggleMark({ type: 'superscript' }),
  })
}
