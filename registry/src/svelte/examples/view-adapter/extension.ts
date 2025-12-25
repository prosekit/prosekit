import { defineBasicExtension } from 'prosekit/basic'
import { union } from 'prosekit/core'
import { defineSvelteNodeView } from 'prosekit/svelte'

import { defineAtomBlock } from '../../sample/define-atom-block'

import AtomBlockView from './atom-block-view.svelte'

export function defineExtension() {
  return union(
    defineBasicExtension(),
    defineAtomBlock(),
    defineSvelteNodeView({
      name: 'atomBlock',
      component: AtomBlockView,
    }),
  )
}

export type EditorExtension = ReturnType<typeof defineExtension>
