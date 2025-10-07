import { expect, test } from '@playwright/test'

import { testStory } from './helper'

testStory(
  'loro',
  () => {
  test('synchronizes content across two editors', async ({ page }) => {
    const editors = page.locator('div.ProseMirror[contenteditable="true"]')
    await expect(editors).toHaveCount(2)

    const a = editors.nth(0)
    const b = editors.nth(1)

    // Type in editor A
    await a.click()
    await a.press('ControlOrMeta+a')
    await a.press('Backspace')
    await a.press('Backspace')
    await expect(a).toHaveText('')
    for (const ch of ['H', 'e', 'l', 'l', 'o']) {
      await a.type(ch)
      await page.waitForTimeout(120)
    }

    // Expect editor B to receive the same content (allow some time to sync)
    await expect(b).toContainText('Hello', { timeout: 15000 })

    // Type in editor B and expect A to reflect it too
    await b.click()
    await b.press('ControlOrMeta+a')
    await b.press('Backspace')
    await b.press('Backspace')
    await expect(b).toHaveText('')
    for (const ch of ['W', 'o', 'r', 'l', 'd']) {
      await b.type(ch)
      await page.waitForTimeout(120)
    }
    await expect(a).toContainText('World', { timeout: 15000 })
  })
  },
  { checkConsoleErrors: false, checkConsoleWarnings: false },
)
