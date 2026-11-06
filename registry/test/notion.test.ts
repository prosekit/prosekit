import { expect, it } from 'vitest'
import { keyboard } from 'vitest-browser-commands/playwright'
import { page, userEvent } from 'vitest/browser'

import { expectLocatorToHaveCount, hover, testStory, waitForEditor } from './helpers'

testStory({ story: 'notion', emptyContent: true }, () => {
  it('renders the block side menu from the React layer', async () => {
    const editor = await waitForEditor()
    await editor.click()
    await userEvent.type(editor, 'Paragraph 1')
    await keyboard.press('Enter')
    await userEvent.type(editor, 'Paragraph 2')

    await expectLocatorToHaveCount(page.locate('prosekit-block-handle-draggable'), 0)

    const firstBlock = editor.locate('p', { hasText: 'Paragraph 1' })
    const secondBlock = editor.locate('p', { hasText: 'Paragraph 2' })

    await hover(firstBlock)

    const dragHandle = page.getByTestId('notion-block-side-menu-drag')
    await dragHandle.click()

    const menuPopup = page.getByTestId('notion-block-menu-popup')
    await expect.element(menuPopup).toBeVisible()

    await hover(secondBlock)
    await expectLocatorToHaveCount(page.locate('[data-testid="notion-block-menu-popup"]'), 0)

    await dragHandle.click()
    await page.getByTestId('notion-block-menu-turn-into').click()
    await page.getByTestId('notion-block-menu-h1').click()

    await expect.element(editor.locate('h1', { hasText: 'Paragraph 2' })).toBeVisible()
  })
})
