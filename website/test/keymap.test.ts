import { it } from 'vitest'
import {
  page,
  userEvent,
} from 'vitest/browser'

import {
  expectLocatorToHaveCount,
  locateEditor,
  testStory,
  testStoryConsistency,
} from './helpers'

testStoryConsistency('keymap')

testStory('keymap', () => {
  it('keymap', async () => {
    const editor = locateEditor()
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

    await userEvent.keyboard('{Shift>}{Enter}{/Shift}')
    await expectLocatorToHaveCount(listItems, 1)

    await userEvent.keyboard('{Enter}')
    await expectLocatorToHaveCount(listItems, 1)

    await enterButton.click()

    await editor.click()

    await userEvent.keyboard('{Shift>}{Enter}{/Shift}')
    await expectLocatorToHaveCount(listItems, 1)

    await userEvent.keyboard('{Enter}')
    await expectLocatorToHaveCount(listItems, 2)
  })
})
