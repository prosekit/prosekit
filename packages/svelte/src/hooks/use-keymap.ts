import { Priority, defineKeymap, type Keymap } from '@prosekit/core'
import { derived, type Readable } from 'svelte/store'

import { usePriorityExtension } from './use-priority-extension'

export function useKeymap(
  keymapStore: Readable<Keymap>,
  options?: { priority?: Priority },
): void {
  const extension = derived(keymapStore, (keymap) => defineKeymap(keymap))
  usePriorityExtension(extension, options?.priority)
}
