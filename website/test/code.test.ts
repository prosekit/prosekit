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
  expectLocatorToNotExist,
  extendSelection,
  locateEditor,
  testStory,
  testStoryConsistency,
} from './helpers'

testStoryConsistency('code')

testStory('code', () => {
  it('toggle code mark via toolbar', async () => {
    const editor = locateEditor()

    await emptyEditor()
    await editor.click()
    await userEvent.type(editor, 'hello')
    await extendSelection('backward', 5)

    const codeBtn = page.getByRole('button', { name: 'Code' })
    await expect.element(codeBtn).toBeVisible()
    await codeBtn.click()
    await expect.element(editor.locate('code', { hasText: 'hello' })).toBeVisible()

    // Toggle off
    await codeBtn.click()
    await expectLocatorToNotExist(editor.locate('code', { hasText: 'hello' }))
  })
})
