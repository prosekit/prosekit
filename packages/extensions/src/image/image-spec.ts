import {
  defineNodeSpec,
  type Extension,
} from '@prosekit/core'

/**
 * @public
 */
export interface ImageAttrs {
  src?: string | null
  width?: number | null
  height?: number | null
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
      src: { default: null, validate: 'string|null' },
      width: { default: null, validate: 'number|null' },
      height: { default: null, validate: 'number|null' },
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

          let width: number | null = null
          let height: number | null = null

          const rect = element.getBoundingClientRect()
          if (rect.width > 0 && rect.height > 0) {
            width = rect.width
            height = rect.height
          } else if (
            element instanceof HTMLImageElement
            && element.naturalWidth > 0
            && element.naturalHeight > 0
          ) {
            width = element.naturalWidth
            height = element.naturalHeight
          }
          return { src, width, height }
        },
      },
    ],
    toDOM(node) {
      const attrs = node.attrs as ImageAttrs
      return ['img', attrs]
    },
  })
}
