import { defineKeymap, type Keymap } from '@prosekit/core'
import { computed ,  type Ref, unref } from 'vue'

import { useExtension } from './use-extension'

export function useKeymap(keymap: Ref<Keymap>) {
  const extension = computed(() => defineKeymap(unref(keymap)))
  useExtension(extension)
}
