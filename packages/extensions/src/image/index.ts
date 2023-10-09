import { addNodeSpec, defineExtension } from '@prosekit/core'

export interface ImageAttrs {
  src?: string | null
}

export function addImageSpec() {
  return addNodeSpec({
    name: 'image',
    attrs: {
      src: { default: null },
    },
    group: 'block',
    defining: true,
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

/** @public */
export function addImage() {
  return defineExtension([addImageSpec()])
}
