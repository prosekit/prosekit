import { defineKeymap, type Keymap } from '@prosekit/core'

import { useExtension } from './use-extension'

export function useKeymap(keymap: Keymap): VoidFunction {
  const extension = defineKeymap(keymap)
  return useExtension(extension)
}
