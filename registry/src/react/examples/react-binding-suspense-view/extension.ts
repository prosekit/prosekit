import { defineBasicExtension } from 'prosekit/basic'
import { union } from 'prosekit/core'
import { defineReactNodeView } from '@prosekit/react-binding'

import { defineAsyncBlock } from '../../sample/define-async-block.ts'

import { AsyncBlockView } from './async-block-view.tsx'

export function defineExtension() {
  return union(
    defineBasicExtension(),
    defineAsyncBlock(),
    defineReactNodeView({
      name: 'asyncBlock',
      component: AsyncBlockView,
      stopEvent: (event) => {
        return event.target instanceof HTMLElement && !!event.target.closest('[data-async-block-view]')
      },
      ignoreMutation: (mutation) => {
        return mutation.type === 'selection' || !!mutation.target.parentElement?.closest('[data-async-block-view]')
      },
    }),
  )
}
