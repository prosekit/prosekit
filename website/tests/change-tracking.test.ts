import {
  expect,
  test,
} from '@playwright/test'

import { testStory } from './helper'

testStory('change-tracking', () => {
  test('save commits and restore previous version', async ({ page }) => {
    const editor = page.locator('div.ProseMirror[contenteditable="true"]').first()
    await editor.waitFor({ state: 'visible' })

    // Start from empty and type Version A
    await editor.focus()
    await editor.press('ControlOrMeta+a')
    await editor.press('Backspace')
    await editor.press('Backspace')
    await expect(editor).toHaveText('')
    await editor.pressSequentially('Version A')
    await expect(editor).toHaveText('Version A')

    const save = page.getByRole('button', { name: 'Save' })
    await expect(save).toBeVisible()
    await save.click()

    // A commit should appear with a Restore button
    const restoreButtons = page.getByRole('button', { name: 'Restore' })
    await expect(restoreButtons.first()).toBeVisible()

    // Change content to Version B and save again
    await editor.focus()
    await editor.press('ControlOrMeta+a')
    await editor.press('Backspace')
    await editor.press('Backspace')
    await expect(editor).toHaveText('')
    await editor.pressSequentially('Version B')
    await expect(editor).toHaveText('Version B')
    await expect(save).toBeVisible()
    await save.click()

    // Now there should be two commits; restore the older one (index 1)
    await expect(restoreButtons.nth(1)).toBeVisible()
    await restoreButtons.nth(1).click()

    // The main editor should re-mount and show Version A
    const editorAfter = page.locator('div.ProseMirror[contenteditable="true"]').first()
    await expect(editorAfter).toHaveText('Version A')
  })
})
