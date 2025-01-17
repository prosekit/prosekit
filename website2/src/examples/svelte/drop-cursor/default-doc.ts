import type { NodeJSON } from 'prosekit/core'

export const defaultContent: NodeJSON = {
  type: 'doc',
  content: [
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'Drag the images below to see the custom drop cursor.',
        },
      ],
    },
    {
      type: 'image',
      attrs: {
        src: 'https://placehold.co/120x60/f59e0b/FFF?text=Amber',
      },
    },
    {
      type: 'image',
      attrs: {
        src: 'https://placehold.co/120x60/84cc16/FFF?text=Lime',
      },
    },
    {
      type: 'image',
      attrs: {
        src: 'https://placehold.co/120x60/06b6d4/FFF?text=Cyan',
      },
    },
    {
      type: 'image',
      attrs: {
        src: 'https://placehold.co/120x60/f43f5e/FFF?text=Rose',
      },
    },
  ],
}
