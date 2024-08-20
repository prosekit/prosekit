import { defineCommands, type Extension } from '@prosekit/core'
import { redo, undo } from 'loro-prosemirror'

const commands = {
  undo: () => undo,
  redo: () => redo,
} as const

/**
 * @internal
 */
export type LoroCommandsExtension = Extension<{
  Commands: {
    undo: []
    redo: []
  }
}>

export function defineLoroCommands(): LoroCommandsExtension {
  return defineCommands(commands)
}
