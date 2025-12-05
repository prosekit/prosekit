import {
  expect,
  it,
} from 'vitest'
import {
  page,
  userEvent,
} from 'vitest/browser'
import { keyboard } from 'vitest-browser-commands/playwright'

import {
  expectLocatorToHaveCount,
  testStory,
  testStoryConsistency,
  waitForEditor,
} from './helpers'

testStoryConsistency('search')

testStory('search', () => {
  it('search', async () => {
    const editor = await waitForEditor()

    const searchMatch = editor.locate('.ProseMirror-search-match')
    const activeSearchMatch = editor.locate('.ProseMirror-active-search-match')
    const searchInput = page.getByPlaceholder('Search')
    const replaceInput = page.getByPlaceholder('Replace')
    const toggleReplaceButton = page.getByRole('button', { name: 'Toggle Replace' })

    await expectLocatorToHaveCount(searchMatch, 0)
    await expectLocatorToHaveCount(activeSearchMatch, 0)

    await userEvent.type(searchInput, 'One')

    await expectLocatorToHaveCount(searchMatch, 3)
    await expectLocatorToHaveCount(activeSearchMatch, 0)

    await keyboard.press('Enter')

    await expectLocatorToHaveCount(searchMatch, 2)
    await expectLocatorToHaveCount(activeSearchMatch, 1)

    await expectLocatorToHaveCount(replaceInput, 0)
    await toggleReplaceButton.click()
    await expectLocatorToHaveCount(replaceInput, 1)
    await expect.element(replaceInput).toBeVisible()

    await userEvent.type(replaceInput, 'Zero')
    await keyboard.press('Enter')

    await expectLocatorToHaveCount(searchMatch, 1)
    await expectLocatorToHaveCount(activeSearchMatch, 1)
  })
})
