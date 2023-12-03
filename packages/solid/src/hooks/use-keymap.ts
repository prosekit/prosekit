import { Priority, defineKeymap, type Keymap } from '@prosekit/core'

import { usePriorityExtension } from './use-priority-extension'

export function useKeymap(
  keymap: Keymap | (() => Keymap),
  options?: { priority?: Priority },
) {
  if (typeof keymap !== 'function') {
    console.warn(
      'useKeymap should accept a function that returns a keymap object',
    )

    return useKeymap(() => keymap)
  }

  return usePriorityExtension(() => defineKeymap(keymap()), options?.priority)
}
