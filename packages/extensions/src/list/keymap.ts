import { defineKeymap } from '@prosekit/core'
import { chainCommands, deleteSelection } from '@prosekit/pm/commands'
import {
  createDedentListCommand,
  createIndentListCommand,
  deleteCommand,
  enterCommand,
  joinCollapsedListBackward,
  joinListUp,
  protectCollapsed,
} from 'prosemirror-flat-list'

// This is different from the one exported by prosemirror-flat-list, because
// some commands are moved to `defineBaseKeymap` in `prosekit/core`.
const backspaceCommand = chainCommands(
  protectCollapsed,
  deleteSelection,
  joinListUp,
  joinCollapsedListBackward,
)

const listKeymap = {
  Enter: enterCommand,
  Backspace: backspaceCommand,
  Delete: deleteCommand,
  'Mod-[': createDedentListCommand(),
  'Mod-]': createIndentListCommand(),
}

/**
 * Returns a extension that adds key bindings for list.
 *
 * @public
 */
export function defineListKeymap() {
  return defineKeymap(listKeymap)
}
