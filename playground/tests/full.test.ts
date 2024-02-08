import { expect, test } from '@playwright/test'

import { getExamples, locateEditor } from './helper'

for (const example of getExamples('full')) {
  test.describe(example, () => {
    test.describe('link', () => {
      test('press Space to insert a link', async ({ page }) => {
        await page.goto(example)
        const editor = locateEditor(page)
        const a = editor.locator('a')

        await editor.pressSequentially('Hello ')
        await editor.pressSequentially('www.example.com')

        await expect(editor).toHaveText('Hello www.example.com')
        await expect(a).not.toBeVisible()

        await editor.pressSequentially(' ')
        await expect(editor).toHaveText('Hello www.example.com ')
        await expect(a).toBeVisible()
        await expect(a).toHaveAttribute('href', 'www.example.com')
        await expect(a).toHaveText('www.example.com')
      })

      test('press Space to insert a link ends with a period', async ({
        page,
      }) => {
        await page.goto(example)
        const editor = locateEditor(page)
        const a = editor.locator('a')

        await editor.pressSequentially('Hello ')
        await editor.pressSequentially('https://example.com.')

        await expect(editor).toHaveText('Hello https://example.com.')
        await expect(a).not.toBeVisible()

        await editor.pressSequentially(' ')
        await expect(editor).toHaveText('Hello https://example.com. ')
        await expect(a).toBeVisible()
        await expect(a).toHaveAttribute('href', 'https://example.com')
        await expect(a).toHaveText('https://example.com')
      })

      test('press Enter to insert', async ({ page }) => {
        await page.goto(example)
        const editor = locateEditor(page)
        const a = editor.locator('a')

        await editor.pressSequentially('Hello ')
        await editor.pressSequentially('www.example.com')

        await expect(editor).toHaveText('Hello www.example.com')
        await expect(a).not.toBeVisible()

        await editor.press('Enter')
        await expect(editor).toHaveText('Hello www.example.com')
        await expect(a).toBeVisible()
        await expect(a).toHaveAttribute('href', 'www.example.com')
        await expect(a).toHaveText('www.example.com')
      })

      test('press Enter to insert a link ends with a period', async ({
        page,
      }) => {
        await page.goto(example)
        const editor = locateEditor(page)
        const a = editor.locator('a')

        await editor.pressSequentially('Hello ')
        await editor.pressSequentially('https://example.com.')

        await expect(editor).toHaveText('Hello https://example.com.')
        await expect(a).not.toBeVisible()

        await editor.press('Enter')
        await expect(editor).toHaveText('Hello https://example.com.')
        await expect(a).toBeVisible()
        await expect(a).toHaveAttribute('href', 'https://example.com')
        await expect(a).toHaveText('https://example.com')
      })
    })
  })
}
