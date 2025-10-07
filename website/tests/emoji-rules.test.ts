import {
  expect,
  test,
} from '@playwright/test'

import {
  emptyEditor,
  testStory,
  waitForEditor,
} from './helper'

testStory('emoji-rules', () => {
  test('convert :apple: and :banana: on Enter', async ({ page }) => {
    const editor = await waitForEditor(page)
    await emptyEditor(page)

    await editor.focus()
    await editor.pressSequentially(':apple:')
    await editor.press('Enter')
    await expect(editor.getByText('🍎')).toBeVisible()

    await editor.press('Enter')
    await editor.pressSequentially(':banana:')
    await editor.press('Enter')
    await expect(editor.getByText('🍌')).toBeVisible()
  })
})
