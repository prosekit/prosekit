import {
  expect,
  it,
} from 'vitest'
import { page } from 'vitest/browser'

import {
  locateEditor,
  testStory,
  testStoryConsistency,
} from './helpers'

testStoryConsistency('typography')

testStory('typography', () => {
  it('renders headings, lists, code, and media', async () => {
    const editor = locateEditor()

    await expect.element(editor.locate('h1', { hasText: 'ProseKit Typography' })).toBeVisible()

    // Inline marks
    await expect.element(editor.locate('strong', { hasText: 'bold text' })).toBeVisible()
    await expect.element(editor.locate('em', { hasText: 'italic text' })).toBeVisible()
    await expect.element(editor.locate('u', { hasText: 'underlined text' })).toBeVisible()
    await expect.element(editor.locate('s', { hasText: 'strikethrough text' })).toBeVisible()
    await expect.element(editor.locate('code', { hasText: 'inline code' })).toBeVisible()
    await expect.element(editor.locate('a[href="https://example.com"]', { hasText: 'links' })).toBeVisible()

    // Lists
    await expect.element(page.getByText('Unordered list item 1')).toBeVisible()
    await expect.element(page.getByText('First ordered item')).toBeVisible()

    // Blockquote
    await expect.element(editor.locate('blockquote')).toBeVisible()

    // Code block
    await expect.element(editor.locate('pre')).toBeVisible()
    await expect.element(page.getByText('function example()')).toBeVisible()

    // Horizontal rule
    await expect.element(editor.locate('hr')).toBeVisible()

    // Image
    await expect.element(editor.locate('img')).toBeVisible()

    // Table
    await expect.element(editor.locate('table')).toBeVisible()
    await expect.element(page.getByText('Header 1')).toBeVisible()
  })
})
