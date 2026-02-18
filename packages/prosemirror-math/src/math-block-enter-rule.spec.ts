import { describe, expect, it } from 'vitest'
import { userEvent } from 'vitest/browser'

import { MATH_BLOCK_ENTER_REGEXP } from './math-block-enter-rule'
import { setupTest } from './testing'

describe('MATH_BLOCK_ENTER_REGEXP', () => {
  const cases: Array<[input: string, matched: boolean]> = [
    ['$$', true],
    ['$', false],
    ['$$$', false],
    ['hello', false],
    ['$$x', false],
  ]

  it.each(cases)('should handle %s', (input, expected) => {
    const match = MATH_BLOCK_ENTER_REGEXP.exec(input)
    expect(match !== null).toBe(expected)
  })
})

describe('defineMathBlockEnterRule', () => {
  const { editor, n } = setupTest()

  it('should create mathBlock when typing $$ and pressing Enter', async () => {
    editor.set(n.doc(n.p('<a>')))

    await userEvent.keyboard('$$')
    expect(editor.view.state.doc.toJSON()).toEqual(
      n.doc(n.p('$$')).toJSON(),
    )

    await userEvent.keyboard('{Enter}')
    expect(editor.view.state.doc.toJSON()).toEqual(
      n.doc(n.mathBlock()).toJSON(),
    )

    // Selection should be inside the mathBlock
    const { $from } = editor.view.state.selection
    expect($from.parent.type.name).toBe('mathBlock')
  })

  it('should not create mathBlock when typing $$ inside text', async () => {
    editor.set(n.doc(n.p('hello <a>')))

    await userEvent.keyboard('$$')
    await userEvent.keyboard('{Enter}')

    // Should not convert to mathBlock since paragraph had other text
    expect(editor.view.state.doc.toJSON()).not.toEqual(
      n.doc(n.mathBlock()).toJSON(),
    )
  })
})
