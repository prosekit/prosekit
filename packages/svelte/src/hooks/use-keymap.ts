import {
  defineKeymap,
  type Keymap,
} from '@prosekit/core'
import {
  derived,
  type Readable,
} from 'svelte/store'

import {
  useExtension,
  type UseExtensionOptions,
} from './use-extension'

export function useKeymap(
  keymapStore: Readable<Keymap>,
  options?: UseExtensionOptions,
): void {
  const extension = derived(keymapStore, (keymap) => defineKeymap(keymap))
  useExtension(extension, options)
}
