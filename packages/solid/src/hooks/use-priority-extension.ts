import { Priority, withPriority, type Extension } from '@prosekit/core'

import { useExtension } from './use-extension'

export function usePriorityExtension<T extends Extension = Extension>(
  extension: () => T | null,
  priority?: Priority | null,
): void {
  const extensionWithPriority = () => {
    const ext = extension()
    return ext && priority ? withPriority(ext, priority) : ext
  }
  return useExtension(extensionWithPriority)
}
