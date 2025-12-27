import {
  defineMarkSpec,
  type Extension,
} from '@prosekit/core'

/**
 * Attributes for the `color` mark.
 *
 * @public
 */
export interface TextColorAttrs {
  color: string
}

/**
 * @internal
 */
export type TextColorSpecExtension = Extension<{
  Marks: {
    textColor: TextColorAttrs
  }
}>

/**
 * @internal
 */
export function defineTextColorSpec(): TextColorSpecExtension {
  return defineMarkSpec<'textColor', TextColorAttrs>({
    name: 'textColor',
    attrs: {
      color: {
        validate: 'string',
      },
    },
    parseDOM: [
      {
        style: 'color',
        getAttrs: (value): TextColorAttrs | false => {
          return (value && value !== 'inherit') ? { color: value } : false
        },
      },
    ],
    toDOM(mark) {
      const color = (mark.attrs as TextColorAttrs).color
      return ['span', { style: `color: ${color};` }, 0]
    },
  })
}
