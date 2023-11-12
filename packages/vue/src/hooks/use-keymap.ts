import { defineKeymap, type Keymap } from '@prosekit/core'
import { computed } from 'vue'

import { useExtension } from './use-extension'

export function useKeymap(keymap: Keymap) {
  const extension = computed(() => defineKeymap(keymap))
  useExtension(extension)
}
