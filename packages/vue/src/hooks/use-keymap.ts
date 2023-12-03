import { Priority, defineKeymap, type Keymap } from '@prosekit/core'
import { computed, unref, type Ref } from 'vue'

import { usePriorityExtension } from './use-priority-extension'

export function useKeymap(
  keymap: Ref<Keymap>,
  options?: { priority?: Priority },
) {
  const extension = computed(() => defineKeymap(unref(keymap)))
  usePriorityExtension(extension, options?.priority)
}
