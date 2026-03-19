import { defineCommands, getNodeType, type Extension } from '@prosekit/core'
import { Fragment, Slice } from '@prosekit/pm/model'
import type { Command } from '@prosekit/pm/state'

/**
 * @internal
 */
export type PageBreakCommandsExtension = Extension<{
  Commands: {
    insertPageBreak: []
  }
}>

const insertPageBreakCommand: Command = (state, dispatch): boolean => {
  if (!dispatch) return true
  const { schema, tr } = state
  const type = getNodeType(schema, 'pageBreak')
  const node = type.createChecked()
  const pos = tr.selection.anchor
  tr.replaceRange(pos, pos, new Slice(Fragment.from(node), 0, 0))
  dispatch(tr)
  return true
}

/**
 * @internal
 */
export function insertPageBreak(): Command {
  return insertPageBreakCommand
}

/**
 * @internal
 */
export function definePageBreakCommands(): PageBreakCommandsExtension {
  return defineCommands({
    insertPageBreak: insertPageBreak,
  })
}
