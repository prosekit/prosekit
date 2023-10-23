import type { Extension } from '@prosekit/core'

import { defineReactExtension } from './react-extension'
import type { ReactNodeViewOptions } from './types'

export function defineReactNodeView(options: ReactNodeViewOptions): Extension {
  return defineReactExtension({
    type: 'react-node-view',
    payload: options,
  })
}
