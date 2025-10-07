import {
  expect,
  test,
} from '@playwright/test'

import {
  testStory,
  waitForEditor,
} from './helper'

testStory('typography', () => {
  test('renders headings, lists, code, and media', async ({ page }) => {
    const editor = await waitForEditor(page)

    await expect(editor.locator('h1', { hasText: 'ProseKit Typography' })).toBeVisible()

    // Inline marks
    await expect(editor.locator('strong', { hasText: 'bold text' })).toBeVisible()
    await expect(editor.locator('em', { hasText: 'italic text' })).toBeVisible()
    await expect(editor.locator('u', { hasText: 'underlined text' })).toBeVisible()
    await expect(editor.locator('s', { hasText: 'strikethrough text' })).toBeVisible()
    await expect(editor.locator('code', { hasText: 'inline code' })).toBeVisible()
    await expect(editor.locator('a[href="https://example.com"]', { hasText: 'links' })).toBeVisible()

    // Lists
    await expect(editor.getByText('Unordered list item 1')).toBeVisible()
    await expect(editor.getByText('First ordered item')).toBeVisible()

    // Blockquote
    await expect(editor.locator('blockquote')).toBeVisible()

    // Code block
    await expect(editor.locator('pre')).toBeVisible()
    await expect(editor.getByText('function example()')).toBeVisible()

    // Horizontal rule
    await expect(editor.locator('hr')).toBeVisible()

    // Image (alt may be dropped by schema)
    await expect(editor.locator('img')).toBeVisible()

    // Table
    await expect(editor.locator('table')).toBeVisible()
    await expect(editor.getByText('Header 1')).toBeVisible()
  })
})
