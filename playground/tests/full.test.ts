import { expect, test } from '@playwright/test'

import { locateEditor, testStory, waitForEditor } from './helper'
import { testInlineMenu } from './inline-menu'

testStory('full', () => {
  test.describe('link', () => {
    test('press Space to insert a link', async ({ page }) => {
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
      await expect(a).toHaveText('https://www.example.com?query=query#fragment')
    })

    test('press Space to insert a link ends with a period', async ({
      page,
    }) => {
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
      await expect(a).toHaveText('https://www.example.com?query=query#fragment')
    })

    test('press Enter to insert a link ends with a period', async ({
      page,
    }) => {
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
    test('slash menu', async ({ page }) => {
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

    test('list', async ({ page }) => {
      const editor = await waitForEditor(page)

      expect(await editor.innerHTML()).not.toContain('data-list-kind="task"')
      expect(await editor.innerHTML()).not.toContain('data-list-kind="ordered"')

      await editor.pressSequentially('/task')
      await editor.press('Enter')

      expect(await editor.innerHTML()).toContain('data-list-kind="task"')

      await editor.press('Backspace')
      await editor.press('Backspace')
      await editor.press('Backspace')
      await editor.press('Backspace')
      await editor.pressSequentially('Some text ')
      await editor.pressSequentially('/order')
      await editor.press('Enter')

      expect(await editor.innerHTML()).toContain('data-list-kind="ordered"')
    })
  })

  test.describe('mark input rules', () => {
    test('bold', async ({ page }) => {
      const editor = await waitForEditor(page)

      await editor.pressSequentially('**bold** **no bold **')
      await editor.press('Enter')
      await editor.pressSequentially('*****')
      await editor.press('Enter')
      await editor.pressSequentially('no**bold**')
      await editor.press('Enter')
      await editor.pressSequentially('**no*bold**')

      expect(await editor.innerHTML()).toEqual(
        [
          '<p><strong>bold</strong> **no bold **</p>',
          '<p>*****</p>',
          '<p>no**bold**</p>',
          '<p>**no*bold**</p>',
        ].join(''),
      )
    })

    test('italic', async ({ page }) => {
      const editor = await waitForEditor(page)

      await editor.pressSequentially('*italic* *no italic *')
      await editor.press('Enter')
      await editor.pressSequentially('***')
      await editor.press('Enter')
      await editor.pressSequentially('no*italic*')

      expect(await editor.innerHTML()).toEqual(
        [
          '<p><em>italic</em> *no italic *</p>',
          '<p>***</p>',
          '<p>no*italic*</p>',
        ].join(''),
      )
    })

    test('code', async ({ page }) => {
      const editor = await waitForEditor(page)

      await editor.pressSequentially('`code` `no code `')
      await editor.press('Enter')
      await editor.pressSequentially('`` ``')
      await editor.press('Enter')
      await editor.pressSequentially('no`code`')

      expect(await editor.innerHTML()).toEqual(
        [
          '<p><code>code</code> `no code `</p>',
          '<p>`` ``</p>',
          '<p>no`code`</p>',
        ].join(''),
      )
    })

    test('strike', async ({ page }) => {
      const editor = await waitForEditor(page)

      await editor.pressSequentially('~~strike~~ ~~no strike ~~')
      await editor.press('Enter')
      await editor.pressSequentially('~~~~~')
      await editor.press('Enter')
      await editor.pressSequentially('no~~strike~~')
      await editor.press('Enter')
      await editor.pressSequentially('~~no~strike~~')

      expect(await editor.innerHTML()).toEqual(
        [
          '<p><s>strike</s> ~~no strike ~~</p>',
          '<p>~~~~~</p>',
          '<p>no~~strike~~</p>',
          '<p>~~no~strike~~</p>',
        ].join(''),
      )
    })
  })

  test.describe('inline menu', () => {
    test('select text', async ({ page }) => {
      await testInlineMenu(page)
    })
  })
})
