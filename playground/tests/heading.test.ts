import { test, expect } from '@playwright/test'

import { locateEditor, getExamples } from './helper'

test.describe('heading', () => {
  for (const { url, name } of getExamples('heading'))
    test(name, async ({ page }) => {
      await page.goto(url)
      const editor = locateEditor(page)

      await editor.click()

      await expect(editor.locator('h1')).not.toBeVisible()
      await expect(editor.locator('h2')).not.toBeVisible()

      await page.keyboard.press('#')
      await page.keyboard.press(' ')
      await page.keyboard.type('Heading Level 1')

      await expect(editor.locator('h1')).toBeVisible()
      await expect(editor.locator('h1')).toHaveText('Heading Level 1')

      await page.keyboard.press('Enter')
      await page.keyboard.type('## Heading Level 2')

      await expect(editor.locator('h2')).toBeVisible()
      await expect(editor.locator('h2')).toHaveText('Heading Level 2')
    })
})
