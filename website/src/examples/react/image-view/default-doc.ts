import type { NodeJSON } from 'prosekit/core'

export const defaultContent: NodeJSON = {
  type: 'doc',
  content: [
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'Paste or drop an image to upload it.',
        },
      ],
    },
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
        src: 'https://placehold.co/150x75/965fd4/ffffff/png',
        width: 150,
        height: 75,
      },
    },
  ],
}
