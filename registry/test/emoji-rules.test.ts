import {
  expect,
  it,
} from 'vitest'
import { page } from 'vitest/browser'
import { keyboard } from 'vitest-browser-commands/playwright'

import {
  emptyEditor,
  testStory,
  testStoryConsistency,
  waitForEditor,
} from './helpers'

testStoryConsistency('emoji-rules')

testStory('emoji-rules', () => {
  it('convert :apple: and :banana: on Enter', async () => {
    const editor = await waitForEditor()
    await emptyEditor()

    await editor.click()
    await keyboard.type(':apple:')
    await keyboard.press('Enter')
    await expect.element(page.getByText('🍎')).toBeVisible()

    await keyboard.press('Enter')
    await keyboard.type(':banana:')
    await keyboard.press('Enter')
    await expect.element(page.getByText('🍌')).toBeVisible()
  })
})
