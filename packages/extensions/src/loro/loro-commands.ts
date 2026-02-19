import { defineCommands, type Extension } from '@prosekit/core'
import type { Command } from '@prosekit/pm/state'
import { redo, undo } from 'loro-prosemirror'

const commands = {
  undo: () => undo as unknown as Command,
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
