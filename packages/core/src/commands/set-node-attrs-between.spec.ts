import {
  describe,
  expect,
  it,
} from 'vitest'

import { setupTest } from '../testing'
import { setNodeAttrsBetween } from './set-node-attrs-between'

describe('setNodeAttrsBetween', () => {
  it('should set attributes on multiple nodes in selection range', () => {
    const { editor, n } = setupTest()

    editor.set(
      n.doc(
        n.codeBlock('<a>first block'),
        n.codeBlock('second block<b>'),
        n.codeBlock('third block'),
      ),
    )

    const command = setNodeAttrsBetween({
      type: 'codeBlock',
      attrs: { language: 'rust' },
    })

    expect(editor.exec(command)).toBe(true)

    // Both blocks should have the new language
    expect(editor.state.doc.child(0).attrs.language).toBe('rust')
    expect(editor.state.doc.child(1).attrs.language).toBe('rust')
    expect(editor.state.doc.child(2).attrs.language).toBe('')
  })

  it('should set attributes with explicit from/to positions', () => {
    const { editor, n } = setupTest()

    editor.set(
      n.doc(
        /*0*/
        n.codeBlock(/*1*/ 'A' /*2*/),
        /*3*/
        n.codeBlock(/*4*/ 'B' /*5*/),
        /*6*/
        n.codeBlock(/*7*/ 'C' /*8*/),
        /*9*/
      ),
    )

    // Update only the second block using explicit positions
    // First block is at position 0, second block starts after first block + separator
    const command = setNodeAttrsBetween({
      type: 'codeBlock',
      attrs: { language: 'go' },
      from: 5,
      to: 7,
    })

    expect(editor.exec(command)).toBe(true)

    // Only second block should be updated
    expect(editor.state.doc.child(0).attrs.language).toBe('')
    expect(editor.state.doc.child(1).attrs.language).toBe('go')
    expect(editor.state.doc.child(2).attrs.language).toBe('go')
  })

  it('should return false when no matching nodes in range', () => {
    const { editor, n } = setupTest()

    editor.set(
      n.doc(
        n.paragraph('<a>first paragraph'),
        n.paragraph('second paragraph<b>'),
      ),
    )

    const command = setNodeAttrsBetween({
      type: 'codeBlock',
      attrs: { language: 'typescript' },
    })

    // Should return false because there are no code blocks in the range
    expect(editor.exec(command)).toBe(false)
  })

  it('should return false when from > to', () => {
    const { editor, n } = setupTest()

    editor.set(n.doc(n.codeBlock('code')))

    const command = setNodeAttrsBetween({
      type: 'codeBlock',
      attrs: { language: 'typescript' },
      from: 10,
      to: 5, // from > to
    })

    // Should return false for invalid range
    expect(editor.exec(command)).toBe(false)
  })

  it('should handle empty selection (from === to)', () => {
    const { editor, n } = setupTest()

    editor.set(n.doc(n.codeBlock('<a>code')))

    const command = setNodeAttrsBetween({
      type: 'codeBlock',
      attrs: { language: 'typescript' },
    })

    // Should still work with collapsed selection if node is at that position
    expect(editor.exec(command)).toBe(true)
    expect(editor.state.doc.firstChild?.attrs.language).toBe('typescript')
  })

  it('should handle partial node overlap', () => {
    const { editor, n } = setupTest()

    editor.set(
      n.doc(
        n.codeBlock('first bl<a>ock'),
        n.codeBlock('second block'),
        n.codeBlock('third bl<b>ock'),
      ),
    )

    const command = setNodeAttrsBetween({
      type: 'codeBlock',
      attrs: { language: 'ruby' },
    })

    expect(editor.exec(command)).toBe(true)

    // All three blocks should be updated even with partial selection
    expect(editor.state.doc.child(0).attrs.language).toBe('ruby')
    expect(editor.state.doc.child(1).attrs.language).toBe('ruby')
    expect(editor.state.doc.child(2).attrs.language).toBe('ruby')
  })

  it('should update only matching node types in mixed content', () => {
    const { editor, n } = setupTest()

    editor.set(
      n.doc(
        n.paragraph('<a>paragraph 1'),
        n.codeBlock('code block 1'),
        n.paragraph('paragraph 2'),
        n.codeBlock('code block 2'),
        n.paragraph('paragraph 3<b>'),
      ),
    )

    const command = setNodeAttrsBetween({
      type: 'codeBlock',
      attrs: { language: 'java' },
    })

    expect(editor.exec(command)).toBe(true)

    // Only codeBlocks should be updated
    expect(editor.state.doc.child(1).attrs.language).toBe('java')
    expect(editor.state.doc.child(3).attrs.language).toBe('java')

    // Paragraphs should not have language attribute
    expect(editor.state.doc.child(0).attrs.language).toBeUndefined()
    expect(editor.state.doc.child(2).attrs.language).toBeUndefined()
    expect(editor.state.doc.child(4).attrs.language).toBeUndefined()
  })

  it('should handle nested nodes', () => {
    const { editor, n } = setupTest()

    editor.set(
      n.doc(
        n.blockquote(
          n.paragraph('<a>nested paragraph 1'),
        ),
        n.blockquote(
          n.paragraph('nested paragraph 2<b>'),
        ),
      ),
    )

    const command = setNodeAttrsBetween({
      type: 'blockquote',
      attrs: { variant: 'highlighted' },
    })

    expect(editor.exec(command)).toBe(true)

    // Both blockquotes should be updated
    expect(editor.state.doc.child(0).attrs.variant).toBe('highlighted')
    expect(editor.state.doc.child(1).attrs.variant).toBe('highlighted')
  })
})
