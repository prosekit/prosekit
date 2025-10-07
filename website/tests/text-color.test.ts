import { expect, test } from '@playwright/test'

import { getSelectedText, testStory, waitForEditor } from './helper'

testStory('text-color', () => {
  test('change and clear text color via inline menu', async ({ page }) => {
    test.fixme(true, 'Inline color menu activation and color normalization are flaky in CI; see TODO.md for plan to stabilize')
    const editor = await waitForEditor(page)

    // Select the word "some"
    const some = editor.locator('span', { hasText: 'some' })
    await expect(some.first()).toBeVisible()
    await some.first().dblclick()
    expect(await getSelectedText(page)).toBe('some')

    // Inline color menu should appear; change to blue
    const blueBtn = page.getByRole('button', { name: 'blue' })
    await expect(blueBtn).toBeVisible()
    await blueBtn.click()

    // Assert the selected text now has blue color (#3b82f6)
    const someBlue = editor.locator('span[style*="color: #3b82f6"]', { hasText: 'some' })
    await expect(someBlue).toBeVisible()

    // Select again and clear color using "default"
    await someBlue.dblclick()
    expect(await getSelectedText(page)).toBe('some')
    const defaultBtn = page.getByRole('button', { name: 'default' })
    await expect(defaultBtn).toBeVisible()
    await defaultBtn.click()

    // Expect no colored span wraps the word "some"
    await expect(editor.locator('span[style*="color:"]', { hasText: 'some' })).toHaveCount(0)
  })
})
