import { expect, it } from 'vitest'
import { keyboard } from 'vitest-browser-commands/playwright'
import { page } from 'vitest/browser'

import { emptyEditor, inputText, testStory, testStoryConsistency, waitForEditor } from './helpers'

testStoryConsistency('emoji-rules')

testStory('emoji-rules', () => {
  it('convert :apple: and :banana: on Enter', async () => {
    const editor = await waitForEditor()
    await emptyEditor()

    await editor.click()
    await inputText(':apple:')
    await keyboard.press('Enter')
    await expect.element(page.getByText('🍎')).toBeVisible()

    await keyboard.press('Enter')
    await inputText(':banana:')
    await keyboard.press('Enter')
    await expect.element(page.getByText('🍌')).toBeVisible()
  })
})
