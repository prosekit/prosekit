import type { NodeJSON } from 'prosekit/core'

export const defaultContent: NodeJSON = {
  type: 'doc',
  content: [
    {
      type: 'heading',
      attrs: {
        level: 1,
      },
      content: [
        {
          type: 'text',
          text: 'Drag and Drop Demo',
        },
      ],
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'Try dragging any paragraph or heading by clicking on the handle that appears on the left when you hover over it.',
        },
      ],
    },
    {
      type: 'heading',
      attrs: {
        level: 2,
      },
      content: [
        {
          type: 'text',
          text: 'Getting Started',
        },
      ],
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'Hover over any block to see the drag handle appear. Click and drag to reorder content.',
        },
      ],
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'This paragraph can be moved above or below other blocks.',
        },
      ],
    },
    {
      type: 'heading',
      attrs: {
        level: 2,
      },
      content: [
        {
          type: 'text',
          text: 'Different Block Types',
        },
      ],
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'You can drag paragraphs, headings, lists, code blocks, and more.',
        },
      ],
    },
    {
      type: 'heading',
      attrs: {
        level: 3,
      },
      content: [
        {
          type: 'text',
          text: 'Lists Work Too',
        },
      ],
    },
    {
      type: 'list',
      attrs: {
        kind: 'bullet',
        order: null,
        checked: false,
        collapsed: false,
      },
      content: [
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'This entire list can be dragged',
            },
          ],
        },
      ],
    },
    {
      type: 'list',
      attrs: {
        kind: 'bullet',
        order: null,
        checked: false,
        collapsed: false,
      },
      content: [
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'Individual list items stay together',
            },
          ],
        },
      ],
    },
    {
      type: 'list',
      attrs: {
        kind: 'bullet',
        order: null,
        checked: false,
        collapsed: false,
      },
      content: [
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'Try moving this list around',
            },
          ],
        },
      ],
    },
    {
      type: 'list',
      attrs: {
        kind: 'ordered',
        order: null,
        checked: false,
        collapsed: false,
      },
      content: [
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'Ordered lists also support dragging',
            },
          ],
        },
      ],
    },
    {
      type: 'list',
      attrs: {
        kind: 'ordered',
        order: null,
        checked: false,
        collapsed: false,
      },
      content: [
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'The numbering updates automatically',
            },
          ],
        },
      ],
    },
    {
      type: 'list',
      attrs: {
        kind: 'ordered',
        order: null,
        checked: false,
        collapsed: false,
      },
      content: [
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'Drag this list to see it in action',
            },
          ],
        },
      ],
    },
    {
      type: 'heading',
      attrs: {
        level: 3,
      },
      content: [
        {
          type: 'text',
          text: 'Code Blocks',
        },
      ],
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'Even code blocks can be moved:',
        },
      ],
    },
    {
      type: 'codeBlock',
      attrs: {
        language: 'javascript',
      },
      content: [
        {
          type: 'text',
          text: '// This code block can be dragged\nfunction dragAndDrop() {\n  return "Easy to rearrange!"\n}',
        },
      ],
    },
    {
      type: 'heading',
      attrs: {
        level: 2,
      },
      content: [
        {
          type: 'text',
          text: 'Nested Content',
        },
      ],
    },
    {
      type: 'blockquote',
      content: [
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'This blockquote can be moved as a single unit.',
            },
          ],
        },
        {
          type: 'blockquote',
          content: [
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text: 'Nested blockquotes move together with their parent.',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      type: 'heading',
      attrs: {
        level: 2,
      },
      content: [
        {
          type: 'text',
          text: 'Try It Yourself',
        },
      ],
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'Practice by moving this paragraph to the top of the document.',
        },
      ],
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'Or drag this one to between the headings above.',
        },
      ],
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'The drag handles make it easy to reorganize your content exactly how you want it.',
        },
      ],
    },
  ],
}
