import type { NodeJSON } from 'prosekit/core'

export const sampleContent: NodeJSON = {
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
        src: 'https://static.photos/white/200x200/1',
        width: 160,
        height: 160,
      },
    },
    {
      type: 'image',
      attrs: {
        src: 'https://static.photos/yellow/640x360/42',
        width: 240,
        height: 135,
      },
    },
  ],
}
