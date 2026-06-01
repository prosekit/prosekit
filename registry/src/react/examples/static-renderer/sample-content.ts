import type { NodeJSON } from 'prosekit/core'

export const sampleContent: NodeJSON = {
  type: 'doc',
  content: [
    {
      type: 'heading',
      attrs: { level: 1 },
      content: [{ type: 'text', text: 'Static Renderer Demo' }],
    },
    {
      type: 'paragraph',
      content: [
        { type: 'text', text: 'This example demonstrates ' },
        { type: 'text', marks: [{ type: 'bold' }], text: 'renderToHTMLString' },
        { type: 'text', text: ' and ' },
        { type: 'text', marks: [{ type: 'bold' }], text: 'renderToMarkdown' },
        { type: 'text', text: ' from ' },
        { type: 'text', marks: [{ type: 'code' }], text: 'prosekit/static-renderer' },
        { type: 'text', text: '. Edit the content below and see the output update in real time.' },
      ],
    },
    {
      type: 'heading',
      attrs: { level: 2 },
      content: [{ type: 'text', text: 'Inline Formatting' }],
    },
    {
      type: 'paragraph',
      content: [
        { type: 'text', text: 'You can use ' },
        { type: 'text', marks: [{ type: 'bold' }], text: 'bold' },
        { type: 'text', text: ', ' },
        { type: 'text', marks: [{ type: 'italic' }], text: 'italic' },
        { type: 'text', text: ', ' },
        { type: 'text', marks: [{ type: 'underline' }], text: 'underline' },
        { type: 'text', text: ', ' },
        { type: 'text', marks: [{ type: 'strike' }], text: 'strikethrough' },
        { type: 'text', text: ', and ' },
        { type: 'text', marks: [{ type: 'code' }], text: 'inline code' },
        { type: 'text', text: '. Combine them for ' },
        { type: 'text', marks: [{ type: 'bold' }, { type: 'italic' }], text: 'bold italic' },
        { type: 'text', text: ' text.' },
      ],
    },
    {
      type: 'paragraph',
      content: [
        { type: 'text', text: 'Add ' },
        {
          type: 'text',
          marks: [{ type: 'link', attrs: { href: 'https://prosekit.dev' } }],
          text: 'links',
        },
        { type: 'text', text: ' to connect to external resources.' },
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
        { type: 'paragraph', content: [{ type: 'text', text: 'Bullet lists for unordered items' }] },
      ],
    },
    {
      type: 'list',
      attrs: { kind: 'bullet', order: null, checked: false, collapsed: false },
      content: [
        { type: 'paragraph', content: [{ type: 'text', text: 'Nested lists are supported' }] },
        {
          type: 'list',
          attrs: { kind: 'bullet', order: null, checked: false, collapsed: false },
          content: [
            { type: 'paragraph', content: [{ type: 'text', text: 'With sub-items' }] },
          ],
        },
      ],
    },
    {
      type: 'list',
      attrs: { kind: 'ordered', order: null, checked: false, collapsed: false },
      content: [
        { type: 'paragraph', content: [{ type: 'text', text: 'Ordered lists for sequential steps' }] },
      ],
    },
    {
      type: 'list',
      attrs: { kind: 'ordered', order: null, checked: false, collapsed: false },
      content: [
        { type: 'paragraph', content: [{ type: 'text', text: 'Each item is numbered' }] },
      ],
    },
    {
      type: 'list',
      attrs: { kind: 'task', order: null, checked: true, collapsed: false },
      content: [
        { type: 'paragraph', content: [{ type: 'text', text: 'Task lists with checkboxes' }] },
      ],
    },
    {
      type: 'list',
      attrs: { kind: 'task', order: null, checked: false, collapsed: false },
      content: [
        { type: 'paragraph', content: [{ type: 'text', text: 'Mark tasks as complete' }] },
      ],
    },
    {
      type: 'heading',
      attrs: { level: 2 },
      content: [{ type: 'text', text: 'Code Blocks' }],
    },
    {
      type: 'codeBlock',
      attrs: { language: 'typescript' },
      content: [
        {
          type: 'text',
          text: "import { renderToHTMLString } from 'prosekit/static-renderer/html'\n\nconst html = renderToHTMLString({\n  extension: myExtension,\n  content: myJSON,\n})",
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
          content: [
            { type: 'text', text: 'The static renderer lets you convert ProseMirror JSON to HTML or Markdown without creating an editor instance.' },
          ],
        },
      ],
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
              content: [
                { type: 'paragraph', content: [{ type: 'text', marks: [{ type: 'bold' }], text: 'Function' }] },
              ],
            },
            {
              type: 'tableCell',
              attrs: {},
              content: [
                { type: 'paragraph', content: [{ type: 'text', marks: [{ type: 'bold' }], text: 'Output' }] },
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
                { type: 'paragraph', content: [{ type: 'text', text: 'renderToHTMLString' }] },
              ],
            },
            {
              type: 'tableCell',
              attrs: {},
              content: [
                { type: 'paragraph', content: [{ type: 'text', text: 'HTML string' }] },
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
                { type: 'paragraph', content: [{ type: 'text', text: 'renderToMarkdown' }] },
              ],
            },
            {
              type: 'tableCell',
              attrs: {},
              content: [
                { type: 'paragraph', content: [{ type: 'text', text: 'Markdown string' }] },
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
                { type: 'paragraph', content: [{ type: 'text', text: 'renderToReactElement' }] },
              ],
            },
            {
              type: 'tableCell',
              attrs: {},
              content: [
                { type: 'paragraph', content: [{ type: 'text', text: 'React element' }] },
              ],
            },
          ],
        },
      ],
    },
    { type: 'horizontalRule' },
    {
      type: 'paragraph',
      content: [
        { type: 'text', text: 'Try editing this content to see the HTML and Markdown outputs update live.' },
      ],
    },
  ],
}
