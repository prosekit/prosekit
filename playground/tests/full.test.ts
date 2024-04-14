import { expect, test } from '@playwright/test'

import { getExamples, locateEditor, waitForEditor } from './helper'

for (const example of getExamples('full')) {
  test.describe(example, () => {
    test.describe('link', () => {
      test('press Space to insert a link', async ({ page }) => {
        await page.goto(example)
        const editor = locateEditor(page)
        const a = editor.locator('a')

        await editor.pressSequentially('Hello ')
        await editor.pressSequentially(
          'https://www.example.com?query=query#fragment',
        )

        await expect(editor).toHaveText(
          'Hello https://www.example.com?query=query#fragment',
        )
        await expect(a).not.toBeVisible()

        await editor.pressSequentially(' ')
        await expect(editor).toHaveText(
          'Hello https://www.example.com?query=query#fragment ',
        )
        await expect(a).toBeVisible()
        await expect(a).toHaveAttribute(
          'href',
          'https://www.example.com?query=query#fragment',
        )
        await expect(a).toHaveText(
          'https://www.example.com?query=query#fragment',
        )
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
        await editor.pressSequentially(
          'https://www.example.com?query=query#fragment',
        )

        await expect(editor).toHaveText(
          'Hello https://www.example.com?query=query#fragment',
        )
        await expect(a).not.toBeVisible()

        await editor.press('Enter')
        await expect(editor).toHaveText(
          'Hello https://www.example.com?query=query#fragment',
        )
        await expect(a).toBeVisible()
        await expect(a).toHaveAttribute(
          'href',
          'https://www.example.com?query=query#fragment',
        )
        await expect(a).toHaveText(
          'https://www.example.com?query=query#fragment',
        )
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

    test.describe('slash menu', () => {
      test('press Space to insert a link', async ({ page }) => {
        await page.goto(example)
        const editor = await waitForEditor(page)

        const getPopovers = async () => {
          const locator = page.locator('prosekit-autocomplete-popover')
          return await locator.all()
        }

        const getVisiblePopoverCount = async () => {
          const locators = await getPopovers()
          let count = 0
          for (const locator of locators) {
            if (await locator.isVisible()) {
              count += 1
            }
          }
          return count
        }

        await editor.pressSequentially('Hello ')
        expect(await getVisiblePopoverCount()).toBe(0)

        await editor.pressSequentially('/')
        expect(await getVisiblePopoverCount()).toBe(1)

        await editor.press('Escape')
        expect(await getVisiblePopoverCount()).toBe(0)
      })
    })
  })
}
