import { expect, it } from 'vitest'
import { page, userEvent } from 'vitest/browser'

import { emptyEditor, testStory, testStoryConsistency, waitForEditor } from './helpers'

testStoryConsistency('user-menu')

testStory('user-menu', () => {
  it('insert user and tag mentions via autocomplete', async () => {
    const editor = await waitForEditor()

    await emptyEditor({ editor })
    await editor.click()

    // Trigger user menu with @
    await userEvent.type(editor, '@')
    await userEvent.type(editor, 'ali')
    const userItem = page.locate('[role="option"]', { hasText: 'Alice' }).nth(0)
    await expect.element(userItem).toBeVisible()
    await userItem.click()
    await expect.element(editor.locate('span[data-mention="user"]', { hasText: '@Alice' })).toBeVisible()

    // Trigger tag menu with #
    await userEvent.type(editor, '#')
    await userEvent.type(editor, 'tech')
    const tagItem = page.locate('[role="option"]', { hasText: 'technology' }).nth(0)
    await expect.element(tagItem).toBeVisible()
    await tagItem.click()
    await expect.element(editor.locate('span[data-mention="tag"]', { hasText: '#technology' })).toBeVisible()
  })
})
