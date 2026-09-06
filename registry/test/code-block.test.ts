import { expect, it } from 'vitest'
import { keyboard } from 'vitest-browser-commands/playwright'

import { emptyEditor, expectLocatorToNotExist, inputText, locateEditor, testStory, testStoryConsistency, waitForEditor } from './helpers'

testStoryConsistency('code-block', {
  shouldWaitForShiki: true,
})

testStory('code-block', () => {
  it('input rule', async () => {
    const editor = await waitForEditor()

    // Type triple backticks and press space to create a code block
    await clearEditor()
    await inputText('```')
    await expect.element(editor).toHaveTextContent('```')
    await expectNotPre()
    await keyboard.press('Space')
    await expectAnyPre()
    await expect.element(editor).not.toHaveTextContent('```')

    // Type triple backticks followed by a language and press space to create a code block
    await clearEditor()
    await inputText('```javascript')
    await expect.element(editor).toHaveTextContent('```javascript')
    await expectNotPre()
    await keyboard.press('Space')
    await expectJavaScriptPre()
    await expect.element(editor).not.toHaveTextContent('```')
  })

  it('enter rule', async () => {
    const editor = await waitForEditor()

    // Type triple backticks and press enter to create a code block
    await clearEditor()
    await inputText('```')
    await expect.element(editor).toHaveTextContent('```')
    await expectNotPre()
    await keyboard.press('Enter')
    await expectAnyPre()
    await expect.element(editor).not.toHaveTextContent('```')

    // Type triple backticks followed by a language and press enter to create a code block
    await clearEditor()
    await inputText('```javascript')
    await expect.element(editor).toHaveTextContent('```javascript')
    await expectNotPre()
    await keyboard.press('Enter')
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
