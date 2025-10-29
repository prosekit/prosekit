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

testStory('italic', () => {
  it('toggle via toolbar while typing', async () => {
    const editor = await waitForEditor()
    const italicBtn = page.getByRole('button', { name: 'Italic' })

    await emptyEditor()

    // Turn on italic, type text -> should be wrapped in <em>
    await expect.element(italicBtn).toBeVisible()
    await italicBtn.click()
    await userEvent.type(editor, 'hello')
    const emHello = editor.locate('em', { hasText: /hello/ })
    await expect.element(emHello).toBeVisible()

    // Turn off italic, type more -> should not be italic
    await expect.element(italicBtn).toBeVisible()
    await italicBtn.click()
    await userEvent.type(editor, ' world')
    await expect.element(emHello).toBeVisible()
    await expect.element(editor).toHaveTextContent('hello world')
    expect(editor.locate('em', { hasText: /world/ })).not.toBeInTheDocument()
  })
})
