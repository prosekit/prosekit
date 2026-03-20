import type { NodeJSON } from 'prosekit/core'

export const sampleContent: NodeJSON = {
  type: 'doc',
  content: [
    {
      type: 'heading',
      attrs: { level: 1 },
      content: [{ type: 'text', text: 'Page Layout Demo' }],
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'This is the first page.',
        },
      ],
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text:
            'The content below will be on a new page because of a page break. You can insert a page break by pressing Command+Enter on Mac or Ctrl+Enter on Windows and Linux.',
        },
      ],
    },
    { type: 'pageBreak' },
    {
      type: 'heading',
      attrs: { level: 1 },
      content: [{ type: 'text', text: 'Page 2' }],
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'This is the second page.',
        },
      ],
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text:
            'When the content on a page exceeds the available height, it will automatically flow to the next page. This is similar to how traditional word processors like Microsoft Word handle pagination.',
        },
      ],
    },
    { type: 'image', attrs: { src: 'https://placehold.co/600x500' } },
    { type: 'image', attrs: { src: 'https://placehold.co/600x500' } },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'The images above exceed the available height on the second page, so they automatically flow to the next page.',
        },
      ],
    },
    {
      type: 'heading',
      attrs: { level: 2 },
      content: [{ type: 'text', text: 'Known Limitation' }],
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text:
            'Page breaks only occur between block elements. A single block taller than the remaining space on the page will overflow to the next page rather than split. In other words, you cannot split a node like paragraph or a table across pages. The paragraph below demonstrates this.',
        },
      ],
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          marks: [{ type: 'bold' }],
          text: 'This is a very long paragraph that demonstrates the limitation of block-level pagination.',
        },
        {
          type: 'text',
          text: ' ',
        },
        {
          type: 'text',
          marks: [{ type: 'italic' }],
          text:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.',
        },
      ],
    },
  ],
}
