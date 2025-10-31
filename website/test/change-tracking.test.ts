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
  expectLocatorToHaveCount,
  testStory,
  testStoryConsistency,
} from './helpers'

testStoryConsistency('change-tracking')

testStory('change-tracking', () => {
  it('save commits and restore previous version', async () => {
    const editor = page.locate('div.ProseMirror[contenteditable="true"]').first()
    await expect.element(editor).toBeVisible()

    // Start from empty and type Version A
    await emptyEditor({ editor })
    await expect.element(editor).toHaveTextContent('')
    await userEvent.type(editor, 'Version A')
    await expect.element(editor).toHaveTextContent('Version A')

    const save = page.getByRole('button', { name: 'Save' })
    await expect.element(save).toBeVisible()
    await save.click()

    // A commit should appear with a Restore button
    const restoreButtons = page.getByRole('button', { name: 'Restore' })
    await expectLocatorToHaveCount(restoreButtons, 1)
    await expect.element(restoreButtons.first()).toBeVisible()

    // Change content to Version B and save again
    await emptyEditor({ editor })
    await expect.element(editor).toHaveTextContent('')
    await userEvent.type(editor, 'Version B')
    await expect.element(editor).toHaveTextContent('Version B')
    await expect.element(save).toBeVisible()
    await save.click()

    // Now there should be two commits; restore the older one (index 1)
    await expectLocatorToHaveCount(restoreButtons, 2)
    await expect.element(restoreButtons.nth(1)).toBeVisible()
    await restoreButtons.nth(1).click()

    // The main editor should re-mount and show Version A
    await expect.element(editor).toHaveTextContent('Version A')
  })
})
