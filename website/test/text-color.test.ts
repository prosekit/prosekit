import {
  expect,
  it,
} from 'vitest'
import { page } from 'vitest/browser'

import {
  expectLocatorToNotExist,
  extendSelection,
  getSelectedText,
  moveSelection,
  testStory,
  waitForEditor,
} from './helpers'

testStoryConsistency('text-color')

testStory('text-color', () => {
  it('change and clear text color via inline menu', async ({}) => {
    const editor = await waitForEditor()
    editor.element().focus()

    const selectWord = async (start: number, end: number) => {
      // Move the cursor to the beginning of the editor
      await moveSelection('backward', 100)
      // Move the cursor to the beginning of the word
      await moveSelection('forward', start)
      // Select the word
      await extendSelection('forward', end - start)
    }

    // Select the word "some"
    await selectWord(7, 11)
    expect(getSelectedText()).toBe('some')

    // Inline color menu should appear; change to blue
    const blueBtn = page.getByRole('button', { name: 'blue' })
    await expect.element(blueBtn).toBeVisible()
    await blueBtn.click()

    // Assert the selected text now renders with blue color
    const someSpan = editor.locate('span[style*="color:"]', { hasText: 'some' })
    await expect.element(someSpan).toBeVisible()
    await expect.element(someSpan).toHaveStyle({ color: 'rgb(59, 130, 246)' })

    // Select again and clear color using "default"
    await selectWord(7, 11)
    expect(getSelectedText()).toBe('some')
    const defaultBtn = page.getByRole('button', { name: 'default' })
    await expect.element(defaultBtn).toBeVisible()
    await defaultBtn.click()

    // Expect no colored span wraps the word "some"
    await expectLocatorToNotExist(someSpan)
  })
})
