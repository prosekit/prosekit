import {
  defineMarkSpec,
  type Extension,
} from '@prosekit/core'

/**
 * Attributes for the `textColor` mark.
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
        tag: ':where([style*="color:"], [data-text-color])',
        getAttrs: (node): TextColorAttrs | false => {
          // When both `data-text-color` and `style="color"` are present, we
          // prioritize the `data-text-color` attribute. This avoids the
          // browser's default behavior of changing hex colors to rgba in style
          // attribute.
          const value = node.getAttribute('data-text-color')
          if (value && value !== 'inherit') {
            return { color: value }
          }
          const color = node.style.color
          if (color && color !== 'inherit') {
            return { color }
          }
          return false
        },
        consuming: false,
      },
    ],
    toDOM(mark) {
      const color = (mark.attrs as TextColorAttrs).color
      return ['span', { 'style': `color: ${color};`, 'data-text-color': color }, 0]
    },
  })
}
