import { expect, test, type Page } from '@playwright/test'

import { testStory, waitForEditor } from './helper'

testStory(['inline-menu', 'full'], () => {
  test('inline-menu', async ({ page }) => {
    await testInlineMenu(page)
  })
})

async function testInlineMenu(page: Page) {
  const editor = await waitForEditor(page)

  const inlineMenuMain = page.getByTestId('inline-menu-main')
  const inlineMenuLink = page.getByTestId('inline-menu-link')
  const linkInput = page.getByPlaceholder('Paste the link...')
  const linkExample = editor.locator('a[href="https://www.example.com"]')

  await expect(inlineMenuMain).toBeHidden()
  await expect(inlineMenuLink).toBeHidden()

  // Type "Hello world"
  await editor.focus()
  await editor.pressSequentially('Hello world')

  // Select the word "world"
  await page.keyboard.down('Shift')
  await page.keyboard.press('ArrowLeft')
  await page.keyboard.press('ArrowLeft')
  await page.keyboard.press('ArrowLeft')
  await page.keyboard.press('ArrowLeft')
  await page.keyboard.press('ArrowLeft')
  await page.keyboard.up('Shift')

  await expect(inlineMenuMain).toBeVisible()
  await expect(inlineMenuLink).toBeHidden()

  // Add italic
  expect(await editor.innerHTML()).not.toContain('<em>world</em>')
  await inlineMenuMain.getByRole('button', { name: 'Italic' }).click()
  expect(await editor.innerHTML()).toContain('<em>world</em>')

  // Remove italic
  expect(await editor.innerHTML()).toContain('<em>world</em>')
  await inlineMenuMain.getByRole('button', { name: 'Italic' }).click()
  expect(await editor.innerHTML()).not.toContain('<em>world</em>')

  // Show the link menu
  await inlineMenuMain.getByRole('button', { name: 'Link' }).click()
  await expect(inlineMenuLink).toBeVisible()
  await expect(inlineMenuLink.getByRole('textbox')).toBeEmpty()
  await expect(inlineMenuLink.getByRole('textbox')).toHaveAttribute(
    'placeholder',
    'Paste the link...',
  )
  await inlineMenuMain.getByRole('button', { name: 'Link' }).click()
  await expect(inlineMenuLink).toBeHidden()

  // Apply the link
  await expect(linkExample).toBeHidden()
  await inlineMenuMain.getByRole('button', { name: 'Link' }).click()
  await expect(inlineMenuLink).toBeVisible()
  await expect(linkInput).toBeVisible()
  await linkInput.fill('https://www.example.com')
  await linkInput.press('Enter')
  await expect(inlineMenuLink).toBeHidden()
  await expect(linkInput).toBeHidden()
  await expect(linkExample).toBeVisible()
  expect(await linkExample.textContent()).toEqual('world')

  // Remove the link
  await expect(inlineMenuLink).toBeHidden()
  await inlineMenuMain.getByRole('button', { name: 'Link' }).click()
  await expect(inlineMenuLink).toBeVisible()
  await expect(inlineMenuLink.getByRole('textbox')).toHaveValue(
    'https://www.example.com',
  )
  await inlineMenuLink.getByRole('button', { name: 'Remove link' }).click()
  await expect(inlineMenuLink).toBeHidden()
  await expect(linkExample).toBeHidden()
  expect(await editor.textContent()).toContain('world')
}
