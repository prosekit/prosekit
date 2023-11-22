import { defineKeymap, type Keymap } from '@prosekit/core'
import { derived, type Readable } from 'svelte/store'

import { useExtension } from './use-extension'

export function useKeymap(keymapStore: Readable<Keymap>): void {
  const extension = derived(keymapStore, (keymap) => defineKeymap(keymap))
  useExtension(extension)
}
