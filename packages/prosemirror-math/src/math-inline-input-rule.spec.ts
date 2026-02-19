import { describe, expect, it } from 'vitest'
import { userEvent } from 'vitest/browser'

import { MATH_INPUT_REGEXP } from './math-inline-input-rule.ts'
import { setupTest } from './testing.ts'

describe('MATH_INPUT_REGEXP', () => {
  const regexp = new RegExp(MATH_INPUT_REGEXP)

  const cases: Array<[input: string, delimiter: string | null, captured: string | null]> = [
    // Single dollar: inline math
    ['$x$', '$', 'x'],
    ['$x^2$', '$', 'x^2'],
    ['$a+b=c$', '$', 'a+b=c'],
    [String.raw`$\alpha$`, '$', String.raw`\alpha`],
    [String.raw`$\frac{a}{b}$`, '$', String.raw`\frac{a}{b}`],
    ['hello $x$', '$', 'x'],
    ['The formula $E=mc^2$', '$', 'E=mc^2'],
    ['$a + b$', '$', 'a + b'],
    ['$a$', '$', 'a'],

    // Double dollar: block math
    ['$$x$$', '$$', 'x'],
    ['$$x^2$$', '$$', 'x^2'],
    ['$$a+b=c$$', '$$', 'a+b=c'],
    [String.raw`$$\alpha$$`, '$$', String.raw`\alpha`],
    ['$$a + b$$', '$$', 'a + b'],

    // Empty content — should not match
    ['$$', null, null],
    ['$$$$', null, null],

    // Whitespace at boundaries — should not match
    ['$ x$', null, null],
    ['$x $', null, null],
    ['$ x $', null, null],
    ['$$ x$$', null, null],
    ['$$x $$', null, null],

    // Mismatched delimiters — should not match
    ['$x$$', null, null],
    ['$$x$', null, null],
    ['$$$x=2$$', null, null],

    // No dollar signs
    ['hello', null, null],
  ]

  it.each(cases)('should handle %s', (input, expectedDelimiter, expectedContent) => {
    const match = regexp.exec(input)
    const delimiter = match?.[1] ?? null
    const captured = match?.[2] ?? null
    expect(delimiter).toEqual(expectedDelimiter)
    expect(captured).toEqual(expectedContent)
  })
})

describe('defineMathInlineInputRule', () => {
  const { editor, n } = setupTest()

  it('should create mathInline when typing $...$', async () => {
    editor.set(n.doc(n.p('<a>')))

    await userEvent.keyboard('$x^2')
    expect(editor.view.state.doc.toJSON()).toEqual(
      n.doc(n.p('$x^2')).toJSON(),
    )

    await userEvent.keyboard('$')
    expect(editor.view.state.doc.toJSON()).toEqual(
      n.doc(n.p(n.mathInline('x^2'))).toJSON(),
    )
  })

  it('should create mathInline when typing $$...$$', async () => {
    editor.set(n.doc(n.p('<a>')))

    await userEvent.keyboard('$$x^2$')
    expect(editor.view.state.doc.toJSON()).toEqual(
      n.doc(n.p('$$x^2$')).toJSON(),
    )

    await userEvent.keyboard('$')
    expect(editor.view.state.doc.toJSON()).toEqual(
      n.doc(n.p(n.mathInline('x^2'))).toJSON(),
    )
  })

  it('should create mathInline with multi-character content', async () => {
    editor.set(n.doc(n.p('<a>')))

    await userEvent.keyboard('$a+b=c$')
    expect(editor.view.state.doc.toJSON()).toEqual(
      n.doc(n.p(n.mathInline('a+b=c'))).toJSON(),
    )
  })

  it('should not trigger with empty content $$', async () => {
    editor.set(n.doc(n.p('<a>')))

    await userEvent.keyboard('$$')
    expect(editor.view.state.doc.toJSON()).toEqual(
      n.doc(n.p('$$')).toJSON(),
    )
  })

  it('should not trigger with spaces at boundaries', async () => {
    editor.set(n.doc(n.p('<a>')))

    await userEvent.keyboard('$ x^2 $')
    expect(editor.view.state.doc.toJSON()).toEqual(
      n.doc(n.p('$ x^2 $')).toJSON(),
    )
  })

  it('should not trigger inside a code block', async () => {
    editor.set(n.doc(n.codeBlock('<a>')))

    await userEvent.keyboard('$x^2$')
    expect(editor.view.state.doc.toJSON()).toEqual(
      n.doc(n.codeBlock('$x^2$')).toJSON(),
    )
  })
})
