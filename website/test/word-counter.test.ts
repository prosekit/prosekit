import {
  expect,
  it,
} from 'vitest'
import {
  page,
  userEvent,
} from 'vitest/browser'

import {
  emptyEditor,
  locateEditor,
  testStory,
} from './helpers'

testStory('word-counter', () => {
  it('updates counts as you type', async () => {
    const editor = locateEditor()
    await emptyEditor()

    await editor.click()
    await userEvent.type(editor, 'one two three')

    await expect.element(page.getByText('Word Count: 3')).toBeVisible()
    await expect.element(page.getByText('Character Count: 13')).toBeVisible()

    // Type more words and verify both counters update accordingly
    await userEvent.type(editor, ' four five')
    await expect.element(page.getByText('Word Count: 5')).toBeVisible()
    await expect.element(page.getByText('Character Count: 23')).toBeVisible()
  })
})
