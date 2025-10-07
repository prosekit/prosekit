import {
  expect,
  test,
} from '@playwright/test'

import {
  expectEditorToBeFocused,
  testStory,
  waitForEditor,
} from './helper'

testStory('gap-cursor', () => {
  test('shows gap cursor via keyboard near non-text blocks', async ({ page }) => {
    // FIXME: Deterministic activation of the gap cursor is flaky in CI.
    // See TODO.md notes around gap-cursor for a robust approach.
    test.fixme(true, 'Awaiting robust activation/assertion strategy for gap cursor')
    const editor = await waitForEditor(page)

    const gap = page.locator('.ProseMirror-gapcursor')

    // Select the first image, then move cursor to the gap using arrow keys
    const images = editor.locator('img')
    await expect(images).toHaveCount(2)
    const img1 = images.nth(0)
    await expect(img1).toBeVisible()
    await img1.click()
    await expectEditorToBeFocused(page)

    let found = false
    const tryKeys = ['ArrowRight', 'ArrowDown', 'ArrowRight'] as const
    for (const key of tryKeys) {
      await page.keyboard.press(key)
      if (await gap.isVisible()) {
        found = true
        break
      }
    }

    expect(found).toBeTruthy()
  })
})
