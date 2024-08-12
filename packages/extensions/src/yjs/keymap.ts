import {
  type Keymap,
  type PlainExtension,
  defineKeymap,
  isApple,
} from '@prosekit/core'

import { redo, undo } from './undo-plugin'

const keymap: Keymap = {
  'Mod-z': undo,
  'Shift-Mod-z': redo,
}

if (!isApple) {
  keymap['Mod-y'] = redo
}

export function defineYjsKeymap(): PlainExtension {
  return defineKeymap(keymap)
}
