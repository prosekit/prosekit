import {
  expect,
  test,
  type Page,
} from '@playwright/test'

import {
  testStory,
  waitForEditor,
} from './helper'

testStory('user-menu-dynamic', () => {
  test('user-menu-dynamic', async ({ page }) => {
    const editor = await waitForEditor(page)

    const item = page
      .locator('prosekit-autocomplete-item')
      .or(page.locator('prosekit-autocomplete-empty'))
    const itemAlice = item.getByText('Alice')
    const itemBob = item.getByText('Bob')
    const itemLoading = item.getByText('Loading...')
    const itemNoResults = item.getByText('No results')
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

    // Show loading
    {
      await editor.pressSequentially('@')

      await expect(itemAlice).toBeHidden()
      await expect(itemBob).toBeHidden()
      await expect(itemFocused).toBeHidden()
      await expect(itemLoading).toBeVisible()
      await expect(itemNoResults).toBeHidden()

      await checkMenuPosition()
    }

    // Show all users
    {
      await setTestBlocking(page, false)

      await expect(itemAlice).toBeVisible()
      await expect(itemBob).toBeVisible()
      await expect(itemFocused).toBeVisible()
      await expect(itemFocused).toContainText('A')

      await checkMenuPosition()
    }

    // Search alice
    {
      await editor.pressSequentially('ali')

      await expect(itemAlice).toBeVisible()
      await expect(itemBob).toBeHidden()
      await expect(itemFocused).toBeVisible()
      await expect(itemFocused).toHaveText('Alice')

      await checkMenuPosition()
    }

    // Press Backspace and show all users again
    {
      await editor.press('Backspace')
      await expect(itemFocused).toBeVisible()
      await editor.press('Backspace')
      await expect(itemFocused).toBeVisible()
      await editor.press('Backspace')
      await expect(itemFocused).toBeVisible()

      await expect(itemAlice).toBeVisible()
      await expect(itemBob).toBeVisible()

      await checkMenuPosition()
    }

    // Search bob
    {
      await editor.pressSequentially('bo')

      await expect(itemAlice).toBeHidden()
      await expect(itemBob).toBeVisible()
    }

    // Search a non-existing user
    {
      await editor.pressSequentially('12345678')

      await expect(itemAlice).toBeHidden()
      await expect(itemBob).toBeHidden()
      await expect(itemNoResults).toBeVisible()

      await checkMenuPosition()
    }

    // Press Escape to dismiss the menu
    {
      await editor.press('Escape')

      await expect(menu).toBeHidden()
    }

    // Press Backspace and the menu should still be hidden
    {
      while ((await editor.textContent())?.includes('@')) {
        const text1 = (await editor.textContent()) ?? ''
        await editor.press('Backspace')
        const text2 = (await editor.textContent()) ?? ''
        expect(text1.length - 1).toBe(text2.length)

        await expect(menu).toBeHidden()
      }
    }

    // Type @ and show the menu again
    {
      await editor.pressSequentially('@')

      await expect(menu).toBeVisible()
      await expect(itemAlice).toBeVisible()
      await expect(itemBob).toBeVisible()
      await expect(itemNoResults).toBeHidden()

      await checkMenuPosition()
    }

    // Press Enter and insert the user
    {
      await editor.pressSequentially('ali')

      await expect(menu).toBeVisible()
      await expect(itemAlice).toBeVisible()
      await expect(itemBob).toBeHidden()
      await expect(itemNoResults).toBeHidden()
      await expect(itemLoading).toBeHidden()
      await expect(itemFocused).toHaveText('Alice')

      await checkMenuPosition()

      expect(await editor.textContent()).toEqual('@ali')
      expect(await editor.innerHTML()).not.toContain('data-mention')

      await editor.press('Enter')

      expect(await editor.textContent()).toEqual('@Alice ')
      expect(await editor.innerHTML()).toContain('data-mention')

      await expect(menu).toBeHidden()
      await expect(itemAlice).toBeHidden()
      await expect(itemBob).toBeHidden()
      await expect(itemNoResults).toBeHidden()
      await expect(itemLoading).toBeHidden()
    }
  })
})

async function setTestBlocking(page: Page, value: boolean) {
  if (value) {
    await page.evaluate(() => (window._PROSEKIT_TEST_BLOCKING = true))
  } else {
    await page.evaluate(() => (window._PROSEKIT_TEST_BLOCKING = false))
  }
}

declare global {
  interface Window {
    _PROSEKIT_TEST_BLOCKING: boolean | undefined
  }
}
