import {
  expect,
  test,
} from '@playwright/test'

import {
  testStory,
  waitForEditor,
} from './helper'

testStory('link-mark-view', () => {
  test('link-mark-view', async ({ page }) => {
    const editor = await waitForEditor(page)
    const link = editor.locator('[data-mark-view-root="true"] a')

    const getLinkColor = async (): Promise<string> => {
      return await link.evaluate((el) => {
        return window.getComputedStyle(el).getPropertyValue('color')
      })
    }

    // Expect the color to change at least 2 times
    const colors = new Set<string>()
    for (let i = 0; i < 100; i++) {
      colors.add(await getLinkColor())
      if (colors.size > 2) {
        break
      }
      await page.waitForTimeout(100)
    }
    expect(colors.size).toBeGreaterThan(2)
  })
})
