import { expect, test, type Page } from '@playwright/test'

import { testStory, waitForEditor } from './helper'

testStory(['inline-menu', 'full'], () => {
  test('inline-menu', async ({ page }) => {
    await testInlineMenu(page)
  })
})

async function setup(page: Page) {
  const editor = await waitForEditor(page)

  const mainMenu = page.getByTestId('inline-menu-main')
  const linkMenu = page.getByTestId('inline-menu-link')
  const linkInput = page.getByPlaceholder('Paste the link...')
  const linkTag = editor.locator('a[href="https://www.example.com"]')

  return {
    editor,
    mainMenu,
    linkMenu,
    linkInput,
    linkTag,
  }
}

async function testInlineMenu(page: Page) {
  const { editor, mainMenu, linkMenu, linkInput, linkTag } = await setup(page)

  await expect(mainMenu).toBeHidden()
  await expect(linkMenu).toBeHidden()

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

  await expect(mainMenu).toBeVisible()
  await expect(linkMenu).toBeHidden()

  // Add italic
  expect(await editor.innerHTML()).not.toContain('<em>world</em>')
  await mainMenu.getByRole('button', { name: 'Italic' }).click()
  expect(await editor.innerHTML()).toContain('<em>world</em>')

  // Remove italic
  expect(await editor.innerHTML()).toContain('<em>world</em>')
  await mainMenu.getByRole('button', { name: 'Italic' }).click()
  expect(await editor.innerHTML()).not.toContain('<em>world</em>')

  // Show the link menu
  await mainMenu.getByRole('button', { name: 'Link' }).click()
  await expect(linkMenu).toBeVisible()
  await expect(linkMenu.getByRole('textbox')).toBeEmpty()
  await expect(linkMenu.getByRole('textbox')).toHaveAttribute(
    'placeholder',
    'Paste the link...',
  )
  await mainMenu.getByRole('button', { name: 'Link' }).click()
  await expect(linkMenu).toBeHidden()

  // Apply the link
  await expect(linkTag).toBeHidden()
  await mainMenu.getByRole('button', { name: 'Link' }).click()
  await expect(linkMenu).toBeVisible()
  await expect(linkInput).toBeVisible()
  await linkInput.fill('https://www.example.com')
  await linkInput.press('Enter')
  await expect(linkMenu).toBeHidden()
  await expect(linkInput).toBeHidden()
  await expect(linkTag).toBeVisible()
  expect(await linkTag.textContent()).toEqual('world')

  // Remove the link
  await expect(linkMenu).toBeHidden()
  await mainMenu.getByRole('button', { name: 'Link' }).click()
  await expect(linkMenu).toBeVisible()
  await expect(linkMenu.getByRole('textbox')).toHaveValue(
    'https://www.example.com',
  )
  await linkMenu.getByRole('button', { name: 'Remove link' }).click()
  await expect(linkMenu).toBeHidden()
  await expect(linkTag).toBeHidden()
  expect(await editor.textContent()).toContain('world')
}
