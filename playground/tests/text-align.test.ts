import { expect, test, type Page } from '@playwright/test'

import {
  MOD_KEY,
  emptyEditor,
  getEditorHTML,
  testStory,
  waitForEditor,
} from './helper'

testStory('text-align', () => {
  test('commands', async ({ page }) => {
    const btnL = page.getByRole('button', { name: 'Left' })
    const btnR = page.getByRole('button', { name: 'Right' })
    const editor = await waitForEditor(page)

    expect(await getEditorHTML(page)).toMatchSnapshot()

    await resetCursor(page)
    await btnL.click()
    expect(await getEditorHTML(page)).toMatchSnapshot()

    await resetCursor(page)
    await btnR.click()
    expect(await getEditorHTML(page)).toMatchSnapshot()

    await resetCursor(page)
    await editor.press('Enter')
    await resetCursor(page)
  })

  test('inherence', async ({ page }) => {
    await emptyEditor(page)

    const btnC = page.getByRole('button', { name: 'Center' })
    const editor = await waitForEditor(page)

    await editor.pressSequentially('# H1')
    await btnC.click()
    await editor.press('Enter')
    await editor.pressSequentially('Paragraph')

    // Both the heading and paragraph nodes should align to center
    expect(await getEditorHTML(page)).toMatchSnapshot()
  })

  test('keymap', async ({ page }) => {
    await emptyEditor(page)
    const editor = await waitForEditor(page)

    await editor.pressSequentially('paragraph')

    const check = async (expected: 'left' | 'right' | 'center' | 'justify') => {
      for (const value of ['left', 'right', 'center', 'justify'] as const) {
        const html = (await getEditorHTML(page)).replaceAll(' ', '')
        if (value === expected) {
          expect(html).toContain(`text-align:` + value)
        } else {
          expect(html).not.toContain(`text-align:` + value)
        }
      }
    }

    await editor.press(MOD_KEY + '+Shift+R')
    await check('right')

    await editor.press(MOD_KEY + '+Shift+L')
    await check('left')

    await editor.press(MOD_KEY + '+Shift+E')
    await check('center')

    await editor.press(MOD_KEY + '+Shift+J')
    await check('justify')
  })
})

// Dumb way to move the text cursor to the start of the document
async function resetCursor(page: Page) {
  const editor = await waitForEditor(page)
  await editor.focus()
  for (let i = 0; i < 20; i++) {
    await editor.press('ArrowUp')
    await editor.press('ArrowLeft')
  }
}
