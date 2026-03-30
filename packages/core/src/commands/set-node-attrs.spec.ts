import { describe, expect, it } from 'vitest'

import { setupTest } from '../testing/index.ts'

import { setNodeAttrs } from './set-node-attrs.ts'

describe('setNodeAttrs', () => {
  it('should set attributes on a code block node', () => {
    const { editor, n } = setupTest()

    editor.set(n.doc(n.codeBlock('const x = 1')))

    // Get the initial language attribute (should be empty string by default)
    expect(editor.state.doc.firstChild?.attrs.language).toBe('')

    // Set the language attribute
    const command = setNodeAttrs({
      type: 'codeBlock',
      attrs: { language: 'typescript' },
    })

    expect(editor.exec(command)).toBe(true)
    expect(editor.state.doc.firstChild?.attrs.language).toBe('typescript')
  })

  it('should set multiple attributes at once', () => {
    const { editor, n } = setupTest()

    editor.set(n.doc(n.codeBlock('const x = 1')))

    // Verify initial state
    expect(editor.state.doc.firstChild?.attrs).toMatchObject({
      language: '',
      lineNumbers: false,
    })

    // Set multiple attributes at once
    const command = setNodeAttrs({
      type: 'codeBlock',
      attrs: { language: 'javascript', lineNumbers: true },
    })

    editor.exec(command)

    // Verify both attributes were set
    expect(editor.state.doc.firstChild?.attrs).toMatchObject({
      language: 'javascript',
      lineNumbers: true,
    })
  })

  it('should return false when node type does not match', () => {
    const { editor, n } = setupTest()

    editor.set(n.doc(n.paragraph('Hello world')))

    const command = setNodeAttrs({
      type: 'codeBlock',
      attrs: { language: 'typescript' },
    })

    // Should return false because paragraph is not a codeBlock
    expect(editor.exec(command)).toBe(false)
  })

  it('should set attributes at a specific position', () => {
    const { editor, n } = setupTest()

    editor.set(
      n.doc(
        /*0*/
        n.codeBlock(/*1*/ 'A' /*2*/),
        /*3*/
        n.codeBlock(/*4*/ 'B' /*5*/),
        /*6*/
      ),
    )

    // Set attribute on the second code block (position after first block)
    const command = setNodeAttrs({
      type: 'codeBlock',
      attrs: { language: 'python' },
      pos: 3, // Position of second code block
    })

    editor.exec(command)

    // First block should still have default language
    expect(editor.state.doc.child(0).attrs.language).toBe('')
    // Second block should have the new language
    expect(editor.state.doc.child(1).attrs.language).toBe('python')
  })

  it('should handle cursor inside a node', () => {
    const { editor, n } = setupTest()

    editor.set(n.doc(n.codeBlock('const<a> x = 1')))

    const command = setNodeAttrs({
      type: 'codeBlock',
      attrs: { language: 'typescript' },
    })

    editor.exec(command)

    expect(editor.state.doc.firstChild?.attrs.language).toBe('typescript')
  })

  it('should set attrs on wrapping node containing selection', () => {
    const { editor, n } = setupTest()

    editor.set(
      n.doc(
        n.blockquote(
          n.paragraph('Hello<a> world<b>'),
        ),
      ),
    )

    const command = setNodeAttrs({
      type: 'blockquote',
      attrs: { variant: 'fancy' },
    })

    // Should find the blockquote wrapping the selection
    expect(editor.exec(command)).toBe(true)
    expect(editor.state.doc.firstChild?.attrs.variant).toBe('fancy')
  })
})
