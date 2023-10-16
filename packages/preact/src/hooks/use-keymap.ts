import { type Keymap, defineKeymap } from '@prosekit/core'
import { useMemo } from 'preact/hooks'

import { useExtension } from './use-extension'

export function useKeymap({ keymap }: { keymap: Keymap }) {
  const extension = useMemo(() => defineKeymap(keymap), [keymap])
  useExtension({ extension })
}
