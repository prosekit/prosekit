import { expect, test } from '@playwright/test'

import { locateEditor, getExamples } from './helper'

test.describe('keymap', () => {
  for (const { url, name } of getExamples('keymap')) {
    test(name, async ({ page }) => {
      // TODO: fix it
      if (name === 'solid-keymap') return

      await page.goto(url)
      const editor = locateEditor(page)

      await expect(page.getByRole('listitem')).toHaveCount(0)

      await page
        .getByRole('button', { name: 'Submit with Shift + Enter' })
        .click()

      await editor.click()
      await editor.press('Shift+Enter')
      await expect(page.getByRole('listitem')).toHaveCount(1)

      await editor.click()
      await editor.press('Control+Enter')
      await expect(page.getByRole('listitem')).toHaveCount(1)

      await page
        .getByRole('button', { name: 'Submit with Ctrl + Enter' })
        .click()

      await editor.click()
      await editor.press('Shift+Enter')
      await expect(page.getByRole('listitem')).toHaveCount(1)

      await editor.click()
      await editor.press('Control+Enter')
      await expect(page.getByRole('listitem')).toHaveCount(2)
    })
  }
})
