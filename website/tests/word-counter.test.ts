import {
  expect,
  test,
} from '@playwright/test'

import {
  emptyEditor,
  testStory,
  waitForEditor,
} from './helper'

testStory('word-counter', () => {
  test('updates counts as you type', async ({ page }) => {
    const editor = await waitForEditor(page)
    await emptyEditor(page)

    await editor.focus()
    await editor.pressSequentially('one two three')

    await expect(page.getByText('Word Count: 3')).toBeVisible()
    await expect(page.getByText('Character Count: 13')).toBeVisible()

    // Type more words and verify both counters update accordingly
    await editor.pressSequentially(' four five')
    await expect(page.getByText('Word Count: 5')).toBeVisible()
    await expect(page.getByText('Character Count: 23')).toBeVisible()
  })
})
