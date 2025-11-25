import type { NodeJSON } from 'prosekit/core'

export const sampleContent: NodeJSON = {
  type: 'doc',
  content: [
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          marks: [
            {
              type: 'textColor',
              attrs: {
                color: 'rgb(239, 68, 68)',
              },
            },
          ],
          text: 'Select',
        },
        {
          type: 'text',
          text: ' ',
        },
        {
          type: 'text',
          marks: [
            {
              type: 'textColor',
              attrs: {
                color: 'rgb(249, 115, 22)',
              },
            },
          ],
          text: 'some',
        },
        {
          type: 'text',
          text: ' ',
        },
        {
          type: 'text',
          marks: [
            {
              type: 'textColor',
              attrs: {
                color: 'rgb(234, 179, 8)',
              },
            },
          ],
          text: 'text',
        },
        {
          type: 'text',
          text: ' ',
        },
        {
          type: 'text',
          marks: [
            {
              type: 'textColor',
              attrs: {
                color: 'rgb(34, 197, 94)',
              },
            },
          ],
          text: 'to',
        },
        {
          type: 'text',
          text: ' ',
        },
        {
          type: 'text',
          marks: [
            {
              type: 'textColor',
              attrs: {
                color: 'rgb(59, 130, 246)',
              },
            },
          ],
          text: 'change',
        },
        {
          type: 'text',
          text: ' ',
        },
        {
          type: 'text',
          marks: [
            {
              type: 'textColor',
              attrs: {
                color: 'rgb(99, 102, 241)',
              },
            },
          ],
          text: 'the',
        },
        {
          type: 'text',
          text: ' ',
        },
        {
          type: 'text',
          marks: [
            {
              type: 'textColor',
              attrs: {
                color: 'rgb(168, 85, 247)',
              },
            },
          ],
          text: 'color',
        },
      ],
    },
  ],
}
