import { defineKeymap, type Keymap, type PlainExtension } from '@prosekit/core'
import { chainCommands, deleteSelection } from '@prosekit/pm/commands'
import {
  createDedentListCommand,
  createIndentListCommand,
  createSplitListCommand,
  deleteCommand,
  joinCollapsedListBackward,
  joinListUp,
  protectCollapsed,
} from 'prosemirror-flat-list'

import type { ListOptions } from './list-types.ts'

// This is different from the one exported by prosemirror-flat-list, because
// some commands are moved to `defineBaseKeymap` in `prosekit/core`.
const backspaceCommand = chainCommands(
  protectCollapsed,
  deleteSelection,
  joinListUp,
  joinCollapsedListBackward,
)

/**
 * Returns the key bindings for list.
 *
 * @internal
 */
export function createListKeymap(options?: ListOptions): Keymap {
  const indentListCommand = createIndentListCommand(options)
  const dedentListCommand = createDedentListCommand(options)
  const enterCommand = chainCommands(protectCollapsed, createSplitListCommand(options))

  return {
    'Enter': enterCommand,
    'Backspace': backspaceCommand,
    'Delete': deleteCommand,
    'Mod-]': indentListCommand,
    'Mod-[': dedentListCommand,
    'Tab': indentListCommand,
    'Shift-Tab': dedentListCommand,
  }
}

/**
 * Returns a extension that adds key bindings for list.
 *
 * @internal
 */
export function defineListKeymap(options?: ListOptions): PlainExtension {
  return defineKeymap(createListKeymap(options))
}
