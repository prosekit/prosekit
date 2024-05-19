import { expect, test } from '@playwright/test'

import { testStory, waitForEditor } from './helper'

testStory('emoji-rules', ({ example }) => {
  test('emoji-rules', async ({ page }) => {
    await page.goto(example)
    const editor = await waitForEditor(page)

    await editor.pressSequentially(':apple:')
    await expect(editor).toContainText(':apple:')
    await editor.press('Space')
    await expect(editor).not.toContainText(':')
    await expect(editor).toContainText('🍎')

    await editor.pressSequentially(':banana:')
    await expect(editor).toContainText(':banana:')
    await editor.press('Enter')
    await expect(editor).not.toContainText(':')
    await expect(editor).toContainText('🍎')
    await expect(editor).toContainText('🍌')
  })
})
