import { defineKeymap, type Keymap } from '@prosekit/core'

import { useExtension } from './use-extension'

export function useKeymap(keymap: Keymap) {
  const extension = defineKeymap(keymap)
  useExtension(extension)
}
