import {
  describe,
  expect,
  it,
} from 'vitest'
import { keyboard } from 'vitest-browser-commands/playwright'

import { union } from '../editor/union'
import type { TestEditor } from '../test'
import {
  defineDoc,
  defineParagraph,
  defineText,
  setupTestFromExtension,
} from '../testing'

import { defineBaseKeymap } from './keymap-base'

describe('Mod-a', () => {
  it('can select the block for the first Mod-a press', async () => {
    const { editor, n } = setupTestFromExtension(union(
      defineDoc(),
      defineText(),
      defineParagraph(),
      defineBaseKeymap(),
    ))

    editor.set(n.doc(n.paragraph('Fo<a>o<b>'), n.paragraph('Bar')))
    await keyboard.press('ControlOrMeta+a')
    expect(getSelectionString(editor)).toMatchInlineSnapshot(`"<paragraph("Foo")>"`)
    await keyboard.press('ControlOrMeta+a')
    expect(getSelectionString(editor)).toMatchInlineSnapshot(`"<paragraph("Foo"), paragraph("Bar")>"`)
  })

  it('can select the entire document if the block is already selected', async () => {
    const { editor, n } = setupTestFromExtension(union(
      defineDoc(),
      defineText(),
      defineParagraph(),
      defineBaseKeymap(),
    ))

    editor.set(n.doc(n.paragraph('<a>Foo<b>'), n.paragraph('Bar')))
    await keyboard.press('ControlOrMeta+a')
    expect(getSelectionString(editor)).toMatchInlineSnapshot(`"<paragraph("Foo"), paragraph("Bar")>"`)
  })

  it('can select the entire document directly if `preferBlockSelection` is false', async () => {
    const { editor, n } = setupTestFromExtension(union(
      defineDoc(),
      defineText(),
      defineParagraph(),
      defineBaseKeymap({ preferBlockSelection: false }),
    ))

    editor.set(n.doc(n.paragraph('<a>Foo<b>'), n.paragraph('Bar')))
    await keyboard.press('ControlOrMeta+a')
    expect(getSelectionString(editor)).toMatchInlineSnapshot(`"<paragraph("Foo"), paragraph("Bar")>"`)
  })
})

function getSelectionString(editor: TestEditor) {
  const fragment = editor.state.selection.content().content
  return fragment.toString()
}
