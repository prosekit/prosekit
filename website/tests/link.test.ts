import {
  expect,
  test,
} from '@playwright/test'

import {
  emptyEditor,
  testStory,
  waitForEditor,
} from './helper'

testStory('link', () => {
  test('add, show, and remove link via inline menu', async ({ page }) => {
    const editor = await waitForEditor(page)
    const mainMenu = page.getByTestId('inline-menu-main')
    const linkMenu = page.getByTestId('inline-menu-link')
    const linkInput = page.getByPlaceholder('Paste the link...')
    const linkButton = mainMenu.getByRole('button', { name: 'Link' })

    await emptyEditor(page)

    // Type text and select the word "world"
    await editor.focus()
    await editor.pressSequentially('Hello world')
    await page.keyboard.down('Shift')
    for (let i = 0; i < 5; i++) {
      await page.keyboard.press('ArrowLeft')
    }
    await page.keyboard.up('Shift')

    // Main menu visible, link menu hidden
    await expect(mainMenu).toBeVisible()
    await expect(linkMenu).toBeHidden()

    // Open link menu, placeholder shown
    await linkButton.click()
    await expect(linkMenu).toBeVisible()
    await expect(linkMenu.getByRole('textbox')).toHaveAttribute(
      'placeholder',
      'Paste the link...',
    )

    // Apply link
    await linkInput.fill('https://www.example.com')
    await linkInput.press('Enter')
    await expect(linkMenu).toBeHidden()
    const linkTag = editor.locator('a[href="https://www.example.com"]', {
      hasText: 'world',
    })
    await expect(linkTag).toBeVisible()

    // Reselect text to show main menu again
    for (let i = 0; i < 20; i++) {
      await editor.press('ArrowRight')
    }
    await page.keyboard.down('Shift')
    for (let i = 0; i < 2; i++) {
      await page.keyboard.press('ArrowLeft')
    }
    await page.keyboard.up('Shift')

    // Open link menu again, value prefilled, then remove the link
    await linkButton.click()
    await expect(linkMenu).toBeVisible()
    await expect(linkMenu.getByRole('textbox')).toHaveValue(
      'https://www.example.com',
    )
    await linkMenu.getByRole('button', { name: 'Remove link' }).click()
    await expect(linkMenu).toBeHidden()
    await expect(editor.locator('a[href]')).toHaveCount(0)
  })
})
