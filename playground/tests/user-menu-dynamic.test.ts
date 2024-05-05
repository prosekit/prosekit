import { expect, test, type Page } from '@playwright/test'

import { testStory, waitForEditor } from './helper'

testStory('user-menu-dynamic', ({ example }) => {
  test('user-menu-dynamic', async ({ page }) => {
    await page.goto(example)
    const editor = await waitForEditor(page)

    const itemAlice = page.getByText('Alice')
    const itemBob = page.getByText('Bob')

    await setTestBlocking(page, true)

    await editor.pressSequentially('@')

    await expect(itemAlice).toBeHidden()
    await expect(itemBob).toBeHidden()

    await setTestBlocking(page, false)

    await expect(itemBob).toBeVisible()
    await expect(itemAlice).toBeVisible()

    await editor.pressSequentially('ali')

    await expect(itemAlice).toBeVisible()
    await expect(itemBob).toBeHidden()

    await editor.press('Backspace')
    await editor.press('Backspace')
    await editor.press('Backspace')

    await expect(itemAlice).toBeVisible()
    await expect(itemBob).toBeVisible()

    await editor.pressSequentially('bo')

    await expect(itemAlice).toBeHidden()
    await expect(itemBob).toBeVisible()

    await editor.pressSequentially('12345678')

    await expect(itemAlice).toBeHidden()
    await expect(itemBob).toBeHidden()
  })
})

async function setTestBlocking(page: Page, value: boolean) {
  if (value) {
    await page.evaluate(() => ((window as any)._PROSEKIT_TEST_BLOCKING = true))
  } else {
    await page.evaluate(() => ((window as any)._PROSEKIT_TEST_BLOCKING = false))
  }
}
