import {
  expect,
  it,
} from 'vitest'
import {
  page,
  userEvent,
} from 'vitest/browser'

import {
  expectLocatorToHaveCount,
  testStory,
  testStoryConsistency,
  waitForEditor,
} from './helpers'

testStoryConsistency('hard-break')

testStory('hard-break', () => {
  it('insert hard break via toolbar and keyboard', async () => {
    const editor = await waitForEditor()

    // Count existing line breaks in default content
    const brLocator = editor.locate('br')
    const brsBefore = brLocator.elements().length

    // Insert via toolbar
    const button = page.getByRole('button', { name: 'Insert Hard Break' })
    await expect.element(button).toBeVisible()
    await button.click()
    await expectLocatorToHaveCount(brLocator, brsBefore + 1)

    // Insert via keyboard: Shift+Enter
    await editor.click()
    await userEvent.type(editor, 'A')
    await userEvent.keyboard('{Shift>}{Enter}{/Shift}')
    await userEvent.type(editor, 'B')
    await expectLocatorToHaveCount(brLocator, brsBefore + 2)
    await expect.element(editor).toHaveTextContent(/A/)
    await expect.element(editor).toHaveTextContent(/B/)
  })
})
