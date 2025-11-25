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
  testStory,
  testStoryConsistency,
  waitForEditor,
} from './helpers'

testStoryConsistency('underline')

testStory('underline', () => {
  it('toggle via toolbar while typing', async () => {
    const editor = await waitForEditor()
    const underlineBtn = page.getByRole('button', { name: 'Underline' })

    await emptyEditor()

    // Turn on underline, type text -> should be wrapped in <u>
    await expect.element(underlineBtn).toBeVisible()
    await underlineBtn.click()
    await userEvent.type(editor, 'hello')
    const underHello = editor.locate('u', { hasText: /hello/ })
    await expect.element(underHello).toBeVisible()

    // Turn off underline, type more -> should not be underlined
    await expect.element(underlineBtn).toBeVisible()
    await underlineBtn.click()
    await userEvent.type(editor, ' world')
    await expect.element(underHello).toBeVisible()
    await expect.element(editor).toHaveTextContent('hello world')
    await expectLocatorToNotExist(editor.locate('u', { hasText: /world/ }))
  })
})
