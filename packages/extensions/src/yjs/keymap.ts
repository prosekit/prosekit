import { type Keymap, defineKeymap, isApple } from '@prosekit/core'

import { redo, undo } from './undo-plugin'

const keymap: Keymap = {
  'Mod-z': undo,
  'Shift-Mod-z': redo,
}

if (!isApple) {
  keymap['Mod-y'] = redo
}

export function defineYjsKeymap() {
  return defineKeymap(keymap)
}
