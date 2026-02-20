import { defineCommands, getNodeType, type Extension } from '@prosekit/core'
import { Fragment, Slice } from '@prosekit/pm/model'
import type { Command } from '@prosekit/pm/state'

export type HorizontalRuleCommandsExtension = Extension<{
  Commands: {
    insertHorizontalRule: []
  }
}>

const insertHorizontalRuleCommand: Command = (state, dispatch): boolean => {
  if (!dispatch) return true

  const { schema, tr } = state
  const type = getNodeType(schema, 'horizontalRule')
  const node = type.createChecked()
  const pos = tr.selection.anchor
  tr.replaceRange(pos, pos, new Slice(Fragment.from(node), 0, 0))
  dispatch(tr)
  return true
}

/**
 * Returns a command that inserts a horizontal rule at the current selection.
 */
export function insertHorizontalRule(): Command {
  return insertHorizontalRuleCommand
}

export function defineHorizontalRuleCommands(): HorizontalRuleCommandsExtension {
  return defineCommands({ insertHorizontalRule })
}
