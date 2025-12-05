import {
  expect,
  it,
} from 'vitest'
import { page } from 'vitest/browser'
import { keyboard } from 'vitest-browser-commands/playwright'

import {
  emptyEditor,
  focusEditor,
  getEditorHTML,
  inputText,
  moveSelectionToStart,
  testStory,
  testStoryConsistency,
  waitForEditor,
} from './helpers'

testStoryConsistency('text-align')

testStory('text-align', () => {
  it('commands', async () => {
    const btnL = page.getByRole('button', { name: 'Left' })
    const btnR = page.getByRole('button', { name: 'Right' })
    await waitForEditor()

    expect(getEditorHTML()).toMatchInlineSnapshot(`
      "
      <h1 style="text-align: center;">
        Heading
      </h1>
      <p style="text-align: left;">
        First paragraph
      </p>
      <p style="text-align: center;">
        Second paragraph
      </p>
      <p style="text-align: right;">
        Third paragraph
      </p>
      "
    `)

    await focusEditor()
    await moveSelectionToStart()
    await btnL.click()
    expect(getEditorHTML()).toMatchInlineSnapshot(`
      "
      <h1 style="text-align: left;">
        Heading
      </h1>
      <p style="text-align: left;">
        First paragraph
      </p>
      <p style="text-align: center;">
        Second paragraph
      </p>
      <p style="text-align: right;">
        Third paragraph
      </p>
      "
    `)

    await moveSelectionToStart()
    await btnR.click()
    expect(getEditorHTML()).toMatchInlineSnapshot(`
      "
      <h1 style="text-align: right;">
        Heading
      </h1>
      <p style="text-align: left;">
        First paragraph
      </p>
      <p style="text-align: center;">
        Second paragraph
      </p>
      <p style="text-align: right;">
        Third paragraph
      </p>
      "
    `)
  })

  it('inheritance', async () => {
    await emptyEditor()

    const btnC = page.getByRole('button', { name: 'Center' })
    const editor = await waitForEditor()

    await inputText('# H1')
    await btnC.click()
    await keyboard.press('Enter')
    await inputText('Paragraph')

    // Both the heading and paragraph nodes should align to center
    expect(getEditorHTML()).toMatchInlineSnapshot(`
      "
      <h1 style="text-align: center;">
        H1
      </h1>
      <p style="text-align: center;">
        Paragraph
      </p>
      "
    `)
  })

  it('keymap', async () => {
    await emptyEditor()
    const editor = await waitForEditor()

    await inputText('paragraph')

    const check = (expected: 'left' | 'right' | 'center' | 'justify') => {
      for (const value of ['left', 'right', 'center', 'justify'] as const) {
        const html = getEditorHTML().replaceAll(' ', '')
        if (value === expected) {
          expect(html).toContain(`text-align:` + value)
        } else {
          expect(html).not.toContain(`text-align:` + value)
        }
      }
    }

    await keyboard.press('ControlOrMeta+Shift+R')
    check('right')

    await keyboard.press('ControlOrMeta+Shift+L')
    check('left')

    await keyboard.press('ControlOrMeta+Shift+E')
    check('center')

    await keyboard.press('ControlOrMeta+Shift+J')
    check('justify')
  })
})
