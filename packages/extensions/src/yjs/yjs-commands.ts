import {
  defineCommands,
  type Extension,
} from '@prosekit/core'
import {
  redoCommand,
  undoCommand,
} from 'y-prosemirror'

const commands = {
  undo: () => undoCommand,
  redo: () => redoCommand,
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
