import { defineBasicExtension } from 'prosekit/basic'
import { union } from 'prosekit/core'
import { defineVueNodeView } from 'prosekit/vue'

import { defineAtomBlock } from '../../sample/define-atom-block'

import AtomBlockView from './atom-block-view.vue'

export function defineExtension() {
  return union(
    defineBasicExtension(),
    defineAtomBlock(),
    defineVueNodeView({
      name: 'atomBlock',
      component: AtomBlockView,
    }),
  )
}

export type EditorExtension = ReturnType<typeof defineExtension>
