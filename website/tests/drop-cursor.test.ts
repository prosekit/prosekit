import {
  expect,
  test,
} from '@playwright/test'

import {
  testStory,
  waitForEditor,
} from './helper'

testStory('drop-cursor', () => {
  test('reorders images by HTML5 drag-and-drop', async ({ page }) => {
    const editor = await waitForEditor(page)

    const images = editor.locator('img')
    await expect(images).toHaveCount(4)

    const before = await images.evaluateAll((els) => els.map((e) => e.getAttribute('src') || ''))

    // Ensure all images are unique
    expect(new Set(before).size).toBe(before.length)

    // Drag first image to just before the third image (between the 2nd and 3rd)
    await images.nth(0).dragTo(images.nth(2), { targetPosition: { x: 5, y: 5 } })

    const after = await images.evaluateAll((els) => els.map((e) => e.getAttribute('src') || ''))

    // Expect order: [b, a, c, d]
    expect(after.length).toBeGreaterThanOrEqual(4)
    expect(after[0]).toEqual(before[1])
    expect(after[1]).toEqual(before[0])
    expect(after[2]).toEqual(before[2])
    expect(after[3]).toEqual(before[3])
  })
})
