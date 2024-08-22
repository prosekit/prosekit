import {
  type Keymap,
  type PlainExtension,
  defineKeymap,
  isApple,
} from '@prosekit/core'
import { redo, undo } from 'loro-prosemirror'

const keymap: Keymap = {
  'Mod-z': undo,
  'Shift-Mod-z': redo,
}

if (!isApple) {
  keymap['Mod-y'] = redo
}

export function defineLoroKeymap(): PlainExtension {
  return defineKeymap(keymap)
}
