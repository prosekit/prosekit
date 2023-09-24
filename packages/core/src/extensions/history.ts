import { history, redo, undo } from '@prosekit/pm/history'

import { defineExtension } from '../editor/type-utils'
import { isMac } from '../utils/env'

import { addCommands } from './command'
import { addKeymap, type Keymap } from './keymap'
import { addPlugin } from './plugin'

/**
 * Add undo/redo history to the editor.
 */
export function addHistory() {
  const keymap: Keymap = {
    'Mod-z': undo,
    'Shift-Mod-z': redo,
  }

  if (!isMac) {
    keymap['Mod-y'] = redo
  }

  return defineExtension([
    addPlugin(history()),
    addKeymap(keymap),
    addCommands({
      undo: () => undo,
      redo: () => redo,
    }),
  ])
}
