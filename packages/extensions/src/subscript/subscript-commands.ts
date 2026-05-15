import { defineCommands, toggleMark, type Extension } from '@prosekit/core'

/**
 * @internal
 */
export type SubscriptCommandsExtension = Extension<{
  Commands: {
    toggleSubscript: []
  }
}>

/**
 * @internal
 */
export function defineSubscriptCommands(): SubscriptCommandsExtension {
  return defineCommands({
    toggleSubscript: () => toggleMark({ type: 'subscript' }),
  })
}
