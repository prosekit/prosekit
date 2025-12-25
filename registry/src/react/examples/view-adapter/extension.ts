import { defineBasicExtension } from 'prosekit/basic'
import {
  defineNodeSpec,
  union,
} from 'prosekit/core'
import { defineReactNodeView } from 'prosekit/react'
import { AtomBlockView } from './badge-view'

/**
 * Defines an atom block node for testing purposes.
 */
function defineAtomBlock() {
  return defineNodeSpec({
    name: 'atomBlock',
    group: 'block',
    atom: true,
    parseDOM: [{
      tag: 'div[data-atom-block]',
    }],
    toDOM: () => {
      return ['div', { 'data-atom-block': 'true' }, 'atom block']
    },
  })
}

export function defineExtension() {
  return union(
    defineBasicExtension(),
    defineAtomBlock(),
    defineReactNodeView({
      name: 'atomBlock',
      component: AtomBlockView,
    }),
  )
}

export type EditorExtension = ReturnType<typeof defineExtension>
