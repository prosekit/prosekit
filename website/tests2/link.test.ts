import {
  expect,
  it,
} from 'vitest'
import {
  page,
  userEvent,
} from 'vitest/browser'

import {
  collapseSelection,
  emptyEditor,
  extendSelection,
  getSelectedText,
  testStory,
  waitForEditor,
} from './helpers'

testStory('link', () => {
  it('add, show, and remove link via inline menu', async () => {
    const editor = await waitForEditor()
    const mainMenu = page.locate('[data-testid="inline-menu-main"]')
    const linkMenu = page.locate('[data-testid="inline-menu-link"]')
    const linkInput = page.getByPlaceholder('Paste the link...')
    const linkButton = mainMenu.getByRole('button', { name: 'Link' })

    await emptyEditor()

    // Type text and select the word "world"
    await userEvent.click(editor)
    await userEvent.type(editor, 'Hello world')
    await extendSelection('backward', 5)
    expect(getSelectedText()).toBe('world')

    // Main menu visible, link menu hidden
    await expect.element(mainMenu).toBeVisible()
    await expect.element(linkMenu).not.toBeVisible()

    // Open link menu, placeholder shown
    await expect.element(linkButton).toBeVisible()
    await linkButton.click()
    await expect.element(linkMenu).toBeVisible()
    await expect.element(linkMenu.getByRole('textbox')).toHaveAttribute('placeholder', 'Paste the link...')

    // Apply link
    await userEvent.type(linkInput, 'https://www.example.com{Enter}')
    await expect.element(linkMenu).not.toBeVisible()

    const linkTag = editor.locate('a[href="https://www.example.com"]', { hasText: 'world' })
    await expect.element(linkTag).toBeVisible()

    // Reselect text to show main menu again
    await collapseSelection('end')
    expect(getSelectedText()).toBe('')
    await extendSelection('backward', 5)
    expect(getSelectedText()).toBe('world')

    // Open link menu again, value prefilled, then remove the link
    await expect.element(linkButton).toBeVisible()
    await linkButton.click()
    await expect.element(linkMenu).toBeVisible()
    await expect.element(linkMenu.getByRole('textbox')).toHaveValue('https://www.example.com')
    await linkMenu.getByRole('button', { name: 'Remove link' }).click()
    await expect.element(linkMenu).not.toBeVisible()
    expect(editor.locate('a[href]')).not.toBeInTheDocument()
  })
})
