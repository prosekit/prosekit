import { defineMarkSpec, type Extension } from '@prosekit/core'
import type { Attrs } from '@prosekit/pm/model'

/**
 * @internal
 */
export type HighlightSpecExtension = Extension<{
  Marks: {
    highlight: Attrs
  }
}>

/**
 * @internal
 */
export function defineHighlightSpec(): HighlightSpecExtension {
  return defineMarkSpec({
    name: 'highlight',
    parseDOM: [
      { tag: 'mark' },
      {
        tag: 'span',
        getAttrs: (node: string | HTMLElement): null | false => {
          return (
            typeof node !== 'string'
            && node.dataset.highlight !== undefined
            && null
          )
        },
      },
    ],
    toDOM() {
      return ['mark', 0]
    },
  })
}
