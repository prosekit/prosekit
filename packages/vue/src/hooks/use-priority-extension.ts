import { Priority, withPriority, type Extension } from '@prosekit/core'
import { computed, unref, type Ref } from 'vue'

import { useExtension } from './use-extension'

export function usePriorityExtension<T extends Extension = Extension>(
  extension: Ref<T | null>,
  priority?: Priority | null,
) {
  const extensionWithPriority = computed(() => {
    const ext = unref(extension)
    return ext && priority ? withPriority(ext, priority) : ext
  })
  return useExtension(extensionWithPriority)
}
