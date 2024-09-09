import { userEvent } from '@vitest/browser/context'
import { describe, expect, it } from 'vitest'

import { setupTest } from '../testing'

describe('defineHorizontalRuleCommands', () => {
  const { editor, n } = setupTest()

  it('when cursor is in empty block, should replace the selection with a horizontal rule', () => {
    const doc = n.doc(n.p('<a>'))

    editor.set(doc)
    editor.commands.insertHorizontalRule()
    expect(editor.view.state.doc.toJSON()).toEqual(
      n.doc(n.horizontalRule(), n.p('<a>')).toJSON(),
    )
  })

  it('when cursor is at the end of a block, should insert a horizontal rule after the block', () => {
    const doc = n.doc(n.p('hello<a>'))
    editor.set(doc)
    editor.commands.insertHorizontalRule()
    expect(editor.view.state.doc.toJSON()).toEqual(
      n.doc(n.p('hello<a>'), n.horizontalRule()).toJSON(),
    )
  })

  it('when cursor is in the middle of a block, should insert a horizontal rule at the position of the cursor', () => {
    const doc = n.doc(n.p('hel<a>lo'))
    editor.set(doc)
    editor.commands.insertHorizontalRule()
    expect(editor.view.state.doc.toJSON()).toEqual(
      n.doc(n.p('hel'), n.horizontalRule(), n.p('lo')).toJSON(),
    )
  })

  it('when cursor is not empty, should insert a horizontal rule at the position of the anchor', () => {
    const doc = n.doc(n.p('hel<a>l<b>o'))
    editor.set(doc)
    editor.commands.insertHorizontalRule()

    expect(editor.view.state.doc.toJSON()).toEqual(
      n.doc(n.p('hel'), n.horizontalRule(), n.p('lo')).toJSON(),
    )
  })
})

describe('defineHorizontalRuleInputRules', () => {
  const { editor, n } = setupTest()
  it('should insert a horizontal rule when typing "---" at the beginning of a block', async () => {
    const doc = n.doc(n.p('<a>'))
    editor.set(doc)
    await userEvent.keyboard('---')
    expect(editor.view.state.doc.toJSON()).toEqual(
      n.doc(n.horizontalRule(), n.p('<a>')).toJSON(),
    )
  })

  it('should not insert a horizontal rule when typing "---"  not at the beginning of a block', async () => {
    const doc = n.doc(n.p('hello<a>'))
    editor.set(doc)
    await userEvent.keyboard('---')
    expect(editor.view.state.doc.toJSON()).toEqual(
      n.doc(n.p('hello---')).toJSON(),
    )
  })
})
