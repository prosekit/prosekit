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
  extendSelection,
  testStory,
  waitForEditor,
} from './helper'

testStory('toolbar', () => {
  it('bold and heading buttons work', async () => {
    const editor = await waitForEditor()

    await emptyEditor({ editor })
    await editor.click()
    await userEvent.type(editor, 'Hello')
    await extendSelection('backward', 5)

    const boldButton = page.getByRole('button', { name: 'Bold' })
    await expect.element(boldButton).toBeVisible()
    await boldButton.click()
    await expect.element(editor.locate('strong', { hasText: 'Hello' })).toBeVisible()

    await emptyEditor({ editor })
    await editor.click()
    await userEvent.type(editor, 'Hello')

    const headingButton = page.getByRole('button', { name: 'Heading 1' })
    await expect.element(headingButton).toBeVisible()
    await headingButton.click()
    await expect.element(editor.locate('h1', { hasText: 'Hello' })).toBeVisible()
  })
})
