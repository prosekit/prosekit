import { expect, it } from 'vitest'
import { page, userEvent } from 'vitest/browser'

import {
  collapseSelection,
  emptyEditor,
  expectLocatorToHaveCount,
  extendSelection,
  testStory,
  testStoryConsistency,
  waitForEditor,
} from './helpers'

testStoryConsistency('unmount', {
  setup: async () => {
    const button = page.locate('button')
    const buttonAdd = button.filter({ hasText: 'Add editor' })
    await expect.element(buttonAdd).toBeInTheDocument()
    await buttonAdd.click()
  },
})

testStory('unmount', () => {
  it('unmount', async () => {
    const editor = page.locate('.ProseMirror')
    const button = page.locate('button')
    const buttonAdd = button.filter({ hasText: 'Add editor' })
    const buttonRemove = (no: number) => button.filter({ hasText: `Unmount No.${no}` })
    const placeholder = (no: number) => editor.locate(`p[data-placeholder='Editor No.${no}']`)

    await expectLocatorToHaveCount(editor, 0)

    await buttonAdd.click()
    await expectLocatorToHaveCount(editor, 1)
    await expect.element(placeholder(1)).toBeInTheDocument()

    await buttonAdd.click()
    await expectLocatorToHaveCount(editor, 2)
    await expect.element(placeholder(1)).toBeInTheDocument()
    await expect.element(placeholder(2)).toBeInTheDocument()

    await buttonAdd.click()
    await expectLocatorToHaveCount(editor, 3)
    await expect.element(placeholder(1)).toBeInTheDocument()
    await expect.element(placeholder(2)).toBeInTheDocument()
    await expect.element(placeholder(3)).toBeInTheDocument()

    await buttonRemove(1).click()
    await expectLocatorToHaveCount(editor, 2)
    await expect.element(placeholder(1)).not.toBeInTheDocument()
    await expect.element(placeholder(2)).toBeInTheDocument()
    await expect.element(placeholder(3)).toBeInTheDocument()

    await buttonRemove(3).click()
    await expectLocatorToHaveCount(editor, 1)
    await expect.element(placeholder(1)).not.toBeInTheDocument()
    await expect.element(placeholder(2)).toBeInTheDocument()
    await expect.element(placeholder(3)).not.toBeInTheDocument()

    await buttonRemove(2).click()
    await expectLocatorToHaveCount(editor, 0)

    await buttonAdd.click()
    await expectLocatorToHaveCount(editor, 1)
    await expect.element(placeholder(1)).not.toBeInTheDocument()
    await expect.element(placeholder(2)).not.toBeInTheDocument()
    await expect.element(placeholder(3)).not.toBeInTheDocument()
    await expect.element(placeholder(4)).toBeInTheDocument()

    await buttonAdd.click()
    await expectLocatorToHaveCount(editor, 2)
    await expect.element(placeholder(1)).not.toBeInTheDocument()
    await expect.element(placeholder(2)).not.toBeInTheDocument()
    await expect.element(placeholder(3)).not.toBeInTheDocument()
    await expect.element(placeholder(4)).toBeInTheDocument()
    await expect.element(placeholder(5)).toBeInTheDocument()
  })

  it('inline menu', async () => {
    const editor = page.locate('.ProseMirror')
    const button = page.locate('button')
    const buttonAdd = button.filter({ hasText: 'Add editor' })
    const buttonRemove = button.filter({ hasText: 'Unmount' })

    await expectLocatorToHaveCount(editor, 0)

    await buttonAdd.click()
    await expectLocatorToHaveCount(editor, 1)

    const editorEl = await waitForEditor()
    await emptyEditor({ editor: editorEl })

    // Type text and select it
    await userEvent.click(editorEl)
    await userEvent.type(editorEl, 'Hello world')
    await extendSelection('backward', 5)

    // The inline menu should be visible
    const mainMenu = page.locate('[data-testid="inline-menu-main"]')
    await expect.element(mainMenu).toBeVisible()

    // Collapse selection to dismiss the menu
    await collapseSelection('end')
    await expect.element(mainMenu).not.toBeVisible()

    // Unmount the editor and verify no editors remain
    await buttonRemove.click()
    await expectLocatorToHaveCount(editor, 0)
  })
})
