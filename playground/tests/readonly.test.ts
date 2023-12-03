import { expect, test } from '@playwright/test'

import { locateEditor, getExamples } from './helper'

test.describe('readonly', () => {
  for (const { url, name } of getExamples('readonly')) {
    test(name, async ({ page }) => {
      await page.goto(url)
      const editor = locateEditor(page)

      await page.getByRole('button', { name: 'Editable' }).click()
      await editor.click()
      await editor.pressSequentially('foo')
      await expect(editor).toHaveText('foo')

      await page.getByRole('button', { name: 'Readonly' }).click()
      await editor.click()
      await editor.pressSequentially('bar')
      await expect(editor).toHaveText('foo')
      await expect(editor).not.toHaveText('bar')

      await page.getByRole('button', { name: 'Editable' }).click()
      await editor.click()
      await editor.pressSequentially('baz')
      await expect(editor).toHaveText('foo')
      await expect(editor).not.toHaveText('bar')
      await expect(editor).toHaveText('baz')
    })
  }
})
