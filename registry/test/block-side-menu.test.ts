import { expect, it } from 'vitest'
import { keyboard } from 'vitest-browser-commands/playwright'
import { page, userEvent } from 'vitest/browser'

import { expectLocatorToHaveCount, hover, testStory, waitForAnimationEnd, waitForEditor } from './helpers'

testStory({ story: 'block-side-menu', emptyContent: true }, () => {
  it('renders the side menu from the framework layer', async () => {
    const editor = await waitForEditor()
    await editor.click()
    await userEvent.type(editor, 'Paragraph 1')
    await keyboard.press('Enter')
    await userEvent.type(editor, 'Paragraph 2')

    await expectLocatorToHaveCount(page.locate('prosekit-block-handle-draggable'), 0)

    const root = page.locate('prosekit-block-handle-root')
    const firstBlock = editor.locate('p', { hasText: 'Paragraph 1' })
    const secondBlock = editor.locate('p', { hasText: 'Paragraph 2' })
    await hover(firstBlock)

    await expect.element(root).toHaveAttribute('data-block-side-menu-state', 'paragraph:0')
    await waitForAnimationEnd(page.locate('prosekit-block-handle-popup'))

    const dragHandle = page.getByTestId('block-side-menu-drag')
    await dragHandle.click()

    const menu = page.getByTestId('block-side-menu')
    await expect.element(menu).toHaveAttribute('data-state', 'open')
    await expect.element(menu).toBeVisible()

    await hover(secondBlock)
    await expect.element(menu).toHaveAttribute('data-state', 'closed')

    await dragHandle.click()
    await expect.element(menu).toHaveAttribute('data-state', 'open')

    await page.getByTestId('block-side-menu-heading-1').click()
    await expect.element(editor.locate('h1', { hasText: 'Paragraph 2' })).toBeVisible()
    await expect.element(menu).toHaveAttribute('data-state', 'closed')
  })
})
