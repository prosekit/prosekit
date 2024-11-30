import {
  withPriority,
  type Extension,
  type Priority,
} from '@prosekit/core'
import {
  computed,
  toValue,
  type MaybeRefOrGetter,
} from 'vue'

/**
 * @internal
 */
export function usePriorityExtension<T extends Extension = Extension>(
  extension: MaybeRefOrGetter<T | null>,
  priority: Priority | null | undefined,
) {
  return computed(() => {
    const ext = toValue(extension)
    return ext && priority ? withPriority(ext, priority) : ext
  })
}
