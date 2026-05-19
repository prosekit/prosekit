import { defineMarkSpec, type Extension } from '@prosekit/core'

/**
 * Attributes for the `fontFamily` mark.
 */
export interface FontFamilyAttrs {
  family: string
}

/**
 * @internal
 */
export type FontFamilySpecExtension = Extension<{
  Marks: {
    fontFamily: FontFamilyAttrs
  }
}>

/**
 * @internal
 */
export function defineFontFamilySpec(): FontFamilySpecExtension {
  return defineMarkSpec<'fontFamily', FontFamilyAttrs>({
    name: 'fontFamily',
    attrs: {
      family: {
        validate: 'string',
      },
    },
    parseDOM: [
      {
        tag: ':where([style*="font-family:"], [data-font-family])',
        getAttrs: (node): FontFamilyAttrs | false => {
          // When both `data-font-family` and `style="font-family"` are present,
          // we prioritize the `data-font-family` attribute.
          const value = node.getAttribute('data-font-family')
          if (value && value !== 'inherit') {
            return { family: value }
          }
          const fontFamily = node.style.fontFamily
          if (fontFamily && fontFamily !== 'inherit') {
            return { family: fontFamily }
          }
          return false
        },
        consuming: false,
      },
    ],
    toDOM(mark) {
      const family = (mark.attrs as FontFamilyAttrs).family
      return ['span', { 'style': `font-family: ${family};`, 'data-font-family': family }, 0]
    },
  })
}
