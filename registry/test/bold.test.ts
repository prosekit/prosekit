import {
  expect,
  it,
} from 'vitest'
import { page } from 'vitest/browser'

import {
  emptyEditor,
  inputText,
  testStory,
  testStoryConsistency,
  waitForEditor,
} from './helpers'

testStoryConsistency('bold')

testStory('bold', () => {
  it('toggle via toolbar while typing', async () => {
    const editor = await waitForEditor()
    const boldBtn = page.getByRole('button', { name: 'Bold' })

    await emptyEditor()

    // Turn on bold, type text -> should be wrapped in <strong>
    await expect.element(boldBtn).toBeVisible()
    await boldBtn.click()
    await inputText('hello')
    const strongHello = editor.locate('strong', { hasText: /hello/ })
    await expect.element(strongHello).toBeVisible()

    // Turn off bold, type more -> should not be bold
    await expect.element(boldBtn).toBeVisible()
    await boldBtn.click()
    await inputText(' world')
    await expect.element(strongHello).toBeVisible()
    await expect.element(editor).toHaveTextContent('hello world')
    expect(editor.locate('strong', { hasText: /world/ })).not.toBeInTheDocument()
  })
})
