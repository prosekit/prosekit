import {
  expect,
  it,
} from 'vitest'
import { page } from 'vitest/browser'

import {
  emptyEditor,
  expectLocatorToNotExist,
  inputText,
  testStory,
  testStoryConsistency,
  waitForEditor,
} from './helpers'

testStoryConsistency('strike')

testStory('strike', () => {
  it('toggle via toolbar while typing', async () => {
    const editor = await waitForEditor()
    const strikeBtn = page.getByRole('button', { name: 'Strikethrough' })

    await emptyEditor()

    // Turn on strike, type text -> should be wrapped in <s>
    await expect.element(strikeBtn).toBeVisible()
    await strikeBtn.click()
    await inputText('hello')
    const struckHello = editor.locate('s', { hasText: /hello/ })
    await expect.element(struckHello).toBeVisible()

    // Turn off strike, type more -> should not be struck
    await expect.element(strikeBtn).toBeVisible()
    await strikeBtn.click()
    await inputText(' world')
    await expect.element(struckHello).toBeVisible()
    await expect.element(editor).toHaveTextContent('hello world')
    await expectLocatorToNotExist(editor.locate('s', { hasText: /world/ }))
  })
})
