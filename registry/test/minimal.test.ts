import { expect, it } from 'vitest'

import { inputText, testStory, testStoryConsistency, waitForEditor } from './helpers'

testStoryConsistency('minimal')

testStory('minimal', () => {
  it('typing', async () => {
    const editor = await waitForEditor()

    await expect.element(editor).not.toMatchTextContent('Hello')

    await editor.click()
    await inputText('Hello ')

    await expect.element(editor).toMatchTextContent('Hello')
  })
})
