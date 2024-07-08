import { expect, test, type Page } from '@playwright/test'

import {
  emptyEditor,
  getSelectedText,
  testStory,
  waitForEditor,
} from './helper'

testStory(['inline-menu', 'full'], () => {
  test('show and dismiss', async ({ page }) => {
    const { editor, mainMenu, linkMenu, typeAndSelect } = await setup(page)

    // Initially, the menu is hidden
    expect(await editor.textContent()).toEqual('')
    await expect(mainMenu).toBeHidden()
    await expect(linkMenu).toBeHidden()

    // Select a word
    await typeAndSelect()
    expect(await editor.textContent()).toEqual('Hello world')
    await expect(mainMenu).toBeVisible()
    await expect(linkMenu).toBeHidden()

    // Deselect the word
    await page.keyboard.press('ArrowRight')
    await expect(mainMenu).toBeHidden()
    await expect(linkMenu).toBeHidden()

    // Type something and select a word again
    await editor.pressSequentially(' ')
    await typeAndSelect()
    expect(await editor.textContent()).toEqual('Hello world Hello world')
    await expect(mainMenu).toBeVisible()
    await expect(linkMenu).toBeHidden()

    // TODO: not implemented yet
    // // Press Escape to dismiss the menu
    // await page.keyboard.press('Escape')
    // await expect(mainMenu).toBeHidden()
    // await expect(linkMenu).toBeHidden()
  })

  test('inline mark', async ({ page }) => {
    const { editor, mainMenu, linkMenu, typeAndSelect } = await setup(page)

    await expect(mainMenu).toBeHidden()
    await expect(linkMenu).toBeHidden()

    expect(await getSelectedText(page)).toEqual('')
    await typeAndSelect()
    expect(await getSelectedText(page)).toEqual('world')

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
  })

  test('inline link', async ({ page }) => {
    const {
      editor,
      mainMenu,
      linkMenu,
      linkInput,
      linkTag,
      typeAndSelect,
      selectTextFromEnd,
    } = await setup(page)

    const linkButton = mainMenu.getByRole('button', { name: 'Link' })

    await expect(mainMenu).toBeHidden()
    await expect(linkMenu).toBeHidden()

    await typeAndSelect()

    await expect(mainMenu).toBeVisible()
    await expect(linkMenu).toBeHidden()

    // Show the link menu
    await linkButton.click()
    await expect(linkMenu).toBeVisible()
    await expect(linkMenu.getByRole('textbox')).toBeEmpty()
    await expect(linkMenu.getByRole('textbox')).toHaveAttribute(
      'placeholder',
      'Paste the link...',
    )
    await linkButton.click()
    await expect(linkMenu).toBeHidden()

    // Apply the link
    await expect(linkTag).toBeHidden()
    await linkButton.click()
    await expect(linkMenu).toBeVisible()
    await expect(linkInput).toBeVisible()
    await linkInput.fill('https://www.example.com')
    await linkInput.press('Enter')
    await expect(mainMenu).toBeVisible()
    await expect(linkMenu).toBeHidden()
    await expect(linkInput).toBeHidden()
    await expect(linkTag).toBeVisible()
    expect(await linkTag.textContent()).toEqual('world')

    // Show the link menu again
    await expect(mainMenu).toBeVisible()
    await expect(linkMenu).toBeHidden()
    await linkButton.click()
    await expect(mainMenu).toBeVisible()
    await expect(linkMenu).toBeVisible()

    // Deselect the text and dismiss menus
    expect(await getSelectedText(page)).toEqual('world')
    await editor.click()
    expect(await getSelectedText(page)).toEqual('')
    await expect(mainMenu).toBeHidden()
    await expect(linkMenu).toBeHidden()

    // Move the text cursor to the end of the text
    for (let i = 0; i < 20; i++) {
      await editor.press('ArrowRight')
    }
    // Select the text again and show the main menu
    await selectTextFromEnd(2)
    expect(await getSelectedText(page)).toEqual('ld')
    await expect(mainMenu).toBeVisible()
    await expect(linkMenu).toBeHidden()

    // Show the link menu
    await linkButton.click()
    await expect(mainMenu).toBeVisible()
    await expect(linkMenu).toBeVisible()

    // The text selection should expand to include the whole link
    expect(await getSelectedText(page)).toEqual('world')

    // Remove the link
    await expect(linkMenu).toBeVisible()
    await expect(linkMenu.getByRole('textbox')).toHaveValue(
      'https://www.example.com',
    )
    await linkMenu.getByRole('button', { name: 'Remove link' }).click()
    await expect(mainMenu).toBeVisible()
    await expect(linkMenu).toBeHidden()
    await expect(linkTag).toBeHidden()
    expect(await editor.textContent()).toContain('world')
  })
})

async function setup(page: Page) {
  const editor = await waitForEditor(page)

  const mainMenu = page.getByTestId('inline-menu-main')
  const linkMenu = page.getByTestId('inline-menu-link')
  const linkInput = page.getByPlaceholder('Paste the link...')
  const linkTag = editor.locator('a[href="https://www.example.com"]')

  await emptyEditor(page)

  const selectTextFromEnd = async (chars: number) => {
    await page.keyboard.down('Shift')
    for (let i = 0; i < chars; i++) {
      await page.keyboard.press('ArrowLeft')
    }
    await page.keyboard.up('Shift')
  }

  const typeAndSelect = async () => {
    // Type "Hello world"
    await editor.focus()
    await editor.pressSequentially('Hello world')

    // Select the word "world"
    await selectTextFromEnd(5)
  }

  return {
    editor,
    mainMenu,
    linkMenu,
    linkInput,
    linkTag,
    selectTextFromEnd,
    typeAndSelect,
  }
}
