import { defineMarkSpec, type Extension } from '@prosekit/core'
import type { Attrs } from '@prosekit/pm/model'

/**
 * @internal
 */
export type SuperscriptSpecExtension = Extension<{
  Marks: {
    superscript: Attrs
  }
}>

/**
 * @internal
 */
export function defineSuperscriptSpec(): SuperscriptSpecExtension {
  return defineMarkSpec({
    name: 'superscript',
    excludes: 'subscript',
    inclusive: true,
    parseDOM: [
      { tag: 'sup' },
      {
        style: 'vertical-align',
        getAttrs: (value) => (value === 'super' ? null : false),
      },
    ],
    toDOM: () => {
      return ['sup', 0] as const
    },
  })
}
