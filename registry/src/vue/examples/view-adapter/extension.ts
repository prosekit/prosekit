import { defineBasicExtension } from 'prosekit/basic'
import { union } from 'prosekit/core'
import {
  defineVueNodeView,
  type VueNodeViewComponent,
} from 'prosekit/vue'

import { defineAtomBlock } from '../../sample/define-atom-block'

import AtomBlockView from './atom-block-view.vue'

export function defineExtension() {
  return union(
    defineBasicExtension(),
    defineAtomBlock(),
    defineVueNodeView({
      name: 'atomBlock',
      component: AtomBlockView as VueNodeViewComponent,
    }),
  )
}

export type EditorExtension = ReturnType<typeof defineExtension>
