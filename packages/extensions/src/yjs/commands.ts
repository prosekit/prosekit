import { defineCommands } from '@prosekit/core'

import { redo, undo } from './undo-plugin'

const commands = {
  undo: () => undo,
  redo: () => redo,
} as const

export function defineYjsCommands() {
  return defineCommands(commands)
}
