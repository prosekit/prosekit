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
  getSelectedHtml,
  getSelectedText,
  moveSelection,
  testStory,
  waitForEditor,
} from './helper'

testStory(['inline-menu', 'full'], () => {
  it('show and dismiss', async () => {
    const { editor, mainMenu, linkMenu, typeAndSelect } = await setup()

    // Initially, the menu is hidden
    expect(editor.element().textContent).toEqual('')
    await expect.element(mainMenu).not.toBeVisible()
    await expect.element(linkMenu).not.toBeVisible()

    // Select a word
    await typeAndSelect()
    expect(editor.element().textContent).toEqual('Hello world')
    await expect.element(mainMenu).toBeVisible()
    await expect.element(linkMenu).not.toBeVisible()

    // Deselect the word
    await collapseSelection('end')
    await expect.element(mainMenu).not.toBeVisible()
    await expect.element(linkMenu).not.toBeVisible()

    // Type something and select a word again
    await userEvent.type(editor, ' ')
    await typeAndSelect()
    expect(editor.element().textContent).toEqual('Hello world Hello world')
    await expect.element(mainMenu).toBeVisible()
    await expect.element(linkMenu).not.toBeVisible()

    // Press Escape to dismiss the menu
    await userEvent.keyboard('{Escape}')
    await expect.element(mainMenu).not.toBeVisible()
    await expect.element(linkMenu).not.toBeVisible()
  })

  it('multiple empty paragraphs selection', async () => {
    const { editor, mainMenu } = await setup()

    const countSelectedParagraphs = () => {
      const html = getSelectedHtml()
      return html.split('<p>').length - 1
    }

    // Initially, the menu is hidden, and no paragraph is selected
    await expect.element(mainMenu).not.toBeVisible()
    expect(countSelectedParagraphs()).toEqual(0)

    // Press Enter to create paragraphs
    await userEvent.click(editor)
    for (let i = 0; i < 6; i++) {
      await userEvent.keyboard('{Enter}')
    }
    expect(countSelectedParagraphs()).toEqual(0)

    // Select empty paragraphs
    await extendSelection('backward', 5)
    expect(countSelectedParagraphs()).toBeGreaterThan(3)

    // The menu should still be hidden
    await expect.element(mainMenu).not.toBeVisible()
  })

  it('inline mark', async () => {
    const { editor, mainMenu, linkMenu, typeAndSelect } = await setup()

    await expect.element(mainMenu).not.toBeVisible()
    await expect.element(linkMenu).not.toBeVisible()

    expect(getSelectedText()).toEqual('')
    await typeAndSelect()
    expect(getSelectedText()).toEqual('world')

    await expect.element(mainMenu).toBeVisible()
    await expect.element(linkMenu).not.toBeVisible()

    // Add italic
    expect(editor.element().innerHTML).not.toContain('<em>world</em>')
    await mainMenu.getByRole('button', { name: 'Italic' }).click()
    expect(editor.element().innerHTML).toContain('<em>world</em>')

    // Remove italic
    expect(editor.element().innerHTML).toContain('<em>world</em>')
    await mainMenu.getByRole('button', { name: 'Italic' }).click()
    expect(editor.element().innerHTML).not.toContain('<em>world</em>')
  })

  it('inline link', async () => {
    const {
      editor,
      mainMenu,
      linkMenu,
      linkInput,
      linkTag,
      typeAndSelect,
      selectTextFromEnd,
    } = await setup()

    const linkButton = mainMenu.getByRole('button', { name: 'Link' })

    await expect.element(mainMenu).not.toBeVisible()
    await expect.element(linkMenu).not.toBeVisible()

    await typeAndSelect()

    await expect.element(mainMenu).toBeVisible()
    await expect.element(linkMenu).not.toBeVisible()

    // Show the link menu
    await userEvent.click(linkButton.element())
    await expect.element(linkMenu).toBeVisible()
    await expect.element(linkMenu.getByRole('textbox')).toHaveValue('')
    await expect.element(linkMenu.getByRole('textbox')).toHaveAttribute(
      'placeholder',
      'Paste the link...',
    )
    await userEvent.keyboard('{Escape}')
    await expect.element(linkMenu).not.toBeVisible()

    // Apply the link
    expect(linkTag).not.toBeInTheDocument()
    await userEvent.click(linkButton.element())
    await expect.element(linkMenu).toBeVisible()
    await expect.element(linkInput).toBeVisible()
    await userEvent.type(linkInput, 'https://www.example.com{Enter}')
    await expect.element(mainMenu).toBeVisible()
    await expect.element(linkMenu).not.toBeVisible()
    expect(linkInput).not.toBeInTheDocument()
    await expect.element(linkTag).toBeVisible()
    expect(linkTag.element().textContent).toEqual('world')

    // Show the link menu again
    await expect.element(mainMenu).toBeVisible()
    await expect.element(linkMenu).not.toBeVisible()
    await userEvent.click(linkButton.element())
    await expect.element(mainMenu).toBeVisible()
    await expect.element(linkMenu).toBeVisible()

    // Deselect the text and dismiss menus
    expect(getSelectedText()).toEqual('world')
    await userEvent.click(editor)
    expect(getSelectedText()).toEqual('')
    await expect.element(mainMenu).not.toBeVisible()
    await expect.element(linkMenu).not.toBeVisible()

    // Move the text cursor to the end of the text
    await moveSelection('forward', 20)
    // Select the text again and show the main menu
    await selectTextFromEnd('ld')
    expect(getSelectedText()).toEqual('ld')
    await expect.element(mainMenu).toBeVisible()
    await expect.element(linkMenu).not.toBeVisible()

    // Show the link menu
    await userEvent.click(linkButton)
    await expect.element(mainMenu).toBeVisible()
    await expect.element(linkMenu).toBeVisible()

    // The text selection should expand to include the whole link
    expect(getSelectedText()).toEqual('world')

    // Remove the link
    await expect.element(linkMenu).toBeVisible()
    await expect.element(linkMenu.getByRole('textbox')).toHaveValue(
      'https://www.example.com',
    )
    await userEvent.click(linkMenu.getByRole('button', { name: 'Remove link' }).element())
    await expect.element(mainMenu).toBeVisible()
    await expect.element(linkMenu).not.toBeVisible()
    expect(linkTag).not.toBeInTheDocument()
    expect(editor.element().textContent).toContain('world')
  })
})

async function setup() {
  const editor = await waitForEditor()

  const mainMenu = page.locate('[data-testid="inline-menu-main"]')
  const linkMenu = page.locate('[data-testid="inline-menu-link"]')
  const linkInput = page.getByPlaceholder('Paste the link...')
  const linkTag = editor.locate('a[href="https://www.example.com"]')

  await emptyEditor({ editor })

  const selectTextFromEnd = async (expectedText: string) => {
    expect(getSelectedText()).toEqual('')

    for (let i = 0; i < expectedText.length; i++) {
      await extendSelection('backward', 1)
      expect(getSelectedText()).toEqual(expectedText.slice(-i - 1))
    }

    expect(getSelectedText()).toEqual(expectedText)
  }

  const typeAndSelect = async () => {
    // Type "Hello world"
    await userEvent.click(editor)
    await collapseSelection('end')
    await userEvent.type(editor, 'Hello world')

    // Select the word "world"
    await selectTextFromEnd('world')
    expect(getSelectedText()).toEqual('world')
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
