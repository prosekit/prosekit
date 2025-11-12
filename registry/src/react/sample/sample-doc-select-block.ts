import type { NodeJSON } from 'prosekit/core'

export const defaultContent: NodeJSON = {
  type: 'doc',
  content: [
    {
      type: 'heading',
      attrs: { level: 1 },
      content: [{ type: 'text', text: 'Select blocks with Ctrl+A' }],
    },
    {
      type: 'paragraph',
      content: [
        { type: 'text', text: 'This demo shows how to ' },
        { type: 'text', marks: [{ type: 'bold' }], text: 'select the current block' },
        { type: 'text', text: ' with a single command. Try it on paragraphs, ' },
        { type: 'text', marks: [{ type: 'italic' }], text: 'headings' },
        { type: 'text', text: ', lists, ' },
        { type: 'text', marks: [{ type: 'underline' }], text: 'tables' },
        { type: 'text', text: ', and more. You can also click inside a nested structure like a ' },
        { type: 'text', marks: [{ type: 'code' }], text: 'blockquote' },
        { type: 'text', text: ' and select the outer block.' },
      ],
    },
    {
      type: 'heading',
      attrs: { level: 2 },
      content: [{ type: 'text', text: 'Inline formatting' }],
    },
    {
      type: 'paragraph',
      content: [
        { type: 'text', text: 'Mix ' },
        { type: 'text', marks: [{ type: 'bold' }], text: 'bold' },
        { type: 'text', text: ', ' },
        { type: 'text', marks: [{ type: 'italic' }], text: 'italic' },
        { type: 'text', text: ', ' },
        { type: 'text', marks: [{ type: 'underline' }], text: 'underline' },
        { type: 'text', text: ', and ' },
        { type: 'text', marks: [{ type: 'strike' }], text: 'strike' },
        { type: 'text', text: '. Add ' },
        { type: 'text', marks: [{ type: 'code' }], text: 'inline code' },
        { type: 'text', text: ' or a ' },
        {
          type: 'text',
          marks: [{ type: 'link', attrs: { href: 'https://prosekit.dev' } }],
          text: 'link',
        },
        { type: 'text', text: ' that opens the docs.' },
      ],
    },
    {
      type: 'heading',
      attrs: { level: 2 },
      content: [{ type: 'text', text: 'Lists' }],
    },
    {
      type: 'list',
      attrs: { kind: 'bullet', order: null, checked: false, collapsed: false },
      content: [
        { type: 'paragraph', content: [{ type: 'text', text: 'Bullet item A' }] },
        {
          type: 'list',
          attrs: { kind: 'bullet', order: null, checked: false, collapsed: false },
          content: [
            { type: 'paragraph', content: [{ type: 'text', text: 'Nested bullet A.1' }] },
          ],
        },
      ],
    },
    {
      type: 'list',
      attrs: { kind: 'ordered', order: null, checked: false, collapsed: false },
      content: [
        { type: 'paragraph', content: [{ type: 'text', text: 'Step one' }] },
        { type: 'paragraph', content: [{ type: 'text', text: 'Step two' }] },
      ],
    },
    {
      type: 'list',
      attrs: { kind: 'task', order: null, checked: false, collapsed: false },
      content: [
        { type: 'paragraph', content: [{ type: 'text', text: 'Read the docs' }] },
        {
          type: 'list',
          attrs: { kind: 'task', order: null, checked: true, collapsed: false },
          content: [
            { type: 'paragraph', content: [{ type: 'text', text: 'Try select block' }] },
          ],
        },
      ],
    },
    {
      type: 'heading',
      attrs: { level: 2 },
      content: [{ type: 'text', text: 'Blockquote' }],
    },
    {
      type: 'blockquote',
      content: [
        {
          type: 'paragraph',
          content: [{ type: 'text', text: '“Selecting the right block saves time.”' }],
        },
        {
          type: 'paragraph',
          content: [{ type: 'text', text: '— Someone productive' }],
        },
      ],
    },
    {
      type: 'heading',
      attrs: { level: 2 },
      content: [{ type: 'text', text: 'Code block' }],
    },
    {
      type: 'codeBlock',
      attrs: { language: 'typescript' },
      content: [
        {
          type: 'text',
          text: 'function selectBlock() {\n  // Selects the current block\n}\n',
        },
      ],
    },
    {
      type: 'heading',
      attrs: { level: 2 },
      content: [{ type: 'text', text: 'Image' }],
    },
    {
      type: 'image',
      attrs: { src: 'https://static.photos/season/320x240/107' },
    },
    {
      type: 'paragraph',
      content: [{ type: 'text', text: 'Resize the image from the handle.' }],
    },
    {
      type: 'heading',
      attrs: { level: 2 },
      content: [{ type: 'text', text: 'Table' }],
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
              content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Block' }] }],
            },
            {
              type: 'tableCell',
              attrs: {},
              content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Example' }] }],
            },
          ],
        },
        {
          type: 'tableRow',
          content: [
            {
              type: 'tableCell',
              attrs: {},
              content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Paragraph' }] }],
            },
            {
              type: 'tableCell',
              attrs: {},
              content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Some text' }] }],
            },
          ],
        },
      ],
    },
    { type: 'horizontalRule' },
    {
      type: 'paragraph',
      content: [{ type: 'text', text: 'Place the cursor anywhere and press “Select Block”.' }],
    },
  ],
}
