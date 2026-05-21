import type { NodeJSON } from 'prosekit/core'

export const sampleContent: NodeJSON = {
  type: 'doc',
  content: [
    {
      type: 'heading',
      attrs: { level: 2 },
      content: [
        { type: 'text', text: 'Columns Demo' },
      ],
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'Move the pointer to a column edge to reveal the handle. The extension stores structure and runtime state; the UI here is a React layer on top.',
        },
      ],
    },
    {
      type: 'columns',
      attrs: { gap: 20 },
      content: [
        {
          type: 'column',
          attrs: { width: 240 },
          content: [
            {
              type: 'paragraph',
              content: [{ type: 'text', text: 'Column one starts with a fixed width.' }],
            },
            {
              type: 'paragraph',
              content: [{ type: 'text', text: 'Use the buttons below or drag the boundary handle.' }],
            },
          ],
        },
        {
          type: 'column',
          attrs: { width: 260 },
          content: [
            {
              type: 'paragraph',
              content: [{ type: 'text', text: 'Column two is slightly wider.' }],
            },
            {
              type: 'paragraph',
              content: [{ type: 'text', text: 'Add or remove columns without embedding UI in the extension.' }],
            },
          ],
        },
      ],
    },
  ],
}
