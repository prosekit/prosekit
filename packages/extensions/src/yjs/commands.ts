import { defineCommands, type Extension } from '@prosekit/core'

import { redo, undo } from './undo-plugin'

const commands = {
  undo: () => undo,
  redo: () => redo,
} as const

/**
 * @internal
 */
export type YjsCommandsExtension = Extension<{
  Commands: {
    undo: []
    redo: []
  }
}>

export function defineYjsCommands(): YjsCommandsExtension {
  return defineCommands(commands)
}
