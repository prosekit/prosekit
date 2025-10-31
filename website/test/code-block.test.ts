import {
  expect,
  it,
} from 'vitest'
import { userEvent } from 'vitest/browser'

import {
  emptyEditor,
  expectLocatorToNotExist,
  locateEditor,
  testStory,
  testStoryConsistency,
} from './helpers'

testStoryConsistency('code-block')

testStory('code-block', () => {
  it('input rule', async () => {
    const editor = locateEditor()

    // Type triple backticks and press space to create a code block
    await clearEditor()
    await userEvent.type(editor, '```')
    await expect.element(editor).toHaveTextContent('```')
    await expectNotPre()
    await userEvent.keyboard('{Space}')
    await expectAnyPre()
    await expect.element(editor).not.toHaveTextContent('```')

    // Type triple backticks followed by a language and press space to create a code block
    await clearEditor()
    await userEvent.type(editor, '```javascript')
    await expect.element(editor).toHaveTextContent('```javascript')
    await expectNotPre()
    await userEvent.keyboard('{Space}')
    await expectJavaScriptPre()
    await expect.element(editor).not.toHaveTextContent('```')
  })

  it('enter rule', async () => {
    const editor = locateEditor()

    // Type triple backticks and press enter to create a code block
    await clearEditor()
    await userEvent.type(editor, '```')
    await expect.element(editor).toHaveTextContent('```')
    await expectNotPre()
    await userEvent.keyboard('{Enter}')
    await expectAnyPre()
    await expect.element(editor).not.toHaveTextContent('```')

    // Type triple backticks followed by a language and press enter to create a code block
    await clearEditor()
    await userEvent.type(editor, '```javascript')
    await expect.element(editor).toHaveTextContent('```javascript')
    await expectNotPre()
    await userEvent.keyboard('{Enter}')
    await expectJavaScriptPre()
    await expect.element(editor).not.toHaveTextContent('```')
  })
})

async function expectNotPre() {
  const editor = locateEditor()
  const pre = editor.locate('pre')
  await expectLocatorToNotExist(pre)
}

async function expectAnyPre() {
  const editor = locateEditor()
  const pre = editor.locate('pre')
  await expect.element(pre.first()).toBeVisible()
}

async function expectJavaScriptPre() {
  const editor = locateEditor()
  const pre = editor.locate('pre[data-language="javascript"]')
  await expect.element(pre.first()).toBeVisible()
}

async function clearEditor() {
  await emptyEditor()
  await expectNotPre()
}
