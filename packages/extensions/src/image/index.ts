import {
  defineCommands,
  defineNodeSpec,
  insertNode,
  union,
  type Extension,
  type Union,
} from '@prosekit/core'

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

/**
 * @internal
 */
export type ImageCommandsExtension = Extension<{
  Commands: {
    insertImage: [attrs?: ImageAttrs]
  }
}>

/**
 * @internal
 */
export function defineImageCommands(): ImageCommandsExtension {
  return defineCommands({
    insertImage: (attrs?: ImageAttrs) => {
      return insertNode({ type: 'image', attrs })
    },
  })
}

/**
 * @internal
 */
export type ImageExtension = Union<[ImageSpecExtension, ImageCommandsExtension]>

/**
 * @public
 */
export function defineImage(): ImageExtension {
  return union([defineImageSpec(), defineImageCommands()])
}
