import { expect, test } from '@playwright/test'

import { testStory } from './helper'

testStory('yjs', () => {
  test('synchronizes text between two editors (networked)', async ({ page }) => {
    test.fixme(true, 'Depends on external y-websocket server; mark FIXME to avoid network flakiness in CI')

    const editors = page.locator('div.ProseMirror[contenteditable="true"]')
    await expect(editors).toHaveCount(2)

    const a = editors.nth(0)
    const b = editors.nth(1)

    await a.click()
    await a.press('ControlOrMeta+a')
    await a.press('Backspace')
    await a.press('Backspace')
    await expect(a).toHaveText('')

    for (const ch of ['H', 'i']) {
      await a.type(ch)
      await page.waitForTimeout(120)
    }

    await expect(b).toContainText('Hi', { timeout: 30000 })
  })
})

