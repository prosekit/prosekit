import { defineCommands, type Extension } from '@prosekit/core'
import type { Command } from '@prosekit/pm/state'
import { redo, undo } from 'loro-prosemirror'

const commands = {
  undo: (): Command => undo,
  redo: (): Command => redo,
}

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
