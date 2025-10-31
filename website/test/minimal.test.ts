import {
  expect,
  it,
} from 'vitest'
import { userEvent } from 'vitest/browser'

import {
  testStory,
  testStoryConsistency,
  waitForEditor,
} from './helpers'

testStoryConsistency('minimal')

testStory('minimal', () => {
  it('typing', async () => {
    const editor = await waitForEditor()

    await expect.element(editor).not.toHaveTextContent('Hello')

    await userEvent.click(editor)
    await userEvent.type(editor, 'Hello ')

    await expect.element(editor).toHaveTextContent('Hello')
  })
})
