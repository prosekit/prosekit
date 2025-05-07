import {
  defineCommands,
  insertNode,
  type Extension,
} from '@prosekit/core'
import type { Command } from '@prosekit/pm/state'

/**
 * @internal
 */
export type HardBreakCommandsExtension = Extension<{
  Commands: {
    insertHardBreak: []
  }
}>

/**
 * @internal
 */
export function insertHardBreak(): Command {
  return insertNode({ type: 'hardBreak' })
}

/**
 * @internal
 */
export function defineHardBreakCommands(): HardBreakCommandsExtension {
  return defineCommands({
    insertHardBreak: insertHardBreak,
  })
}
