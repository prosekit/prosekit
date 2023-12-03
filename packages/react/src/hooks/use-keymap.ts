import { Priority, defineKeymap, type Keymap } from '@prosekit/core'
import { useMemo } from 'react'

import { usePriorityExtension } from './use-priority-extension'

export function useKeymap(keymap: Keymap, options?: { priority?: Priority }) {
  const extension = useMemo(() => defineKeymap(keymap), [keymap])
  usePriorityExtension(extension, options?.priority)
}
