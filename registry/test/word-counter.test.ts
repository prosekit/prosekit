import {
  expect,
  it,
} from 'vitest'
import { page } from 'vitest/browser'
import { keyboard } from 'vitest-browser-commands/playwright'

import {
  emptyEditor,
  testStory,
  testStoryConsistency,
  waitForEditor,
} from './helpers'

testStoryConsistency('word-counter')

testStory('word-counter', () => {
  it('updates counts as you type', async () => {
    const editor = await waitForEditor()
    await emptyEditor()

    await editor.click()
    await keyboard.type('one two three')

    await expect.element(page.getByText('Word Count: 3')).toBeVisible()
    await expect.element(page.getByText('Character Count: 13')).toBeVisible()

    // Type more words and verify both counters update accordingly
    await keyboard.type(' four five')
    await expect.element(page.getByText('Word Count: 5')).toBeVisible()
    await expect.element(page.getByText('Character Count: 23')).toBeVisible()
  })
})
