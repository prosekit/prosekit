import { defineKeymap, isApple, type Keymap, type PlainExtension } from '@prosekit/core'
import { redo, undo } from 'loro-prosemirror'

const keymap: Keymap = {
  'Mod-z': undo,
  'Mod-Z': redo,
}

if (!isApple) {
  keymap['Mod-y'] = redo
}

export function defineLoroKeymap(): PlainExtension {
  return defineKeymap(keymap)
}
