import { union } from '@prosekit/core'
import { createTestEditor } from '@prosekit/core/test'
import { describe, expect, it } from 'vitest'

import { defineDoc } from '../doc/index.ts'
import { defineHardBreak } from '../hard-break/index.ts'
import { defineHorizontalRule } from '../horizontal-rule/index.ts'
import { defineParagraph } from '../paragraph/index.ts'
import { defineText } from '../text/index.ts'

import { definePageBreak } from './page-break.ts'

function setup() {
  const extension = union(
    defineDoc(),
    defineText(),
    defineParagraph(),
    defineHorizontalRule(),
    defineHardBreak(),
    definePageBreak(),
  )
  const editor = createTestEditor({ extension })
  const div = document.body.appendChild(document.createElement('div'))
  editor.mount(div)
  return { editor, n: editor.nodes }
}

describe('insertPageBreak', () => {
  it('should insert a page break in an empty paragraph', () => {
    const { editor, n } = setup()
    editor.set(n.doc(n.paragraph('<a>')))
    editor.commands.insertPageBreak()
    expect(editor.view.state.doc.toJSON()).toEqual(
      n.doc(n.pageBreak()).toJSON(),
    )
  })

  it('should insert a page break after text', () => {
    const { editor, n } = setup()
    editor.set(n.doc(n.paragraph('hello<a>')))
    editor.commands.insertPageBreak()
    expect(editor.view.state.doc.toJSON()).toEqual(
      n.doc(n.paragraph('hello'), n.pageBreak()).toJSON(),
    )
  })

  it('should insert a page break before text', () => {
    const { editor, n } = setup()
    editor.set(n.doc(n.paragraph('<a>hello')))
    editor.commands.insertPageBreak()
    expect(editor.view.state.doc.toJSON()).toEqual(
      n.doc(n.pageBreak(), n.paragraph('hello')).toJSON(),
    )
  })

  it('should insert a page break between text', () => {
    const { editor, n } = setup()
    editor.set(n.doc(n.paragraph('hel<a>lo')))
    editor.commands.insertPageBreak()
    expect(editor.view.state.doc.toJSON()).toEqual(
      n.doc(n.paragraph('hel'), n.pageBreak(), n.paragraph('lo')).toJSON(),
    )
  })
})
