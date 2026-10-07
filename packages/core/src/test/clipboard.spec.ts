import { expect, it } from 'vitest'
import { keyboard } from 'vitest-browser-commands/playwright'

import { union } from '../editor/union.ts'
import { definePasteHandler } from '../extensions/events/editor-event.ts'
import { defineDoc, defineParagraph, defineText, setupTest, setupTestFromExtension } from '../testing/index.ts'

import { pasteFiles, pasteHTML, pasteText, readClipboardHTML, readClipboardText } from './clipboard.ts'

it('pastes plain text into the editor', () => {
  const { editor, n } = setupTest()
  editor.set(n.doc(n.p('<a>')))

  pasteText(editor.view, 'hello world')

  expect(editor.view.state.doc.toJSON()).toEqual(
    n.doc(n.p('hello world')).toJSON(),
  )
})

it('pastes HTML into the editor', () => {
  const { editor, n, m } = setupTest()
  editor.set(n.doc(n.p('<a>')))

  pasteHTML(editor.view, '<p>hello <strong>world</strong></p>')

  expect(editor.view.state.doc.toJSON()).toEqual(
    n.doc(n.p('hello ', m.bold('world'))).toJSON(),
  )
})

it('pastes files into the editor', async () => {
  const files: File[] = []
  const { editor } = setupTestFromExtension(union(
    defineDoc(),
    defineText(),
    defineParagraph(),
    definePasteHandler((_view, event) => {
      for (const file of event.clipboardData?.files ?? []) {
        files.push(file)
      }
    }),
  ))

  pasteFiles(editor.view, [new File(['hi there'], 'hi.txt')])

  expect(files).toHaveLength(1)
  expect(files[0].name).toBe('hi.txt')
  expect(await files[0].text()).toBe('hi there')
})

it('reads back text copied from the editor', async () => {
  const { editor, n } = setupTest()
  editor.set(n.doc(n.p('hello world')))

  editor.view.dom.focus()
  await keyboard.press('ControlOrMeta+A')
  await keyboard.press('ControlOrMeta+C')

  expect(await readClipboardText()).toBe('hello world')
  expect(await readClipboardHTML()).toMatch(/<p[^>]*>hello world<\/p>/)
})
