import { withPriority, type Extension, type Priority } from '@prosekit/core'
import { useMemo } from 'react'

import { useExtension } from './use-extension'

export function usePriorityExtension<T extends Extension = Extension>(
  extension: T | null,
  priority?: Priority | null,
) {
  const extensionWithPriority = useMemo(() => {
    return extension && priority ? withPriority(extension, priority) : extension
  }, [extension, priority])
  return useExtension(extensionWithPriority)
}
