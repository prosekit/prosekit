import {
  expect,
  test,
} from '@playwright/test'

import {
  expectEditorToBeFocused,
  getBoundingBox,
  testStory,
  waitForEditor,
} from './helper'

testStory('gap-cursor', () => {
  test('shows gap cursor between stacked images', async ({ page }) => {
    const editor = await waitForEditor(page)

    const gap = page.locator('.ProseMirror-gapcursor')

    // There are two stacked images in the default content
    const images = editor.locator('img')
    await expect(images).toHaveCount(2)

    const img1 = images.nth(0)
    const img2 = images.nth(1)

    await expect(img1).toBeVisible()
    await expect(img2).toBeVisible()

    // Compute a click position at the vertical gap between the two images
    const b1 = await getBoundingBox(img1)
    const b2 = await getBoundingBox(img2)
    const clickX = Math.floor(b1.x + b1.width / 2)
    const clickY = Math.floor((b1.y + b1.height + b2.y) / 2)

    // Focus editor first to ensure gap cursor decoration can appear
    await img1.click()
    await expectEditorToBeFocused(page)

    // Click in the visual gap between the images
    await page.mouse.click(clickX, clickY)

    // Expect the gap cursor decoration to exist
    await expect(gap).toHaveCount(1)
  })
})
