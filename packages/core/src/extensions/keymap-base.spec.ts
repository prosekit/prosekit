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
import type { SelectionJSON } from '../types/model'

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
    expect(inspectSelection(editor)).toMatchInlineSnapshot(`"text: <paragraph("Foo")>"`)
    await keyboard.press('ControlOrMeta+a')
    expect(inspectSelection(editor)).toMatchInlineSnapshot(`"all: <paragraph("Foo"), paragraph("Bar")>"`)
  })

  it('can select the entire document if the block is already selected', async () => {
    const { editor, n } = setupTestFromExtension(union(
      defineDoc(),
      defineText(),
      defineParagraph(),
      defineBaseKeymap(),
    ))

    editor.set(n.doc(n.paragraph('<a>Foo<b>'), n.paragraph('Bar')))
    expect(inspectSelection(editor)).toMatchInlineSnapshot(`"text: <paragraph("Foo")>"`)
    await keyboard.press('ControlOrMeta+a')
    expect(inspectSelection(editor)).toMatchInlineSnapshot(`"all: <paragraph("Foo"), paragraph("Bar")>"`)
  })

  it('can select the entire document directly if `preferBlockSelection` is false', async () => {
    const { editor, n } = setupTestFromExtension(union(
      defineDoc(),
      defineText(),
      defineParagraph(),
      defineBaseKeymap({ preferBlockSelection: false }),
    ))

    editor.set(n.doc(n.paragraph('<a>Foo<b>'), n.paragraph('Bar')))
    expect(inspectSelection(editor)).toMatchInlineSnapshot(`"text: <paragraph("Foo")>"`)
    await keyboard.press('ControlOrMeta+a')
    expect(inspectSelection(editor)).toMatchInlineSnapshot(`"all: <paragraph("Foo"), paragraph("Bar")>"`)
  })

  it('can directly set the all selection when all content is selected', async () => {
    const { editor, n } = setupTestFromExtension(union(
      defineDoc(),
      defineText(),
      defineParagraph(),
      defineBaseKeymap(),
    ))

    editor.set(n.doc(n.paragraph('<a>Foo'), n.paragraph('Bar<b>')))
    expect(inspectSelection(editor)).toMatchInlineSnapshot(`"text: <paragraph("Foo"), paragraph("Bar")>"`)
    await keyboard.press('ControlOrMeta+a')
    expect(inspectSelection(editor)).toMatchInlineSnapshot(`"all: <paragraph("Foo"), paragraph("Bar")>"`)
  })

  it('can directly set the all selection if there is only one textblock', async () => {
    const { editor, n } = setupTestFromExtension(union(
      defineDoc(),
      defineText(),
      defineParagraph(),
      defineBaseKeymap(),
    ))

    editor.set(n.doc(n.paragraph('<a>F<b>oo')))
    expect(inspectSelection(editor)).toMatchInlineSnapshot(`"text: <paragraph("F")>"`)
    await keyboard.press('ControlOrMeta+a')
    expect(inspectSelection(editor)).toMatchInlineSnapshot(`"all: <paragraph("Foo")>"`)
  })
})

function inspectSelection(editor: TestEditor) {
  const selection = editor.state.selection
  const text = selection.content().content.toString()
  const json = selection.toJSON() as SelectionJSON
  return `${json.type}: ${text}`
}
