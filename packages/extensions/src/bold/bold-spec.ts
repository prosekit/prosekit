import { defineMarkSpec, type Extension } from '@prosekit/core'
import type { Attrs } from '@prosekit/pm/model'

/**
 * @internal
 */
export type BoldSpecExtension = Extension<{
  Marks: {
    bold: Attrs
  }
}>

/**
 * @internal
 */
export function defineBoldSpec(): BoldSpecExtension {
  return defineMarkSpec({
    name: 'bold',
    parseDOM: [
      { tag: 'strong' },
      // This works around a Google Docs misbehavior where
      // pasted content will be inexplicably wrapped in `<b>`
      // tags with a font-weight normal.
      {
        tag: 'b',
        getAttrs: (node: string | HTMLElement): null | false => {
          return (
            typeof node !== 'string'
            && node.style.fontWeight !== 'normal'
            && null
          )
        },
      },
      { style: 'font-weight=400', clearMark: (m) => m.type.name == 'strong' },
      {
        style: 'font-weight',
        getAttrs: (value: string | HTMLElement): null | false => {
          return (
            typeof value === 'string'
            && /^(bold(er)?|[5-9]\d{2,})$/.test(value)
            && null
          )
        },
      },
    ],
    toDOM() {
      return ['strong', 0]
    },
  })
}
