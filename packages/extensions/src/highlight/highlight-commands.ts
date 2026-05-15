import { defineCommands, toggleMark, type Extension } from '@prosekit/core'

/**
 * @internal
 */
export type HighlightCommandsExtension = Extension<{
  Commands: {
    toggleHighlight: []
  }
}>

/**
 * @internal
 */
export function defineHighlightCommands(): HighlightCommandsExtension {
  return defineCommands({
    toggleHighlight: () => toggleMark({ type: 'highlight' }),
  })
}
