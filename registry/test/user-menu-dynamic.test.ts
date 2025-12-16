import {
  expect,
  it,
} from 'vitest'
import { page } from 'vitest/browser'
import { keyboard } from 'vitest-browser-commands/playwright'

import {
  expectLocatorToBeHidden,
  getBoundingBox,
  inputText,
  testStory,
  testStoryConsistency,
  unhover,
  waitForEditor,
} from './helpers'

testStoryConsistency('user-menu-dynamic')

testStory({ story: 'user-menu-dynamic' }, () => {
  it('user-menu-dynamic', async () => {
    const editor = await waitForEditor()
    await editor.click()

    const menu = page.locate('prosekit-autocomplete-popover')
    const menuItems = page.locate('prosekit-autocomplete-item, prosekit-autocomplete-empty')
    const itemAlice = menuItems.getByText('Alice')
    const itemBob = menuItems.getByText('Bob')
    const itemLoading = menuItems.getByText('Loading...')
    const itemNoResults = menuItems.getByText('No results')
    const itemFocused = menu.locate('[role="option"][data-focused="true"]')

    // Reset the mouse position
    await unhover()

    // Ensure that the menu is positioned correctly inside the editor
    const checkMenuPosition = () => {
      const editorBox = getBoundingBox(editor)
      const menuBox = getBoundingBox(menu)

      expect(editorBox.width).toBeGreaterThan(1)
      expect(editorBox.height).toBeGreaterThan(1)
      expect(editorBox.x).toBeGreaterThanOrEqual(0)
      expect(editorBox.y).toBeGreaterThanOrEqual(0)

      expect(menuBox.width).toBeGreaterThan(1)
      expect(menuBox.height).toBeGreaterThan(1)
      expect(menuBox.x).toBeGreaterThan(editorBox.x)
      expect(menuBox.y).toBeGreaterThan(editorBox.y)
    }

    await updateNetworkStatus('offline')

    // Show loading
    {
      await inputText('@')

      await expectLocatorToBeHidden(itemAlice)
      await expectLocatorToBeHidden(itemBob)
      await expectLocatorToBeHidden(itemFocused)
      await expect.element(itemLoading).toBeVisible()
      await expectLocatorToBeHidden(itemNoResults)

      await expect.element(menu).toBeVisible()
      checkMenuPosition()
    }

    // Show all users
    {
      await updateNetworkStatus('fast')

      await expect.element(itemAlice, { timeout: 5000 }).toBeVisible()
      await expect.element(itemBob, { timeout: 5000 }).toBeVisible()
      await expect.element(itemFocused, { timeout: 5000 }).toBeVisible()
      await expect.element(itemFocused, { timeout: 5000 }).toHaveTextContent('A')

      await expect.element(menu).toBeVisible()
      checkMenuPosition()
    }

    // Search alice
    {
      await inputText('ali')

      await expect.element(itemAlice, { timeout: 5000 }).toBeVisible()
      await expectLocatorToBeHidden(itemBob)
      await expect.element(itemFocused, { timeout: 5000 }).toBeVisible()
      await expect.element(itemFocused, { timeout: 5000 }).toHaveTextContent('Alice')

      await expect.element(menu).toBeVisible()
      checkMenuPosition()
    }

    // Press Backspace and show all users again
    {
      await keyboard.press('Backspace')
      await expect.element(itemFocused).toBeVisible()
      await keyboard.press('Backspace')
      await expect.element(itemFocused).toBeVisible()
      await keyboard.press('Backspace')
      await expect.element(itemFocused).toBeVisible()

      await expect.element(itemAlice).toBeVisible()
      await expect.element(itemBob).toBeVisible()

      await expect.element(menu).toBeVisible()
      checkMenuPosition()
    }

    // Search bob
    {
      await inputText('bo')

      await expectLocatorToBeHidden(itemAlice)
      await expect.element(itemBob).toBeVisible()
    }

    // Search a non-existing user
    {
      await inputText('12345678')

      await expectLocatorToBeHidden(itemAlice)
      await expectLocatorToBeHidden(itemBob)
      await expect.element(itemNoResults).toBeVisible()

      await expect.element(menu).toBeVisible()
      checkMenuPosition()
    }

    // Press Escape to dismiss the menu
    {
      await keyboard.press('Escape')

      await expectLocatorToBeHidden(menu)
    }

    // Press Backspace and the menu should still be hidden
    {
      while ((editor.element().textContent ?? '').includes('@')) {
        const textBefore = editor.element().textContent ?? ''
        await keyboard.press('Backspace')
        const textAfter = editor.element().textContent ?? ''
        expect(textBefore.length - 1).toBe(textAfter.length)

        await expectLocatorToBeHidden(menu)
      }
    }

    // Type @ and show the menu again
    {
      await inputText('@')

      await expect.element(menu).toBeVisible()
      await expect.element(itemAlice).toBeVisible()
      await expect.element(itemBob).toBeVisible()
      await expectLocatorToBeHidden(itemNoResults)

      checkMenuPosition()
    }

    // Press Enter and insert the user
    {
      await inputText('ali')

      await expect.element(menu).toBeVisible()
      await expect.element(itemAlice).toBeVisible()
      await expectLocatorToBeHidden(itemBob)
      await expectLocatorToBeHidden(itemNoResults)
      await expectLocatorToBeHidden(itemLoading)
      await expect.element(itemFocused).toHaveTextContent('Alice')

      checkMenuPosition()

      expect(editor.element().textContent).toEqual('@ali')
      expect(editor.element().innerHTML).not.toContain('data-mention')

      await keyboard.press('Enter')

      expect(editor.element().textContent).toEqual('@Alice ')
      expect(editor.element().innerHTML).toContain('data-mention')

      await expectLocatorToBeHidden(menu)
      await expectLocatorToBeHidden(itemAlice)
      await expectLocatorToBeHidden(itemBob)
      await expectLocatorToBeHidden(itemNoResults)
      await expectLocatorToBeHidden(itemLoading)
    }
  })
})

async function updateNetworkStatus(status: 'fast' | 'slow' | 'offline') {
  {
    const { simulateNetworkStatus } = await import('../src/react/sample/sample-query-users')
    simulateNetworkStatus(status)
  }
  {
    const { simulateNetworkStatus } = await import('../src/preact/sample/sample-query-users')
    simulateNetworkStatus(status)
  }
  {
    const { simulateNetworkStatus } = await import('../src/svelte/sample/sample-query-users')
    simulateNetworkStatus(status)
  }
  {
    const { simulateNetworkStatus } = await import('../src/vue/sample/sample-query-users')
    simulateNetworkStatus(status)
  }
}
