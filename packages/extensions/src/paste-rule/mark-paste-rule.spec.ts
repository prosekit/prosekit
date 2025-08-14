import {
  defineMarkSpec,
  union,
} from '@prosekit/core'
import {
  describe,
  expect,
  it,
} from 'vitest'

import { defineBold } from '../bold'
import { defineDoc } from '../doc'
import { defineParagraph } from '../paragraph'
import { setupTestFromExtension } from '../testing'
import {
  pasteHTML,
  pasteText,
} from '../testing/clipboard'
import { defineText } from '../text'

import type { MarkPasteRuleOptions } from './mark-paste-rule'
import { defineMarkPasteRule } from './mark-paste-rule'

function setup(options?: Partial<MarkPasteRuleOptions>) {
  return setupTestFromExtension(union(
    defineDoc(),
    defineText(),
    defineParagraph(),
    defineBold(),
    defineMarkSpec({
      name: 'testMark',
      attrs: {
        value: { validate: 'string' },
      },
      parseDOM: [{ tag: 'span[data-test]' }],
      toDOM: () => ['span', { 'data-test': 'true' }, 0],
    }),
    defineMarkPasteRule({
      type: 'testMark',
      regex: /@(\w+)/g,
      getAttrs: (match: RegExpExecArray) => ({ value: match[1] }),
      ...options,
    }),
  ))
}

describe('defineMarkPasteRule', () => {
  it('should match simple patterns and create marks', () => {
    const { editor, n, m } = setup()
    editor.set(n.doc(n.paragraph('<a>')))

    pasteHTML(editor.view, '<p>Hello @alice and @bob</p>')

    expect(editor.view.state.doc.toJSON()).toEqual(
      n.doc(n.paragraph(
        'Hello ',
        m.testMark({ value: 'alice' }, '@alice'),
        ' and ',
        m.testMark({ value: 'bob' }, '@bob'),
      )).toJSON(),
    )
  })

  it('should not match plain text', () => {
    const { editor, n } = setup()
    editor.set(n.doc(n.paragraph('<a>')))

    pasteText(editor.view, 'Hello @alice and @bob')

    expect(editor.view.state.doc.toJSON()).toEqual(
      n.doc(n.paragraph('Hello @alice and @bob')).toJSON(),
    )
  })

  it('should skip processing when attrs returns false', () => {
    const { editor, n, m } = setup({
      getAttrs: (match: RegExpExecArray) => {
        return match[1] === 'skip' ? false : { value: match[1] }
      },
    })
    editor.set(n.doc(n.paragraph('<a>')))

    pasteHTML(editor.view, '<p>Tags: @good @skip @also</p>')

    expect(editor.view.state.doc.toJSON()).toEqual(
      n.doc(n.paragraph(
        'Tags: ',
        m.testMark({ value: 'good' }, '@good'),
        ' @skip ',
        m.testMark({ value: 'also' }, '@also'),
      )).toJSON(),
    )
  })

  it('should use shouldSkip to skip bold text', () => {
    const { editor, n, m } = setup({
      shouldSkip: (node) => node.marks.some(mark => mark.type.name === 'bold'),
    })
    editor.set(n.doc(n.paragraph('<a>')))

    pasteHTML(editor.view, '<p>Hello <strong>@alice</strong> and @bob</p>')

    expect(editor.view.state.doc.toJSON()).toEqual(
      n.doc(n.paragraph(
        'Hello ',
        m.bold('@alice'), // Skipped due to shouldSkip
        ' and ',
        m.testMark({ value: 'bob' }, '@bob'), // Processed normally
      )).toJSON(),
    )
  })
})
