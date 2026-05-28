import { defineBasicExtension } from 'prosekit/basic'
import { union } from 'prosekit/core'
import { defineReactNodeView } from '@prosekit/react-binding'

import { defineInputBlock } from '../../sample/define-input-block.ts'

import { InputBlockView } from './input-block-view.tsx'

export function defineExtension() {
  return union(
    defineBasicExtension(),
    defineInputBlock(),
    defineReactNodeView({
      name: 'inputBlock',
      component: InputBlockView,
      stopEvent: (event) => {
        return event.target instanceof HTMLInputElement
      },
      ignoreMutation: (mutation) => {
        return mutation.type === 'selection' || mutation.target instanceof HTMLInputElement
      },
    }),
  )
}
