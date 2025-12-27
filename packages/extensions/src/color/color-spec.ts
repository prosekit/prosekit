import {
  defineMarkSpec,
  type Extension,
} from '@prosekit/core'

/**
 * Attributes for the `color` mark.
 *
 * @public
 */
export interface ColorAttrs {
  color: string
}

/**
 * @internal
 */
export type ColorSpecExtension = Extension<{
  Marks: {
    color: ColorAttrs
  }
}>

/**
 * @internal
 */
export function defineColorSpec(): ColorSpecExtension {
  return defineMarkSpec<'color', ColorAttrs>({
    name: 'color',
    attrs: {
      color: {
        validate: 'string',
      },
    },
    parseDOM: [
      {
        style: 'color',
        getAttrs: (value): ColorAttrs | false => {
          return value ? { color: value } : false
        },
      },
    ],
    toDOM(mark, inline) {
      const color = (mark.attrs as ColorAttrs).color
      return [inline ? 'span' : 'div', { style: `color: ${color};` }, 0]
    },
  })
}
