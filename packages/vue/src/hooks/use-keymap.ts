import { type Keymap, addKeymap } from '@prosekit/core'
import { computed } from 'vue'

import { useExtension } from './use-extension'

export function useKeymap({ keymap }: { keymap: Keymap }) {
  const extension = computed(() => addKeymap(keymap))
  useExtension({ extension: extension.value })
}
