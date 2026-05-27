import type { NodeJSON } from 'prosekit/core'

export const sampleContent: NodeJSON = {
  type: 'doc',
  content: [
    {
      type: 'paragraph',
      content: [{ type: 'text', text: 'A collapsible details section.' }],
    },
    {
      type: 'details',
      attrs: { open: true },
      content: [
        {
          type: 'detailsSummary',
          content: [{ type: 'text', text: 'Click to expand or collapse' }],
        },
        {
          type: 'detailsContent',
          content: [
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text: 'This content is hidden by default. The summary acts as the toggle.',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      type: 'paragraph',
      content: [{ type: 'text', text: 'Content after the details block.' }],
    },
  ],
}
