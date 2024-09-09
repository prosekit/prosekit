import { defineMarkSpec, type Extension } from '@prosekit/core'
import type { Attrs } from '@prosekit/pm/model'

/**
 * @internal
 */
export type ItalicSpecExtension = Extension<{
  Marks: {
    italic: Attrs
  }
}>

/**
 * @internal
 */
export function defineItalicSpec(): ItalicSpecExtension {
  return defineMarkSpec({
    name: 'italic',
    parseDOM: [
      { tag: 'i' },
      { tag: 'em' },
      { style: 'font-style=italic' },
      {
        style: 'font-style=normal',
        clearMark: (m) => m.type.name === 'italic',
      },
    ],
    toDOM() {
      return ['em', 0]
    },
  })
}
