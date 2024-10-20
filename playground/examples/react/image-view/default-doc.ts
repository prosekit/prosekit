import type { NodeJSON } from 'prosekit/core'

export const defaultContent: NodeJSON = {
  type: 'doc',
  content: [
    {
      type: 'image',
      attrs: {
        src: 'https://placehold.co/150x150/8bd450/ffffff/png',
        width: 150,
        height: 150,
      },
    },
    {
      type: 'image',
      attrs: {
        src: 'https://placehold.co/200x80/965fd4/ffffff/png',
        width: 200,
        height: 80,
      },
    },
  ],
}
