import {
  expect,
  it,
} from 'vitest'
import {
  page,
  userEvent,
} from 'vitest/browser'

import {
  expectLocatorToNotExist,
  extendSelection,
  testStory,
  testStoryConsistency,
  waitForEditor,
} from './helpers'

testStoryConsistency('code')

testStory({ story: 'code', emptyContent: true }, () => {
  it('toggle code mark via toolbar', async () => {
    const editor = await waitForEditor()

    // Initially no code
    await expectLocatorToNotExist(editor.locate('code'))

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
