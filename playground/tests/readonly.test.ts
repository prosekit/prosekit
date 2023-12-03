import { expect, test } from '@playwright/test'

import { locateEditor, getExamples } from './helper'

test.describe('readonly', () => {
  for (const { url, name } of getExamples('readonly')) {
    test(name, async ({ page }) => {
      await page.goto(url)
      const editor = locateEditor(page)

      const readonlyButton = page.getByRole('button', { name: 'Readonly' })
      const editableButton = page.getByRole('button', { name: 'Editable' })

      // await expect(editableButton).toHaveAttribute('data-state', 'on')
      // await expect(readonlyButton).toHaveAttribute('data-state', 'off')

      await editableButton.click()
      await editor.click()
      await editor.pressSequentially('foo')
      await expect(editor).toContainText('foo')

      await readonlyButton.click()
      await editor.click()
      await editor.pressSequentially('bar')
      await expect(editor).toContainText('foo')
      await expect(editor).not.toContainText('bar')

      await editableButton.click()
      await editor.click()
      await editor.pressSequentially('baz')
      await expect(editor).toContainText('foo')
      await expect(editor).not.toContainText('bar')
      await expect(editor).toContainText('baz')
    })
  }
})
