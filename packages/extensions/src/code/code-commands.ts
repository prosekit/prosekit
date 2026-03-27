import { defineCommands, toggleMark, type Extension } from '@prosekit/core'

/**
 * @internal
 */
export type CodeCommandsExtension = Extension<{
  Commands: {
    toggleCode: []
  }
}>

/**
 * @internal
 */
export function defineCodeCommands(): CodeCommandsExtension {
  return defineCommands({
    toggleCode: () => toggleMark({ type: 'code' }),
  })
}
