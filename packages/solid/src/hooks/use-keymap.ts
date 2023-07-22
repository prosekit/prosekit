import { addKeymap, type Keymap } from '@prosekit/core'

import { useExtension } from './use-extension'

export function useKeymap({ keymap }: { keymap: Keymap }) {
  const extension = addKeymap(keymap)
  useExtension({ extension })
}
