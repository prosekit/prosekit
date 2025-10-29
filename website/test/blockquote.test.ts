import {
  expect,
  it,
} from 'vitest'
import {
  page,
  userEvent,
} from 'vitest/browser'

import {
  emptyEditor,
  testStory,
  waitForEditor,
} from './helpers'

testStory('blockquote', () => {
  it('toggle blockquote on current paragraph', async () => {
    const editor = await waitForEditor()
    const btn = page.getByRole('button', { name: 'Blockquote' })
    const bq = editor.locate('blockquote')

    await emptyEditor()
    await userEvent.type(editor, 'Paragraph')

    // Initially no blockquote
    expect(bq).not.toBeInTheDocument()

    // Wrap current paragraph in blockquote
    await expect.element(btn).toBeVisible()
    await userEvent.click(btn)
    await expect.element(bq.filter({ hasText: /Paragraph/ })).toBeVisible()

    // Unwrap blockquote
    await expect.element(btn).toBeVisible()
    await userEvent.click(btn)
    expect(bq).not.toBeInTheDocument()
  })
})
