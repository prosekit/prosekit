import { describe, expect, it } from 'vitest'

import { setupTest } from '../testing/index.ts'

import { expandMark } from './expand-mark.ts'

const href = 'https://example.com'

function setup() {
  const { editor, n, m } = setupTest()
  // TODO: move getSelectionString into setupTest // REVIEW
  const getSelectionString = () => editor.state.selection.content().content.toString()
  return { editor, n, m, getSelectionString }
}

describe('expandMark', () => {
  it('expands a caret inside a mark to the whole run', () => {
    const { editor, n, m, getSelectionString } = setup()
    editor.set(n.doc(n.p('foo ', m.link({ href }, 'ba<a>r'), ' baz')))
    expect(editor.exec(expandMark({ type: 'link' }))).toBe(true)
    expect(getSelectionString()).toMatchInlineSnapshot(`"<paragraph(link("bar"))>"`)
  })

  it('is a no-op when the position is not inside the mark', () => {
    const { editor, n, m, getSelectionString } = setup()
    editor.set(n.doc(n.p('fo<a>o ', m.link({ href }, 'bar'))))
    expect(editor.exec(expandMark({ type: 'link' }))).toBe(false)
    expect(getSelectionString()).toMatchInlineSnapshot(`"<>"`)
  })

  it('stops at a neighbouring mark that differs in attributes', () => {
    const { editor, n, m, getSelectionString } = setup()
    editor.set(n.doc(n.p(m.link({ href: 'a' }, 'fo<a>o'), m.link({ href: 'b' }, 'bar'))))
    expect(editor.exec(expandMark({ type: 'link' }))).toBe(true)
    expect(getSelectionString()).toMatchInlineSnapshot(`"<paragraph(link("foo"))>"`)
  })
})
