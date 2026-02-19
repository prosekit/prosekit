import { defineCommands, type Extension } from '@prosekit/core'
import type { Command } from '@prosekit/pm/state'
import { redo, undo } from 'loro-prosemirror'

// TODO: just for debug
const undoCommand: Command = undo

const commands = {
  undo: () => undoCommand,
  redo: () => redo as unknown as Command,
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
