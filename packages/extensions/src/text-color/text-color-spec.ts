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
        tag: 'span[data-text-color]',
        getAttrs: (node): TextColorAttrs | false => {
          const value = node.getAttribute('data-text-color')
          if (value && value !== 'inherit') {
            return { color: value }
          }
          return false
        },
        consuming: false,
      },
      {
        tag: '[style*="color"]',
        getAttrs: (node): TextColorAttrs | false => {
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
