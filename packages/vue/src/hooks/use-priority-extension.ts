import { Priority, withPriority, type Extension } from '@prosekit/core'
import { computed, unref, type Ref } from 'vue'

/**
 * @internal
 */
export function usePriorityExtension<T extends Extension = Extension>(
  extension: Ref<T | null>,
  priority?: Priority | null,
) {
  return computed(() => {
    const ext = unref(extension)
    return ext && priority ? withPriority(ext, priority) : ext
  })
}
