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
        class: 'prosemirror-math-inline',
      },
      ['code', 0],
    ]
  },
  parseDOM: [
    {
      tag: 'span.prosemirror-math-inline',
      contentElement: 'code',
    },
  ],
}
