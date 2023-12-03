import { Priority, withPriority, type Extension } from '@prosekit/core'
import { derived, type Readable } from 'svelte/store'

import { useExtension } from './use-extension'

export function usePriorityExtension<T extends Extension = Extension>(
  extensionStore: Readable<T | null>,
  priority?: Priority | null,
): void {
  const extensionWithPriorityStore = derived(extensionStore, (extension) => {
    return extension && priority ? withPriority(extension, priority) : extension
  })
  return useExtension(extensionWithPriorityStore)
}
