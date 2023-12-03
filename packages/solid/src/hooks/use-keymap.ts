import { defineKeymap, type Keymap } from '@prosekit/core'

import { useExtension } from './use-extension'

export function useKeymap(keymap: Keymap | (() => Keymap)) {
  if (typeof keymap !== 'function') {
    console.warn(
      'useKeymap should accept a function that returns a keymap object',
    )

    return useKeymap(() => keymap)
  }

  return useExtension(() => defineKeymap(keymap()))
}
