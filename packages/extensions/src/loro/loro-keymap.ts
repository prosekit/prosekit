import { defineKeymap, isApple, type Keymap, type PlainExtension } from '@prosekit/core'
import { redo, undo } from 'loro-prosemirror'

const keymap: Keymap = {
  'Mod-z': undo as unknown as Keymap[string],
  'Mod-Z': redo as unknown as Keymap[string],
}

if (!isApple) {
  keymap['Mod-y'] = redo as unknown as Keymap[string]
}

export function defineLoroKeymap(): PlainExtension {
  return defineKeymap(keymap)
}
