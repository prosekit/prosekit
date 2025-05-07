import {
  withPriority,
  type Extension,
  type Priority,
} from '@prosekit/core'
import { useMemo } from 'preact/hooks'

/**
 * @internal
 */
export function usePriorityExtension<T extends Extension = Extension>(
  extension: T | null,
  priority?: Priority | null,
): T | null {
  return useMemo(() => {
    return extension && priority ? withPriority(extension, priority) : extension
  }, [extension, priority])
}
