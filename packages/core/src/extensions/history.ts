import { history, redo, undo } from '@prosekit/pm/history'

import { union } from '../editor/union'
import { isApple } from '../utils/env'

import { defineCommands } from './command'
import { defineKeymap, type Keymap } from './keymap'
import { definePlugin } from './plugin'

/**
 * Add undo/redo history to the editor.
 */
export function defineHistory() {
  const keymap: Keymap = {
    'Mod-z': undo,
    'Shift-Mod-z': redo,
  }

  if (!isApple) {
    keymap['Mod-y'] = redo
  }

  return union([
    definePlugin(history()),
    defineKeymap(keymap),
    defineCommands({
      undo: () => undo,
      redo: () => redo,
    }),
  ])
}
