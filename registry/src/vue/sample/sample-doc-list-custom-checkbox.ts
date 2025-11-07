import type { NodeJSON } from 'prosekit/core'

export const defaultContent: NodeJSON = {
  type: 'doc',
  content: [
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'Custom list checkbox design and strikethrough for completed tasks. Please check ',
        },
        { type: 'text', text: 'custom-list.css', marks: [{ type: 'code' }] },
        { type: 'text', text: ' for the styles.' },
      ],
    },
    {
      type: 'list',
      attrs: { kind: 'task', checked: true },
      content: [
        { type: 'paragraph', content: [{ type: 'text', text: 'Completed Task' }] },
      ],
    },
    {
      type: 'list',
      attrs: { kind: 'task', checked: false },
      content: [
        { type: 'paragraph', content: [{ type: 'text', text: 'Incomplete Task' }] },
      ],
    },
  ],
}
