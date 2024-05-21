import { expect, test, type Page } from '@playwright/test'

import { testStory, waitForEditor } from './helper'

testStory('user-menu-dynamic', () => {
  test('user-menu-dynamic', async ({ page }) => {
    const editor = await waitForEditor(page)

    const itemAlice = page.getByText('Alice')
    const itemBob = page.getByText('Bob')
    const itemLoading = page.getByText('Loading...')
    const itemNoResults = page.getByText('No results')
    const itemFocused = page.locator('[role="option"][data-focused="true"]')
    const menu = page.locator('prosekit-autocomplete-popover', {
      has: itemAlice.or(itemBob).or(itemLoading).or(itemNoResults),
    })

    // Ensure that the menu is positioned correctly inside the editor
    const checkMenuPosition = async () => {
      const fallbackBox = { x: 0, y: 0, width: 0, height: 0 }
      const editorBox = (await editor.boundingBox()) ?? fallbackBox
      const menuBox = (await menu.boundingBox()) ?? fallbackBox

      expect(editorBox.width).toBeGreaterThan(1)
      expect(editorBox.height).toBeGreaterThan(1)
      expect(editorBox.x).toBeGreaterThanOrEqual(0)
      expect(editorBox.y).toBeGreaterThanOrEqual(0)

      expect(menuBox.width).toBeGreaterThan(1)
      expect(menuBox.height).toBeGreaterThan(1)
      expect(menuBox.x).toBeGreaterThan(editorBox.x)
      expect(menuBox.y).toBeGreaterThan(editorBox.y)
    }

    await setTestBlocking(page, true)

    await test.step('show loading', async () => {
      await editor.pressSequentially('@')

      await expect(itemAlice).toBeHidden()
      await expect(itemBob).toBeHidden()
      await expect(itemFocused).toBeHidden()
      await expect(itemLoading).toBeVisible()
      await expect(itemNoResults).toBeHidden()

      await checkMenuPosition()
    })

    await test.step('show all users', async () => {
      await setTestBlocking(page, false)

      await expect(itemAlice).toBeVisible()
      await expect(itemBob).toBeVisible()
      await expect(itemFocused).toBeVisible()
      await expect(itemFocused).toContainText('A')

      await checkMenuPosition()
    })

    await test.step('search alice', async () => {
      await editor.pressSequentially('ali')

      await expect(itemAlice).toBeVisible()
      await expect(itemBob).toBeHidden()
      await expect(itemFocused).toBeVisible()
      await expect(itemFocused).toHaveText('Alice')

      await checkMenuPosition()
    })

    await test.step('backspace and show all users again', async () => {
      await editor.press('Backspace')
      await expect(itemFocused).toBeVisible()
      await editor.press('Backspace')
      await expect(itemFocused).toBeVisible()
      await editor.press('Backspace')
      await expect(itemFocused).toBeVisible()

      await expect(itemAlice).toBeVisible()
      await expect(itemBob).toBeVisible()

      await checkMenuPosition()
    })

    await test.step('search bob', async () => {
      await editor.pressSequentially('bo')

      await expect(itemAlice).toBeHidden()
      await expect(itemBob).toBeVisible()
    })

    await test.step('search a non-existing user', async () => {
      await editor.pressSequentially('12345678')

      await expect(itemAlice).toBeHidden()
      await expect(itemBob).toBeHidden()
      await expect(itemNoResults).toBeVisible()

      await checkMenuPosition()
    })

    await test.step('press Escape to dismiss', async () => {
      await editor.press('Escape')

      await expect(menu).toBeHidden()
    })

    await test.step('press Backspace and the menu should still be dismissed', async () => {
      while ((await editor.textContent())?.includes('@')) {
        const text1 = (await editor.textContent()) ?? ''
        await editor.press('Backspace')
        const text2 = (await editor.textContent()) ?? ''
        expect(text1.length - 1).toBe(text2.length)

        await expect(menu).toBeHidden()
      }
    })

    await test.step('type @ and show the menu again', async () => {
      await editor.pressSequentially('@')

      await expect(menu).toBeVisible()
      await expect(itemAlice).toBeVisible()
      await expect(itemBob).toBeVisible()
      await expect(itemNoResults).toBeHidden()

      await checkMenuPosition()
    })
  })
})

async function setTestBlocking(page: Page, value: boolean) {
  if (value) {
    await page.evaluate(() => ((window as any)._PROSEKIT_TEST_BLOCKING = true))
  } else {
    await page.evaluate(() => ((window as any)._PROSEKIT_TEST_BLOCKING = false))
  }
}
