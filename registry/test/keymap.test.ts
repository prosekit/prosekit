import { it } from 'vitest'
import { page } from 'vitest/browser'
import { keyboard } from 'vitest-browser-commands/playwright'

import {
  expectLocatorToHaveCount,
  testStory,
  testStoryConsistency,
  waitForEditor,
} from './helpers'

testStoryConsistency('keymap')

testStory('keymap', () => {
  it('keymap', async () => {
    const editor = await waitForEditor()
    const listItems = page.getByRole('listitem')

    const shiftEnterButton = page.getByRole('button', {
      name: 'Submit with Shift + Enter',
    })
    const enterButton = page.getByRole('button', {
      name: 'Submit with Enter',
    })

    await expectLocatorToHaveCount(listItems, 0)

    await shiftEnterButton.click()

    await editor.click()

    await keyboard.press('Shift+Enter')
    await expectLocatorToHaveCount(listItems, 1)

    await keyboard.press('Enter')
    await expectLocatorToHaveCount(listItems, 1)

    await enterButton.click()

    await editor.click()

    await keyboard.press('Shift+Enter')
    await expectLocatorToHaveCount(listItems, 1)

    await keyboard.press('Enter')
    await expectLocatorToHaveCount(listItems, 2)
  })
})
