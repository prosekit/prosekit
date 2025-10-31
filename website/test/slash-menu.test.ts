import {
  expect,
  it,
} from 'vitest'
import {
  page,
  userEvent,
} from 'vitest/browser'

import {
  emptyEditor,
  expectEditorToBeFocused,
  expectLocatorToBeHidden,
  expectLocatorToHaveCount,
  getEditorHTML,
  testStory,
  testStoryConsistency,
  waitForEditor,
} from './helpers'

testStoryConsistency('slash-menu')
testStoryConsistency('full')

testStory(['slash-menu', 'full'], () => {
  it('execute command', async () => {
    const { editor, menu, itemH1 } = await setup()

    await editor.click()
    await expect.element(menu).not.toBeVisible()
    await userEvent.type(editor, '/')
    await expect.element(menu).toBeVisible()

    await expectLocatorToHaveCount(editor.locate('h1'), 0)
    await expect.element(itemH1).toBeVisible()
    await itemH1.click()
    await expectLocatorToHaveCount(editor.locate('h1'), 1)
  })

  it('filter items by typing', async () => {
    const { editor, menu, itemH1, itemH2 } = await setup()

    await editor.click()
    await expect.element(menu).not.toBeVisible()
    await userEvent.type(editor, '/')
    await expect.element(menu).toBeVisible()
    await expect.element(itemH1).toBeVisible()
    await expect.element(itemH2).toBeVisible()

    await userEvent.type(editor, 'heading2')
    await expect.element(itemH1).not.toBeVisible()
    await expect.element(itemH2).toBeVisible()
  })

  it('ignore slash followed by a space', async () => {
    const { editor, menu } = await setup()

    await editor.click()
    await expect.element(menu).not.toBeVisible()
    await userEvent.type(editor, '/')
    await expect.element(menu).toBeVisible()
    await userEvent.keyboard('{Space}')
    await expect.element(menu).not.toBeVisible()
  })

  it('press Escape to hide the menu', async () => {
    const { editor, menu } = await setup()

    await editor.click()
    await expect.element(menu).not.toBeVisible()
    await userEvent.type(editor, '/')
    await expect.element(menu).toBeVisible()
    await userEvent.keyboard('{Escape}')
    await expect.element(menu).not.toBeVisible()
    await userEvent.type(editor, 'heading')
    await expect.element(menu).not.toBeVisible()
  })

  it('remember hidden positions', async () => {
    const { editor, menu } = await setup()
    await editor.click()

    // Enter /head in the first paragraph, and dismiss the menu
    await expect.element(menu).not.toBeVisible()
    await userEvent.type(editor, '/')
    await expect.element(menu).toBeVisible()
    await userEvent.keyboard('{Escape}')
    await expect.element(menu).not.toBeVisible()
    await userEvent.type(editor, 'head')
    await expect.element(menu).not.toBeVisible()

    // Create a new paragraph
    await userEvent.keyboard('{Enter}')

    // Enter /head in the second paragraph, and dismiss the menu
    await expect.element(menu).not.toBeVisible()
    await userEvent.type(editor, '/')
    await expect.element(menu).toBeVisible()
    await userEvent.keyboard('{Escape}')
    await expect.element(menu).not.toBeVisible()
    await userEvent.type(editor, 'head')
    await expect.element(menu).not.toBeVisible()

    // Verify the content in the editor
    expect(getEditorHTML().replaceAll(/\s/g, '')).toEqual('<p>/head</p><p>/head</p>')

    // Move the cursor back to the first paragraph
    await userEvent.keyboard('{ArrowUp}')

    // Enter text and the menu should still be hidden
    await expect.element(menu).not.toBeVisible()
    await userEvent.type(editor, 'ing')
    await expect.element(menu).not.toBeVisible()

    // Move the cursor back to the second paragraph
    await userEvent.keyboard('{ArrowDown}')

    // Enter text and the menu should still be hidden
    await expect.element(menu).not.toBeVisible()
    await userEvent.type(editor, 'ing')
    await expect.element(menu).not.toBeVisible()

    // Verify the content in the editor
    expect(getEditorHTML().replaceAll(/\s/g, '')).toEqual('<p>/heading</p><p>/heading</p>')

    // Create the third paragraph
    await userEvent.keyboard('{Enter}')

    // Ensure the menu is working again
    await expect.element(menu).not.toBeVisible()
    await userEvent.type(editor, '/')
    await userEvent.type(editor, 'head')
    await expect.element(menu).toBeVisible()
  })

  it('prevent focus loss when clicking menu items', async () => {
    const { editor, focusedItem } = await setup()
    const blockquote = editor.locate('blockquote')

    // Show the menu
    await expectLocatorToBeHidden(focusedItem)
    await editor.click()
    await userEvent.type(editor, '/')
    await userEvent.type(editor, 'quote')
    await expect.element(focusedItem).toBeVisible()
    await expect.element(focusedItem).toHaveTextContent('Quote')

    // Click the menu item to insert a blockquote
    await expectLocatorToHaveCount(blockquote, 0)
    await focusedItem.click()
    await expectLocatorToBeHidden(focusedItem)
    await expectLocatorToHaveCount(blockquote, 1)

    // Ensure that the editor is still focused
    await expectEditorToBeFocused()
  })

  it('prevent focus loss when pressing Enter', async () => {
    const { editor, focusedItem } = await setup()
    const blockquote = editor.locate('blockquote')

    // Show the menu
    await expectLocatorToBeHidden(focusedItem)
    await editor.click()
    await userEvent.type(editor, '/')
    await userEvent.type(editor, 'quote')
    await expect.element(focusedItem).toBeVisible()
    await expect.element(focusedItem).toHaveTextContent('Quote')

    // Press Enter to insert a blockquote
    await expectLocatorToHaveCount(blockquote, 0)
    await userEvent.keyboard('{Enter}')
    await expectLocatorToBeHidden(focusedItem)
    await expectLocatorToHaveCount(blockquote, 1)

    // Ensure that the editor is still focused
    await expectEditorToBeFocused()
  })

  it('insert list', async () => {
    const { editor, focusedItem } = await setup()

    const taskList = editor.locate('div[data-list-kind="task"]')
    const orderedList = editor.locate('div[data-list-kind="ordered"]')

    await expectLocatorToHaveCount(taskList, 0)
    await expectLocatorToHaveCount(orderedList, 0)

    await userEvent.type(editor, '/task')
    await expect.element(focusedItem).toHaveTextContent('Task list')

    await userEvent.keyboard('{Enter}')
    await expect.element(taskList).toBeVisible()

    await userEvent.keyboard('{Backspace}{Backspace}{Backspace}{Backspace}')
    await userEvent.type(editor, 'Some text ')
    await userEvent.type(editor, '/order')
    await expect.element(focusedItem).toHaveTextContent('Ordered list')

    await userEvent.keyboard('{Enter}')
    await expect.element(orderedList).toBeVisible()
  })

  it('insert blockquote', async () => {
    const { editor, focusedItem } = await setup()

    const blockquote = editor.locate('blockquote')

    await expectLocatorToHaveCount(blockquote, 0)

    await userEvent.type(editor, '/quote')
    await expect.element(focusedItem).toHaveTextContent('Quote')

    await userEvent.keyboard('{Enter}')
    await expectLocatorToHaveCount(blockquote, 1)
  })

  it('press arrow keys to select item', async () => {
    const { editor, itemText, itemH1, itemH2, focusedItem } = await setup()

    await editor.click()
    await userEvent.type(editor, '/')
    await expect.element(itemText).toBeVisible()
    await expect.element(itemH1).toBeVisible()
    await expect.element(itemH2).toBeVisible()
    await expect.element(itemText).toHaveTextContent('Text')

    await userEvent.keyboard('{ArrowDown}')
    await expect.element(focusedItem).toHaveTextContent('Heading 1')

    await userEvent.keyboard('{ArrowDown}')
    await expect.element(focusedItem).toHaveTextContent('Heading 2')

    await userEvent.keyboard('{ArrowDown}')
    await expect.element(focusedItem).toHaveTextContent('Heading 3')

    await userEvent.keyboard('{ArrowDown}')
    await expect.element(focusedItem).not.toHaveTextContent(/Heading/)

    await userEvent.keyboard('{ArrowUp}')
    await expect.element(focusedItem).toHaveTextContent('Heading 3')

    await expectLocatorToHaveCount(editor.locate('h3'), 0)
    await userEvent.keyboard('{Enter}')
    await expect.element(editor.locate('h3')).toBeVisible()
  })

  it('should not show menu when typing a http link', async () => {
    const { editor, menu } = await setup()

    await editor.click()
    await userEvent.keyboard('{Enter}')
    await expect.element(menu).not.toBeVisible()
    for (const char of 'https://example.com/foo.bar/') {
      await userEvent.type(editor, char)
      await expect.element(menu).not.toBeVisible()
    }

    // Make sure the menu is still functional
    await userEvent.keyboard('{Space}')
    await userEvent.type(editor, '/')
    await expect.element(menu).toBeVisible()
  })
})

async function setup() {
  const editor = await waitForEditor()
  await emptyEditor({ editor })

  const item = page.locate('prosekit-autocomplete-item')

  const itemText = item.filter({ hasText: 'Text' }).first()
  const itemH1 = item.filter({ hasText: 'Heading 1' }).first()
  const itemH2 = item.filter({ hasText: 'Heading 2' }).first()

  const focusedItem = page.locate('prosekit-autocomplete-item[data-focused="true"] > span')

  const menu = page
    .locate('prosekit-autocomplete-popover')
    .filter({ has: itemH1 })

  return {
    editor,
    menu,
    itemText,
    itemH1,
    itemH2,
    focusedItem,
  }
}
