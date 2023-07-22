import { type Keymap, addKeymap } from '@prosekit/core'
import { useMemo } from 'preact/hooks'

import { useExtension } from './use-extension'

export function useKeymap({ keymap }: { keymap: Keymap }) {
  const extension = useMemo(() => addKeymap(keymap), [keymap])
  useExtension({ extension })
}
