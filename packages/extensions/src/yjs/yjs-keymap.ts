import {
  defineKeymap,
  isApple,
  type Keymap,
  type PlainExtension,
} from '@prosekit/core'
import {
  redoCommand,
  undoCommand,
} from 'y-prosemirror'

const keymap: Keymap = {
  'Mod-z': undoCommand,
  'Shift-Mod-z': redoCommand,
}

if (!isApple) {
  keymap['Mod-y'] = redoCommand
}

export function defineYjsKeymap(): PlainExtension {
  return defineKeymap(keymap)
}
