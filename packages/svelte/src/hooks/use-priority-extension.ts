import { withPriority, type Extension, type Priority } from '@prosekit/core'
import { derived, type Readable } from 'svelte/store'

/**
 * @internal
 */
export function usePriorityExtension<T extends Extension = Extension>(
  extensionStore: Readable<T | null>,
  priority?: Priority | null,
): Readable<T | null> {
  return derived(extensionStore, (extension) => {
    return extension && priority ? withPriority(extension, priority) : extension
  })
}
