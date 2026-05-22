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
          content: [
            {
              type: 'paragraph',
              content: [{ type: 'text', text: 'Columns start by dividing the available width evenly.' }],
            },
            {
              type: 'paragraph',
              content: [{ type: 'text', text: 'Use the center plus handle to add a column or drag the boundary to resize.' }],
            },
          ],
        },
        {
          type: 'column',
          content: [
            {
              type: 'paragraph',
              content: [{ type: 'text', text: 'Focus inside a column to reveal its inline menu.' }],
            },
            {
              type: 'paragraph',
              content: [{ type: 'text', text: 'The extension owns the structure; this example owns the React controls.' }],
            },
          ],
        },
      ],
    },
  ],
}
