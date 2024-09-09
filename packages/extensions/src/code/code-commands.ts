import { type Extension, defineCommands, toggleMark } from '@prosekit/core'

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
