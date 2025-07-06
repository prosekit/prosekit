import {
  expect,
  test,
} from '@playwright/test'

import {
  emptyEditor,
  getEditorHTML,
  locateEditor,
  testStory,
  waitForEditor,
} from './helper'

testStory('full', () => {
  test('default content', async ({ page }) => {
    const check = async () => {
      const html = await getEditorHTML(page)
      expect(html).toContain('ProseKit')
    }
    await expect(check).toPass()
  })
})

testStory('full', () => {
  test.beforeEach(async ({ page }) => {
    await emptyEditor(page)
  })

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

    test('press Space to insert a link ends with a period', async ({ page }) => {
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

    test('press Enter to insert a link ends with a period', async ({ page }) => {
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

  test.describe('toolbar', () => {
    test('press Space to insert an image', async ({ page }) => {
      await emptyEditor(page)
      const editor = locateEditor(page)
      await editor.focus()

      await editor.pressSequentially('Foo')
      await expect(editor.locator('p', { hasText: 'Foo' })).toBeVisible()

      // Press H1 button
      const h1Button = page.locator('button', { hasText: 'Heading 1' })
      await h1Button.click()
      await expect(editor.locator('h1', { hasText: 'Foo' })).toBeVisible()
      await expect(editor.locator('p', { hasText: 'Foo' })).toBeHidden()

      // Press H2 button
      const h2Button = page.locator('button', { hasText: 'Heading 2' })
      await h2Button.click()
      await expect(editor.locator('h2', { hasText: 'Foo' })).toBeVisible()
      await expect(editor.locator('h1', { hasText: 'Foo' })).toBeHidden()
      await expect(editor.locator('p', { hasText: 'Foo' })).toBeHidden()

      // Press bullet list button
      const bulletButton = page.locator('button', { hasText: 'Bullet List' })
      const bulletList = editor.locator('.prosemirror-flat-list', { hasText: 'Foo' })
      await expect(bulletList).toBeHidden()
      await bulletButton.click()
      await expect(bulletList).toBeVisible()
    })
  })
})
