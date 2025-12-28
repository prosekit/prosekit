import {
  expect,
  it,
} from 'vitest'
import { page } from 'vitest/browser'

import {
  expectLocatorToNotExist,
  selectText,
  testStory,
  testStoryConsistency,
  waitForEditor,
} from './helpers'

testStoryConsistency('text-color')

testStory({ story: 'text-color' }, () => {
  it('change and clear text color via inline menu', async () => {
    const editor = await waitForEditor()

    // Select the word "some"
    await selectText(editor, 7, 11, 'some')

    // Inline color menu should appear; click Blue button in text color section
    const blueBtn = page.getByRole('button', { name: 'Text: Blue' })
    await expect.element(blueBtn).toBeVisible()
    await blueBtn.click()

    // Assert the selected text now renders with blue color
    const someSpan = editor.locate('span[data-text-color="#2563eb"]', { hasText: 'some' })
    await expect.element(someSpan).toBeVisible()
    await expect.element(someSpan).toHaveStyle({ color: 'rgb(37, 99, 235)' })

    // Select again and clear color using "Default"
    await selectText(editor, 7, 11, 'some')
    const defaultBtn = page.getByRole('button', { name: 'Text: Default' })
    await expect.element(defaultBtn).toBeVisible()
    await defaultBtn.click()

    // Expect no colored span wraps the word "some"
    await expectLocatorToNotExist(someSpan)
  })

  it('change and clear background color via inline menu', async () => {
    const editor = await waitForEditor()

    // Select the word "some"
    await selectText(editor, 7, 11, 'some')

    // Inline color menu should appear; click Green button in background color section
    const greenBtn = page.getByRole('button', { name: 'Background: Green' })
    await expect.element(greenBtn).toBeVisible()
    await greenBtn.click()

    // Assert the selected text now renders with green background
    const someSpan = editor.locate('span[data-background-color="#d1fae5"]', { hasText: 'some' })
    await expect.element(someSpan).toBeVisible()
    await expect.element(someSpan).toHaveStyle({ backgroundColor: 'rgb(209, 250, 229)' })

    // Select again and clear background color using "Default"
    await selectText(editor, 7, 11, 'some')
    const defaultBtn = page.getByRole('button', { name: 'Background: Default' })
    await expect.element(defaultBtn).toBeVisible()
    await defaultBtn.click()

    // Expect no background-colored span wraps the word "some"
    await expectLocatorToNotExist(someSpan)
  })
})
