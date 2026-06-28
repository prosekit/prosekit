import { defineNodeSpec, union } from '@prosekit/core'
import { describe, expect, it } from 'vitest'

import { defineTestExtension, setupTest, setupTestFromExtension } from '../testing/index.ts'
import { inputText } from '../testing/keyboard.ts'

describe('defineHorizontalRuleInputRule', () => {
  const { editor, n } = setupTest()
  it('should insert when typing "---" in an empty paragraph', async () => {
    const doc = n.doc(n.p('<a>'))
    editor.set(doc)

    await inputText('---')
    expect(editor.view.state.doc.toJSON()).toEqual(
      n.doc(n.horizontalRule(), n.p()).toJSON(),
    )

    await inputText('x')
    expect(editor.view.state.doc.toJSON()).toEqual(
      n.doc(n.horizontalRule(), n.p('x')).toJSON(),
    )
  })

  it('should insert when typing "---"  before some text', async () => {
    const doc = n.doc(n.p('<a>123'))
    editor.set(doc)

    await inputText('---')
    expect(editor.view.state.doc.toJSON()).toEqual(
      n.doc(n.horizontalRule(), n.p('123')).toJSON(),
    )

    await inputText('x')
    expect(editor.view.state.doc.toJSON()).toEqual(
      n.doc(n.horizontalRule(), n.p('x123')).toJSON(),
    )
  })

  it('should not insert when typing "---"  after some text', async () => {
    const doc = n.doc(n.p('123<a>'))
    editor.set(doc)

    await inputText('---')
    expect(editor.view.state.doc.toJSON()).toEqual(
      n.doc(n.p('123---')).toJSON(),
    )
  })

  it('should not insert inside a code block', async () => {
    const doc = n.doc(n.codeBlock('<a>'))
    editor.set(doc)

    await inputText('---')
    expect(editor.view.state.doc.toJSON()).toEqual(
      n.doc(n.codeBlock('---')).toJSON(),
    )
  })

  it('should insert inside when the parent allows a horizontal rule', async () => {
    const { editor, n } = setupTestFromExtension(
      union(defineTestExtension()),
    )
    const doc = n.doc(n.table(n.tableRow(n.tableCell(n.paragraph('<a>')))))
    editor.set(doc)

    await inputText('---')
    expect(editor.view.state.doc.toJSON()).toEqual(
      n.doc(n.table(n.tableRow(n.tableCell(n.horizontalRule(), n.paragraph())))).toJSON(),
    )
  })

  it('should not insert when the parent forbids a horizontal rule', async () => {
    // Restrict table cells to a single paragraph so they cannot hold a
    // horizontal rule, the way GFM table cells work.
    const { editor, n } = setupTestFromExtension(
      union(
        defineTestExtension(),
        defineNodeSpec({ name: 'tableCell', content: 'paragraph' }),
        defineNodeSpec({ name: 'tableHeaderCell', content: 'paragraph' }),
      ),
    )
    const doc = n.doc(n.table(n.tableRow(n.tableCell(n.paragraph('<a>')))))
    editor.set(doc)

    await inputText('---')
    expect(editor.view.state.doc.toJSON()).toEqual(
      n.doc(n.table(n.tableRow(n.tableCell(n.paragraph('---'))))).toJSON(),
    )
  })
})
