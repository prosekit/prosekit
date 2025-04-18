import {
  defineKeymap,
  type Keymap,
} from '@prosekit/core'
import { useMemo } from 'react'

import {
  useExtension,
  type UseExtensionOptions,
} from './use-extension'

export function useKeymap(keymap: Keymap, options?: UseExtensionOptions): void {
  const extension = useMemo(() => defineKeymap(keymap), [keymap])
  useExtension(extension, options)
}
