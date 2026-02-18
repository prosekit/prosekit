import type { NodeSpec } from 'prosemirror-model'

export const mathInlineSpec: NodeSpec = {
  atom: false,
  inline: true,
  group: 'inline math',
  content: 'text*',
  selectable: false,
  code: true,
  toDOM() {
    return [
      'span',
      {
        class: 'prosekit-math-inline',
      },
      ['code', 0],
    ]
  },
  parseDOM: [
    {
      tag: 'span.prosekit-math-inline',
      contentElement: 'code',
    },
  ],
}
