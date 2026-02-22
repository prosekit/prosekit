import { expect, it } from 'vitest'
import { page } from 'vitest/browser'

import { testStory, testStoryConsistency, waitForEditor } from './helpers'

testStoryConsistency('typography')

testStory('typography', () => {
  it('renders headings, lists, code, and media', async () => {
    const editor = await waitForEditor()

    await expect.element(editor.locate('h1', { hasText: 'ProseKit Typography' })).toBeVisible()

    // Inline marks
    await expect.element(editor.locate('strong', { hasText: 'bold text' })).toBeVisible()
    await expect.element(editor.locate('em', { hasText: 'italic text' })).toBeVisible()
    await expect.element(editor.locate('u', { hasText: 'underlined text' })).toBeVisible()
    await expect.element(editor.locate('s', { hasText: 'strikethrough text' })).toBeVisible()
    await expect.element(editor.locate('code', { hasText: 'inline code' })).toBeVisible()
    await expect.element(editor.locate('a[href="https://example.com"]', { hasText: 'links' })).toBeVisible()

    // Hard break
    expect(editor.locate('br')).toBeInTheDocument()

    // Headings
    await expect.element(editor.locate('h1', { hasText: 'Heading 1' })).toBeVisible()
    await expect.element(editor.locate('h2', { hasText: 'Heading 2' })).toBeVisible()
    await expect.element(editor.locate('h3', { hasText: 'Heading 3' })).toBeVisible()
    await expect.element(editor.locate('h4', { hasText: 'Heading 4' })).toBeVisible()
    await expect.element(editor.locate('h5', { hasText: 'Heading 5' })).toBeVisible()
    await expect.element(editor.locate('h6', { hasText: 'Heading 6' })).toBeVisible()

    // Lists
    await expect.element(page.getByText('Unordered list item 1')).toBeVisible()
    await expect.element(page.getByText('First ordered item')).toBeVisible()

    // Blockquote
    await expect.element(editor.locate('blockquote')).toBeVisible()

    // Code block
    await expect.element(editor.locate('pre', { hasText: 'function example()' })).toBeVisible()

    // Horizontal rule
    await expect.element(editor.locate('hr')).toBeVisible()

    // Image
    await expect.element(editor.locate('img')).toBeVisible()

    // Table
    await expect.element(editor.locate('table')).toBeVisible()
    await expect.element(page.getByText('Header 1')).toBeVisible()

    // Math (inline and block)
    await expect.element(page.getByText("Inline math like Euler's identity")).toBeVisible()
    await expect.element(page.getByText('Block-level equations')).toBeVisible()
    await expect.element(editor.locate('.prosemirror-math-inline').first()).toBeVisible()
    await expect.element(editor.locate('.prosemirror-math-block').first()).toBeVisible()
  })
})
