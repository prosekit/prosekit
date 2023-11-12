import { defineKeymap, type Keymap } from '@prosekit/core'
import { writable, type Readable } from 'svelte/store'

import { useExtension } from './use-extension'

export function useKeymap(keymapStore: Readable<Keymap>) {
  return keymapStore.subscribe((keymap) => {
    const extension = defineKeymap(keymap)
    const extensionStore = writable(extension)
    return useExtension(extensionStore)
  })
}
