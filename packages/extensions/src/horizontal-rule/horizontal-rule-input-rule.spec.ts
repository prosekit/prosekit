import {
  describe,
  expect,
  it,
} from 'vitest'

import { setupTest } from '../testing'
import { inputText } from '../testing/keyboard'

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
})
