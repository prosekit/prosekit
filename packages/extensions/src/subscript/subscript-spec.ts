import { defineMarkSpec, type Extension } from '@prosekit/core'
import type { Attrs } from '@prosekit/pm/model'

/**
 * @internal
 */
export type SubscriptSpecExtension = Extension<{
  Marks: {
    subscript: Attrs
  }
}>

/**
 * @internal
 */
export function defineSubscriptSpec(): SubscriptSpecExtension {
  return defineMarkSpec({
    name: 'subscript',
    excludes: 'superscript',
    inclusive: true,
    parseDOM: [
      { tag: 'sub' },
      {
        style: 'vertical-align',
        getAttrs: (value) => (value === 'sub' ? null : false),
      },
    ],
    toDOM: () => {
      return ['sub', 0] as const
    },
  })
}
