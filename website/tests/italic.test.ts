import {
  expect,
  test,
} from '@playwright/test'

import {
  emptyEditor,
  testStory,
  waitForEditor,
} from './helper'

testStory('italic', () => {
  test('toggle via toolbar while typing', async ({ page }) => {
    const editor = await waitForEditor(page)
    const italicBtn = page.getByRole('button', { name: 'Italic' })

    await emptyEditor(page)

    // Turn on italic, type text -> should be wrapped in <em>
    await italicBtn.click()
    await editor.pressSequentially('hello')
    const html1 = await editor.innerHTML()
    expect(html1).toContain('<em>hello</em>')

    // Turn off italic, type more -> should not be italic
    await italicBtn.click()
    await editor.pressSequentially(' world')
    const html2 = await editor.innerHTML()
    expect(html2).toContain('<em>hello</em>')
    expect(html2).toContain(' world')
    expect(html2).not.toContain('<em> world</em>')
  })

  test('toggle on selection', async ({ page }) => {
    const editor = await waitForEditor(page)
    const italicBtn = page.getByRole('button', { name: 'Italic' })

    await emptyEditor(page)

    // Type text and select the last 5 characters "world"
    await editor.pressSequentially('hello world')
    await editor.focus()
    await page.keyboard.down('Shift')
    for (let i = 0; i < 5; i++) {
      await page.keyboard.press('ArrowLeft')
    }
    await page.keyboard.up('Shift')

    // Apply italic to selection
    await italicBtn.click()
    let html = await editor.innerHTML()
    expect(html).toContain('<em>world</em>')

    // Toggle italic off for the same selection
    await italicBtn.click()
    html = await editor.innerHTML()
    expect(html).not.toContain('<em>world</em>')
  })
})
