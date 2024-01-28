import { Priority, withPriority, type Extension } from '@prosekit/core'

/**
 * @internal
 */
export function usePriorityExtension<T extends Extension = Extension>(
  extension: () => T | null,
  priority?: Priority | null,
): () => T | null {
  return () => {
    const ext = extension()
    return ext && priority ? withPriority(ext, priority) : ext
  }
}
