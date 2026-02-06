import { defineMarkSpec, type Extension } from '@prosekit/core'

/**
 * Attributes for the `backgroundColor` mark.
 *
 * @public
 */
export interface BackgroundColorAttrs {
  color: string
}

/**
 * @internal
 */
export type BackgroundColorSpecExtension = Extension<{
  Marks: {
    backgroundColor: BackgroundColorAttrs
  }
}>

/**
 * @internal
 */
export function defineBackgroundColorSpec(): BackgroundColorSpecExtension {
  return defineMarkSpec<'backgroundColor', BackgroundColorAttrs>({
    name: 'backgroundColor',
    attrs: {
      color: {
        validate: 'string',
      },
    },
    parseDOM: [
      {
        tag: ':where([style*="background-color:"], [data-background-color])',
        getAttrs: (node): BackgroundColorAttrs | false => {
          // When both `data-background-color` and `style="background-color"` are present, we
          // prioritize the `data-background-color` attribute. This avoids the
          // browser's default behavior of changing hex colors to rgba in style
          // attribute.
          const value = node.getAttribute('data-background-color')
          if (value && value !== 'inherit') {
            return { color: value }
          }
          const color = node.style.backgroundColor
          if (color && color !== 'inherit') {
            return { color }
          }
          return false
        },
        consuming: false,
      },
    ],
    toDOM(mark) {
      const color = (mark.attrs as BackgroundColorAttrs).color
      return ['span', { 'style': `background-color: ${color};`, 'data-background-color': color }, 0]
    },
  })
}
