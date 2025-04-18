import {
  defineKeymap,
  type Keymap,
} from '@prosekit/core'

import {
  useExtension,
  type UseExtensionOptions,
} from './use-extension'

export function useKeymap(keymap: () => Keymap, options?: UseExtensionOptions): void {
  const extension = () => defineKeymap(keymap())
  return useExtension(extension, options)
}
