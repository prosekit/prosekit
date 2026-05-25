import { defineBasicExtension } from 'prosekit/basic'
import { union } from 'prosekit/core'
import { definePreactNodeView } from 'prosekit/preact'

import { defineAtomBlock } from '../../sample/define-atom-block.ts'

import { AtomBlockView } from './atom-block-view.tsx'

export function defineExtension() {
  return union(
    defineBasicExtension(),
    defineAtomBlock(),
    definePreactNodeView({
      name: 'atomBlock',
      component: AtomBlockView,
    }),
  )
}

export type EditorExtension = ReturnType<typeof defineExtension>
