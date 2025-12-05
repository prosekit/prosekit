import type { NodeJSON } from 'prosekit/core'

const translation = {
  'Paragraph': 'فقرة',
  'Root list item': 'عنصر قائمة جذري',
  'Sub list item': 'عنصر قائمة فرعي',
  'Completed task': 'مهمة مكتملة',
  'Pending task': 'مهمة قيد الانتظار',
  'Quote': 'اقتباس',
} as const

export const sampleContent: NodeJSON = {
  type: 'doc',
  content: [
    {
      type: 'heading',
      attrs: { level: 1 },
      content: [{ type: 'text', text: 'Right to Left' }],
    },
    {
      type: 'paragraph',
      content: [
        { type: 'text', text: translation['Paragraph'] },
      ],
    },
    {
      type: 'list',
      attrs: { kind: 'bullet' },
      content: [
        { type: 'paragraph', content: [{ type: 'text', text: translation['Root list item'] }] },
        {
          type: 'list',
          attrs: { kind: 'ordered' },
          content: [
            { type: 'paragraph', content: [{ type: 'text', text: translation['Sub list item'] }] },
          ],
        },
        {
          type: 'list',
          attrs: { kind: 'ordered' },
          content: [
            { type: 'paragraph', content: [{ type: 'text', text: translation['Sub list item'] }] },
            {
              type: 'list',
              attrs: { kind: 'task', checked: true },
              content: [
                { type: 'paragraph', content: [{ type: 'text', text: translation['Completed task'] }] },
              ],
            },
            {
              type: 'list',
              attrs: { kind: 'task', checked: false },
              content: [
                { type: 'paragraph', content: [{ type: 'text', text: translation['Pending task'] }] },
              ],
            },
          ],
        },
      ],
    },
    {
      type: 'codeBlock',
      attrs: { language: 'javascript' },
      content: [
        {
          type: 'text',
          text: 'hello world',
        },
      ],
    },

    {
      type: 'table',
      content: [
        {
          type: 'tableRow',
          content: [
            {
              type: 'tableCell',
              attrs: {},
              content: [
                { type: 'paragraph', content: [{ type: 'text', text: 'A1' }] },
              ],
            },
            {
              type: 'tableCell',
              attrs: {},
              content: [
                { type: 'paragraph', content: [{ type: 'text', text: 'B1' }] },
              ],
            },
            {
              type: 'tableCell',
              attrs: {},
              content: [
                { type: 'paragraph', content: [{ type: 'text', text: 'C1' }] },
              ],
            },
          ],
        },
        {
          type: 'tableRow',
          content: [
            {
              type: 'tableCell',
              attrs: {},
              content: [
                { type: 'paragraph', content: [{ type: 'text', text: 'A2' }] },
              ],
            },
            {
              type: 'tableCell',
              attrs: {},
              content: [
                { type: 'paragraph', content: [{ type: 'text', text: 'B2' }] },
              ],
            },
            {
              type: 'tableCell',
              attrs: {},
              content: [
                { type: 'paragraph', content: [{ type: 'text', text: 'C2' }] },
              ],
            },
          ],
        },
        {
          type: 'tableRow',
          content: [
            {
              type: 'tableCell',
              attrs: {},
              content: [
                { type: 'paragraph', content: [{ type: 'text', text: 'A3' }] },
              ],
            },
            {
              type: 'tableCell',
              attrs: {},
              content: [
                { type: 'paragraph', content: [{ type: 'text', text: 'B3' }] },
              ],
            },
            {
              type: 'tableCell',
              attrs: {},
              content: [
                { type: 'paragraph', content: [{ type: 'text', text: 'C3' }] },
              ],
            },
          ],
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
              text: translation['Quote'],
            },
          ],
        },
      ],
    },
  ],
}
