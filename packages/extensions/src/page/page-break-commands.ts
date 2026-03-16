import { defineCommands, insertNode, type Extension } from '@prosekit/core'
import type { Command } from '@prosekit/pm/state'

/**
 * @internal
 */
export type PageBreakCommandsExtension = Extension<{
  Commands: {
    insertPageBreak: []
  }
}>

/**
 * @internal
 */
export function insertPageBreak(): Command {
  return insertNode({ type: 'pageBreak' })
}

/**
 * @internal
 */
export function definePageBreakCommands(): PageBreakCommandsExtension {
  return defineCommands({
    insertPageBreak: insertPageBreak,
  })
}
