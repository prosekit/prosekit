import {
  beforeEach,
  describe,
  expect,
  it,
} from 'vitest'
import {
  page,
  userEvent,
} from 'vitest/browser'

import {
  emptyEditor,
  expectLocatorToNotExist,
  getEditorHTML,
  locateEditor,
  testStory,
  waitForEditor,
} from './editor'

testStory('full', () => {
  it('default content', async () => {
    await waitForEditor()
    await expect.poll(() => getEditorHTML()).toContain('The editor that thinks like you')
  })
})

testStory('full', () => {
  beforeEach(async () => {
    await emptyEditor()
  })

  describe('link', () => {
    it('press Space to insert a link', async () => {
      const editor = locateEditor()
      const url = 'https://www.example.com?query=query#fragment'
      const link = editor.locate(`a[href="${url}"]`, { hasText: url })

      await userEvent.type(editor, 'Hello ')
      await userEvent.type(editor, url)

      await expect.element(editor).toHaveTextContent('Hello https://www.example.com?query=query#fragment')
      await expectLocatorToNotExist(link)

      await userEvent.type(editor, ' ')
      await expect.element(editor).toHaveTextContent('Hello https://www.example.com?query=query#fragment')
      await expect.element(link).toBeVisible()
      await expect.element(link).toHaveAttribute('href', url)
      await expect.element(link).toHaveTextContent(url)
    })

    it('press Space to insert a link ends with a period', async () => {
      const editor = locateEditor()
      const url = 'https://example.com'
      const link = editor.locate(`a[href="${url}"]`, { hasText: url })

      await userEvent.type(editor, 'Hello ')
      await userEvent.type(editor, 'https://example.com.')

      await expect.element(editor).toHaveTextContent('Hello https://example.com.')
      await expectLocatorToNotExist(link)

      await userEvent.type(editor, ' ')
      await expect.element(editor).toHaveTextContent('Hello https://example.com.')
      await expect.element(link).toBeVisible()
      await expect.element(link).toHaveAttribute('href', url)
      await expect.element(link).toHaveTextContent(url)
    })

    it('press Enter to insert', async () => {
      const editor = locateEditor()
      const url = 'https://www.example.com?query=query#fragment'
      const link = editor.locate(`a[href="${url}"]`, { hasText: url })

      await userEvent.type(editor, 'Hello ')
      await userEvent.type(editor, url)

      await expect.element(editor).toHaveTextContent('Hello https://www.example.com?query=query#fragment')
      await expectLocatorToNotExist(link)

      await userEvent.keyboard('{Enter}')
      await expect.element(editor).toHaveTextContent('Hello https://www.example.com?query=query#fragment')
      await expect.element(link).toBeVisible()
      await expect.element(link).toHaveAttribute('href', url)
      await expect.element(link).toHaveTextContent(url)
    })

    it('press Enter to insert a link ends with a period', async () => {
      const editor = locateEditor()
      const url = 'https://example.com'
      const link = editor.locate(`a[href="${url}"]`, { hasText: url })

      await userEvent.type(editor, 'Hello ')
      await userEvent.type(editor, 'https://example.com.')

      await expect.element(editor).toHaveTextContent('Hello https://example.com.')
      await expectLocatorToNotExist(link)

      await userEvent.keyboard('{Enter}')
      await expect.element(editor).toHaveTextContent('Hello https://example.com.')
      await expect.element(link).toBeVisible()
      await expect.element(link).toHaveAttribute('href', url)
      await expect.element(link).toHaveTextContent(url)
    })
  })

  describe('mark input rules', () => {
    it('bold', async () => {
      const editor = await waitForEditor()

      await userEvent.type(editor, '**bold** **no bold **')
      await userEvent.keyboard('{Enter}')
      await userEvent.type(editor, '*****')
      await userEvent.keyboard('{Enter}')
      await userEvent.type(editor, 'no**bold**')
      await userEvent.keyboard('{Enter}')
      await userEvent.type(editor, '**no*bold**')

      const html = editor.element().innerHTML
      expect(html).toEqual(
        [
          '<p><strong>bold</strong> **no bold **</p>',
          '<p>*****</p>',
          '<p>no**bold**</p>',
          '<p>**no*bold**</p>',
        ].join(''),
      )
    })

    it('italic', async () => {
      const editor = await waitForEditor()

      await userEvent.type(editor, '*italic* *no italic *')
      await userEvent.keyboard('{Enter}')
      await userEvent.type(editor, '***')
      await userEvent.keyboard('{Enter}')
      await userEvent.type(editor, 'no*italic*')

      const html = editor.element().innerHTML
      expect(html).toEqual(
        [
          '<p><em>italic</em> *no italic *</p>',
          '<p>***</p>',
          '<p>no*italic*</p>',
        ].join(''),
      )
    })

    it('code', async () => {
      const editor = await waitForEditor()

      await userEvent.type(editor, '`code` `no code `')
      await userEvent.keyboard('{Enter}')
      await userEvent.type(editor, '`` ``')
      await userEvent.keyboard('{Enter}')
      await userEvent.type(editor, 'no`code`')

      const html = editor.element().innerHTML
      expect(html).toEqual(
        [
          '<p><code>code</code> `no code `</p>',
          '<p>`` ``</p>',
          '<p>no`code`</p>',
        ].join(''),
      )
    })

    it('strike', async () => {
      const editor = await waitForEditor()

      await userEvent.type(editor, '~~strike~~ ~~no strike ~~')
      await userEvent.keyboard('{Enter}')
      await userEvent.type(editor, '~~~~~')
      await userEvent.keyboard('{Enter}')
      await userEvent.type(editor, 'no~~strike~~')
      await userEvent.keyboard('{Enter}')
      await userEvent.type(editor, '~~no~strike~~')

      const html = editor.element().innerHTML
      expect(html).toEqual(
        [
          '<p><s>strike</s> ~~no strike ~~</p>',
          '<p>~~~~~</p>',
          '<p>no~~strike~~</p>',
          '<p>~~no~strike~~</p>',
        ].join(''),
      )
    })
  })

  describe('toolbar', () => {
    it('press Space to insert an image', async () => {
      const editor = locateEditor()
      await userEvent.click(editor)

      await userEvent.type(editor, 'Foo')
      await expect.element(editor.locate('p', { hasText: 'Foo' })).toBeVisible()

      // Press H1 button
      const h1Button = page.getByRole('button', { name: 'Heading 1' })
      await h1Button.click()
      await expect.element(editor.locate('h1', { hasText: 'Foo' })).toBeVisible()
      await expectLocatorToNotExist(editor.locate('p', { hasText: 'Foo' }))

      // Press H2 button
      const h2Button = page.getByRole('button', { name: 'Heading 2' })
      await h2Button.click()
      await expect.element(editor.locate('h2', { hasText: 'Foo' })).toBeVisible()
      await expectLocatorToNotExist(editor.locate('h1', { hasText: 'Foo' }))
      await expectLocatorToNotExist(editor.locate('p', { hasText: 'Foo' }))

      // Press bullet list button
      const bulletButton = page.getByRole('button', { name: 'Bullet List' })
      const bulletList = editor.locate('.prosemirror-flat-list', { hasText: 'Foo' })
      await expectLocatorToNotExist(bulletList)
      await bulletButton.click()
      await expect.element(bulletList).toBeVisible()
    })
  })
})
