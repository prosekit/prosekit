import {
  defineKeymap,
  isApple,
  type Keymap,
  type PlainExtension,
} from '@prosekit/core'

import {
  redo,
  undo,
} from './yjs-undo-plugin'

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
