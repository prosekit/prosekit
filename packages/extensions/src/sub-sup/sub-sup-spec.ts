import { defineMarkSpec, union, type Extension } from '@prosekit/core'
import type { Attrs } from '@prosekit/pm/model'

/**
 * @internal
 */
export type SubSupSpecExtension = Extension<{
  Marks: {
    subscript: Attrs
    superscript: Attrs
  }
}>

/**
 * @internal
 */
export function defineSubSupSpec(): SubSupSpecExtension {
  return union(
    defineMarkSpec({
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
    }),
    defineMarkSpec({
      name: 'superscript',
      excludes: 'subscript',
      parseDOM: [
        { tag: 'sup' },
        {
          style: 'vertical-align',
          getAttrs: (value) => (value === 'sup' ? null : false),
        },
      ],
      toDOM: () => {
        return ['sup', 0] as const
      },
    }),
  )
}
