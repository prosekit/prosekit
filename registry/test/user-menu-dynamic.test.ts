import {
  expect,
  it,
} from 'vitest'
import {
  page,
  userEvent,
} from 'vitest/browser'

import {
  expectLocatorToBeHidden,
  getBoundingBox,
  testStory,
  testStoryConsistency,
  unhover,
  waitForEditor,
} from './helpers'

testStoryConsistency('user-menu-dynamic')

testStory({ story: 'user-menu-dynamic' }, () => {
  it('user-menu-dynamic', async () => {
    const editor = await waitForEditor()

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

    await updateNetworkState('disconnected')

    // Show loading
    {
      await userEvent.type(editor, '@')

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
      await updateNetworkState('connected')

      await expect.element(itemAlice, { timeout: 5000 }).toBeVisible()
      await expect.element(itemBob, { timeout: 5000 }).toBeVisible()
      await expect.element(itemFocused, { timeout: 5000 }).toBeVisible()
      await expect.element(itemFocused, { timeout: 5000 }).toHaveTextContent('A')

      await expect.element(menu).toBeVisible()
      checkMenuPosition()
    }

    // Search alice
    {
      await userEvent.type(editor, 'ali')

      await expect.element(itemAlice, { timeout: 5000 }).toBeVisible()
      await expectLocatorToBeHidden(itemBob)
      await expect.element(itemFocused, { timeout: 5000 }).toBeVisible()
      await expect.element(itemFocused, { timeout: 5000 }).toHaveTextContent('Alice')

      await expect.element(menu).toBeVisible()
      checkMenuPosition()
    }

    // Press Backspace and show all users again
    {
      await userEvent.keyboard('{Backspace}')
      await expect.element(itemFocused).toBeVisible()
      await userEvent.keyboard('{Backspace}')
      await expect.element(itemFocused).toBeVisible()
      await userEvent.keyboard('{Backspace}')
      await expect.element(itemFocused).toBeVisible()

      await expect.element(itemAlice).toBeVisible()
      await expect.element(itemBob).toBeVisible()

      await expect.element(menu).toBeVisible()
      checkMenuPosition()
    }

    // Search bob
    {
      await userEvent.type(editor, 'bo')

      await expectLocatorToBeHidden(itemAlice)
      await expect.element(itemBob).toBeVisible()
    }

    // Search a non-existing user
    {
      await userEvent.type(editor, '12345678')

      await expectLocatorToBeHidden(itemAlice)
      await expectLocatorToBeHidden(itemBob)
      await expect.element(itemNoResults).toBeVisible()

      await expect.element(menu).toBeVisible()
      checkMenuPosition()
    }

    // Press Escape to dismiss the menu
    {
      await userEvent.keyboard('{Escape}')

      await expectLocatorToBeHidden(menu)
    }

    // Press Backspace and the menu should still be hidden
    {
      while ((editor.element().textContent ?? '').includes('@')) {
        const textBefore = editor.element().textContent ?? ''
        await userEvent.keyboard('{Backspace}')
        const textAfter = editor.element().textContent ?? ''
        expect(textBefore.length - 1).toBe(textAfter.length)

        await expectLocatorToBeHidden(menu)
      }
    }

    // Type @ and show the menu again
    {
      await userEvent.type(editor, '@')

      await expect.element(menu).toBeVisible()
      await expect.element(itemAlice).toBeVisible()
      await expect.element(itemBob).toBeVisible()
      await expectLocatorToBeHidden(itemNoResults)

      checkMenuPosition()
    }

    // Press Enter and insert the user
    {
      await userEvent.type(editor, 'ali')

      await expect.element(menu).toBeVisible()
      await expect.element(itemAlice).toBeVisible()
      await expectLocatorToBeHidden(itemBob)
      await expectLocatorToBeHidden(itemNoResults)
      await expectLocatorToBeHidden(itemLoading)
      await expect.element(itemFocused).toHaveTextContent('Alice')

      checkMenuPosition()

      expect(editor.element().textContent).toEqual('@ali')
      expect(editor.element().innerHTML).not.toContain('data-mention')

      await userEvent.keyboard('{Enter}')

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

async function updateNetworkState(state: 'connected' | 'disconnected') {
  const status = state === 'connected' ? 'fast' : 'offline'

  {
    const { simulateNetworkStatus } = await import('../src/react/sample/query-users')
    simulateNetworkStatus(status)
  }
  {
    const { simulateNetworkStatus } = await import('../src/preact/sample/query-users')
    simulateNetworkStatus(status)
  }
  {
    const { simulateNetworkStatus } = await import('../src/svelte/sample/query-users')
    simulateNetworkStatus(status)
  }
  {
    const { simulateNetworkStatus } = await import('../src/vue/sample/query-users')
    simulateNetworkStatus(status)
  }
}
