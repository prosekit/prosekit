import { expect, it } from 'vitest'
import { page, userEvent } from 'vitest/browser'

import { expectLocatorToHaveCount, hover, testStory, waitForAnimationEnd, waitForEditor } from './helpers'

testStory({ story: 'block-side-menu', emptyContent: true }, () => {
  it('renders the side menu from the framework layer', async () => {
    const editor = await waitForEditor()
    await editor.click()
    await userEvent.type(editor, 'Paragraph')

    await expectLocatorToHaveCount(page.locate('prosekit-block-handle-draggable'), 0)

    const root = page.locate('prosekit-block-handle-root')
    const block = editor.locate('p', { hasText: 'Paragraph' })
    await hover(block)

    await expect.element(root).toHaveAttribute('data-block-side-menu-state', 'paragraph:0')
    await waitForAnimationEnd(page.locate('prosekit-block-handle-popup'))

    const dragHandle = page.getByTestId('block-side-menu-drag')
    await dragHandle.click()

    const menu = page.getByTestId('block-side-menu')
    await expect.element(menu).toHaveAttribute('data-state', 'open')
    await expect.element(menu).toBeVisible()
  })
})
