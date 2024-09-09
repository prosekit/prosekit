import { type Extension, defineCommands, toggleMark } from '@prosekit/core'

/**
 * @internal
 */
export type BoldCommandsExtension = Extension<{
  Commands: {
    toggleBold: []
  }
}>

/**
 * @internal
 */
export function defineBoldCommands(): BoldCommandsExtension {
  return defineCommands({
    toggleBold: () => toggleMark({ type: 'bold' }),
  })
}
