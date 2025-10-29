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
  testStory,
  waitForEditor,
} from './editor'

testStory('bold', () => {
  it('toggle via toolbar while typing', async () => {
    const editor = await waitForEditor()
    const boldBtn = page.getByRole('button', { name: 'Bold' })

    await emptyEditor()

    // Turn on bold, type text -> should be wrapped in <strong>
    await expect.element(boldBtn).toBeVisible()
    await boldBtn.click()
    await userEvent.type(editor, 'hello')
    const strongHello = editor.locate('strong', { hasText: /hello/ })
    await expect.element(strongHello).toBeVisible()

    // Turn off bold, type more -> should not be bold
    await expect.element(boldBtn).toBeVisible()
    await boldBtn.click()
    await userEvent.type(editor, ' world')
    await expect.element(strongHello).toBeVisible()
    await expect.element(editor).toHaveTextContent('hello world')
    expect(editor.locate('strong', { hasText: /world/ })).not.toBeInTheDocument()
  })
})
