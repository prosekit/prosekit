import {
  Editor,
  createEditor,
  defineDoc,
  defineParagraph,
  defineText,
  union,
} from '@prosekit/core'
import type { ProseMirrorNode } from '@prosekit/pm/model'
import { TextSelection } from '@prosekit/pm/state'
import { describe, expect, it } from 'vitest'

import { defineBold } from '../bold'

import { findChangedTextRanges } from './changed-range'

function setState(
  editor: Editor,
  doc: ProseMirrorNode,
  anchor?: number,
  head?: number,
) {
  if (!editor.mounted) {
    const div = document.body.appendChild(document.createElement('div'))
    editor.mount(div)
  }

  const tr = editor.state.tr
  tr.replaceWith(0, editor.state.doc.content.size, doc.content)

  if (anchor != null) {
    tr.setSelection(TextSelection.create(tr.doc, anchor, head))
  }

  editor.view.dispatch(tr)
}

function getSelectionText(editor: Editor): string {
  const selection = editor.state.selection
  const content = selection.content().content
  return content.textBetween(0, content.size)
}

describe('findChangedTextRanges', () => {
  const extension = union([
    defineParagraph(),
    defineText(),
    defineDoc(),
    defineBold(),
  ])
  const editor = createEditor({ extension })
  const n = editor.nodes
  const m = editor.marks

  it('can find changed text', () => {
    const doc = n.doc(
      n.paragraph(range(100, 300).join(' ')),
      n.paragraph(range(300, 400).join(' '), m.bold(range(400, 500).join(' '))),
      n.paragraph(range(500, 700).join(' ')),
    )
    setState(editor, doc, 1300, 1300 + 20)
    expect(getSelectionText(editor)).toMatchInlineSnapshot(
      `" 425 426 427 428 429"`,
    )
    expect(findChangedTextRanges(editor.state.selection)).toMatchInlineSnapshot(
      `
      [
        [
          1201,
          1520,
        ],
      ]
    `,
    )

    setState(editor, doc, 1300, 1700 + 20)
    expect(getSelectionText(editor).slice(0, 20)).toMatchInlineSnapshot(
      `" 425 426 427 428 429"`,
    )
    expect(getSelectionText(editor).slice(-20, -1)).toMatchInlineSnapshot(
      `"4 525 526 527 528 5"`,
    )
    expect(findChangedTextRanges(editor.state.selection)).toMatchInlineSnapshot(
      `
      [
        [
          1602,
          2401,
        ],
        [
          802,
          1600,
        ],
      ]
    `,
    )
  })
})

function range(start: number, end: number) {
  const numbers: number[] = []
  for (let i = start; i < end; i++) {
    numbers.push(i)
  }
  return numbers
}
