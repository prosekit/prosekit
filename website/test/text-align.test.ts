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
  focusEditor,
  getEditorHTML,
  MOD_KEY,
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

    await userEvent.type(editor, '# H1')
    await btnC.click()
    await userEvent.keyboard('{Enter}')
    await userEvent.type(editor, 'Paragraph')

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

    await userEvent.type(editor, 'paragraph')

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

    await userEvent.keyboard(`{${MOD_KEY}>}{Shift>}r{/Shift}{/${MOD_KEY}}`)
    check('right')

    await userEvent.keyboard(`{${MOD_KEY}>}{Shift>}l{/Shift}{/${MOD_KEY}}`)
    check('left')

    await userEvent.keyboard(`{${MOD_KEY}>}{Shift>}e{/Shift}{/${MOD_KEY}}`)
    check('center')

    await userEvent.keyboard(`{${MOD_KEY}>}{Shift>}j{/Shift}{/${MOD_KEY}}`)
    check('justify')
  })
})
