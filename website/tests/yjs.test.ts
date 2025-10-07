import {
  expect,
  test,
} from '@playwright/test'

import {
  emptyEditor,
  testStory,
} from './helper'

testStory('yjs', () => {
  test('synchronizes content across two editors', async ({ page }) => {
    const editors = page.locator('div.ProseMirror')
    await expect(editors).toHaveCount(2)

    const a = editors.nth(0)
    const b = editors.nth(1)

    await test.step('type in editor A', async () => {
      await a.click()
      await emptyEditor(page, { editor: a })
      await a.pressSequentially('Hello', { delay: 20 })
    })

    await test.step('expect editor B to receive the content', async () => {
      await expect(b).toContainText('Hello', { timeout: 15000 })
    })

    await test.step('type in editor B', async () => {
      await b.click()
      await emptyEditor(page, { editor: b })
      await b.pressSequentially('World', { delay: 20 })
    })

    await test.step('expect editor A to receive the content', async () => {
      await expect(a).toContainText('World', { timeout: 15000 })
    })
  })
})
