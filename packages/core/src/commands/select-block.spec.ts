import { describe, expect, it } from 'vitest'

import { setupTest } from '../testing'

import { selectBlock } from './select-block'

describe('selectBlock', () => {
  it('should expand the text selection to cover the start of the paragraph', () => {
    const { editor, n, getSelectionString } = setup()
    editor.set(n.doc(n.paragraph('Hello <a>world<b>')))
    expect(getSelectionString()).toMatchInlineSnapshot(`"<paragraph("world")>"`)
    editor.exec(selectBlock())
    expect(getSelectionString()).toMatchInlineSnapshot(`"<paragraph("Hello world")>"`)
  })

  it('should expand the text selection to cover the end of the paragraph', () => {
    const { editor, n, getSelectionString } = setup()
    editor.set(n.doc(n.paragraph('<a>Hello<b> world')))
    expect(getSelectionString()).toMatchInlineSnapshot(`"<paragraph("Hello")>"`)
    editor.exec(selectBlock())
    expect(getSelectionString()).toMatchInlineSnapshot(`"<paragraph("Hello world")>"`)
  })

  it('should expand the text selection to include other marks', () => {
    const { editor, n, m, getSelectionString } = setup()
    editor.set(n.doc(n.paragraph(
      m.bold('Bold'),
      ' ',
      m.italic('Italic<a>'),
      ' ',
      m.bold('Bold'),
    )))
    expect(getSelectionString()).toMatchInlineSnapshot(`"<>"`)
    editor.exec(selectBlock())
    expect(getSelectionString()).toMatchInlineSnapshot(`"<paragraph(bold("Bold"), " ", italic("Italic"), " ", bold("Bold"))>"`)
  })

  it('should expand the text selection to include multiple blocks', () => {
    const { editor, n, getSelectionString } = setup()
    editor.set(n.doc(
      n.paragraph('Hello<a>'),
      n.paragraph('World'),
      n.paragraph('<b>!'),
    ))
    expect(getSelectionString()).toMatchInlineSnapshot(`"<paragraph, paragraph("World"), paragraph>"`)
    editor.exec(selectBlock())
    expect(getSelectionString()).toMatchInlineSnapshot(`"<paragraph("Hello"), paragraph("World"), paragraph("!")>"`)
  })

  it('is able to expand the text selection pointing to different depths', () => {
    const { editor, n, getSelectionString } = setup()
    editor.set(n.doc(
      n.paragraph('Hello<a>'),
      n.blockquote([
        n.paragraph('Item 1'),
        n.blockquote([
          n.paragraph('Sub<b> item 1.1'),
        ]),
      ]),
      n.blockquote([
        n.paragraph('Item 2'),
      ]),
    ))
    expect(getSelectionString()).toMatchInlineSnapshot(`"<paragraph, blockquote(paragraph("Item 1"), blockquote(paragraph("Sub")))>"`)
    editor.exec(selectBlock())
    expect(getSelectionString()).toMatchInlineSnapshot(
      `"<paragraph("Hello"), blockquote(paragraph("Item 1"), blockquote(paragraph("Sub item 1.1")))>"`,
    )
  })
})

function setup() {
  const { editor, n, m } = setupTest()

  const getSelectionString = () => {
    const fragment = editor.state.selection.content().content
    return fragment.toString()
  }

  return { editor, n, m, getSelectionString }
}
