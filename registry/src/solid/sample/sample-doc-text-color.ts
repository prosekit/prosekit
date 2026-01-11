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
                color: '#ef4444',
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
                color: '#f97316',
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
                color: '#eab308',
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
                color: '#22c55e',
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
                color: '#3b82f6',
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
                color: '#6366f1',
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
                color: '#a855f7',
              },
            },
          ],
          text: 'color',
        },
      ],
    },
  ],
}
