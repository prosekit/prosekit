import { type Extension, defineNodeSpec } from '@prosekit/core'

/**
 * @public
 */
export interface ImageAttrs {
  src?: string | null
}

/**
 * @internal
 */
export type ImageSpecExtension = Extension<{
  Nodes: {
    image: ImageAttrs
  }
}>

/**
 * @internal
 */
export function defineImageSpec(): ImageSpecExtension {
  return defineNodeSpec({
    name: 'image',
    attrs: {
      src: { default: null },
    },
    group: 'block',
    defining: true,
    draggable: true,
    parseDOM: [
      {
        tag: 'img[src]',
        getAttrs: (element): ImageAttrs => {
          if (typeof element === 'string') {
            return { src: null }
          }

          const src = element.getAttribute('src') || null
          return { src }
        },
      },
    ],
    toDOM(node) {
      const attrs = node.attrs as ImageAttrs
      return ['img', attrs]
    },
  })
}
