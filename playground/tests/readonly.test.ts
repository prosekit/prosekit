import { expect, test } from '@playwright/test'

import { testStory, waitForEditor } from './helper'

testStory('readonly', ({ example }) => {
  test('readonly', async ({ page }) => {
    await page.goto(example)
    const editor = await waitForEditor(page)

    await expect(editor).toContainText(
      'The content is readonly. Press the buttons above to toggle the readonly mode.',
    )

    const readonlyButton = page.getByRole('button', { name: 'Readonly' })
    const editableButton = page.getByRole('button', { name: 'Editable' })

    await expect(readonlyButton).toHaveAttribute('data-state', 'on')
    await expect(editableButton).toHaveAttribute('data-state', 'off')

    await expect(editor).not.toContainText('foo')
    await expect(editor).not.toContainText('bar')
    await expect(editor).not.toContainText('baz')

    await editableButton.click()
    await editor.click()
    await editor.pressSequentially('foo')
    await expect(editor).toContainText('foo')
    await expect(editor).not.toContainText('bar')
    await expect(editor).not.toContainText('baz')

    await readonlyButton.click()
    await editor.click()
    await editor.pressSequentially('bar')
    await expect(editor).toContainText('foo')
    await expect(editor).not.toContainText('bar')
    await expect(editor).not.toContainText('baz')

    await editableButton.click()
    await editor.click()
    await editor.pressSequentially('baz')
    await expect(editor).toContainText('foo')
    await expect(editor).not.toContainText('bar')
    await expect(editor).toContainText('baz')
  })
})
