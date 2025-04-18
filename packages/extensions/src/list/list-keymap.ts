import {
  defineKeymap,
  type PlainExtension,
} from '@prosekit/core'
import {
  chainCommands,
  deleteSelection,
} from '@prosekit/pm/commands'
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

const dedentListCommand = createDedentListCommand()
const indentListCommand = createIndentListCommand()

const listKeymap = {
  'Enter': enterCommand,
  'Backspace': backspaceCommand,
  'Delete': deleteCommand,
  'Mod-]': indentListCommand,
  'Mod-[': dedentListCommand,
  'Tab': indentListCommand,
  'Shift-Tab': dedentListCommand,
}

/**
 * Returns a extension that adds key bindings for list.
 *
 * @internal
 */
export function defineListKeymap(): PlainExtension {
  return defineKeymap(listKeymap)
}
