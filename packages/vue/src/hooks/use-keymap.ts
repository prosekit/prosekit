import { type Keymap, defineKeymap } from '@prosekit/core'
import { computed } from 'vue'

import { useExtension } from './use-extension'

export function useKeymap({ keymap }: { keymap: Keymap }) {
  const extension = computed(() => defineKeymap(keymap))
  useExtension({ extension: extension.value })
}
