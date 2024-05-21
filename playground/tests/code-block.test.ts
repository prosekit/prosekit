import { expect, test, type Page } from '@playwright/test'

import { emptyEditor, locateEditor, testStory } from './helper'

testStory('code-block', () => {
  test('input rule', async ({ page }) => {
    const editor = locateEditor(page)
    const pre = editor.locator('pre')

    // Type triple backticks and press space to create a code block
    await clear(page)
    await editor.pressSequentially('```')
    await expect(editor).toHaveText('```')
    await expect(pre).not.toBeVisible()
    await editor.press('Space')
    await expectAnyPre(page)
    await expect(editor).not.toHaveText('```')

    // Type triple backticks followed by a language and press space to create a code block
    await clear(page)
    await editor.pressSequentially('```javascript')
    await expect(editor).toHaveText('```javascript')
    await expect(pre).not.toBeVisible()
    await editor.press('Space')
    await expectJavaScriptPre(page)
    await expect(editor).not.toHaveText('```')
  })

  test('enter rule', async ({ page }) => {
    const editor = locateEditor(page)
    const pre = editor.locator('pre')

    // Type triple backticks and press enter to create a code block
    await clear(page)
    await editor.pressSequentially('```')
    await expect(editor).toHaveText('```')
    await expect(pre).not.toBeVisible()
    await editor.press('Enter')
    await expectAnyPre(page)
    await expect(editor).not.toHaveText('```')

    // Type triple backticks followed by a language and press enter to create a code block
    await clear(page)
    await editor.pressSequentially('```javascript')
    await expect(editor).toHaveText('```javascript')
    await expect(pre).not.toBeVisible()
    await editor.press('Enter')
    await expectJavaScriptPre(page)
    await expect(editor).not.toHaveText('```')
  })
})

async function expectNotPre(page: Page) {
  const editor = locateEditor(page)
  const pre = editor.locator('pre')
  await expect(pre).not.toBeVisible()
}

async function expectAnyPre(page: Page) {
  const editor = locateEditor(page)
  const pre = editor.locator('pre')
  await expect(pre.first()).toBeVisible()
}

async function expectJavaScriptPre(page: Page) {
  const editor = locateEditor(page)
  const pre = editor.locator('pre[data-language="javascript"]')
  await expect(pre.first()).toBeVisible()
}

async function clear(page: Page) {
  await emptyEditor(page)
  await expectNotPre(page)
}
