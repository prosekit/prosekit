import { describe, expect, it } from 'vitest'

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

    const command = setNodeAttrsBetween({
      type: 'codeBlock',
      attrs: { language: 'go' },
      from: 5,
      to: 7,
    })

    expect(editor.exec(command)).toBe(true)

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

    expect(editor.exec(command)).toBe(false)
  })

  it('should return false when from > to', () => {
    const { editor, n } = setupTest()

    editor.set(n.doc(n.codeBlock('code')))

    const command = setNodeAttrsBetween({
      type: 'codeBlock',
      attrs: { language: 'typescript' },
      from: 10,
      to: 5,
    })

    expect(editor.exec(command)).toBe(false)
  })

  it('should handle empty selection (from === to)', () => {
    const { editor, n } = setupTest()

    editor.set(n.doc(n.codeBlock('<a>code')))

    const command = setNodeAttrsBetween({
      type: 'codeBlock',
      attrs: { language: 'typescript' },
    })

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

    expect(editor.state.doc.child(1).attrs.language).toBe('java')
    expect(editor.state.doc.child(3).attrs.language).toBe('java')
  })

  it('should handle nested nodes', () => {
    const { editor, n } = setupTest()

    const doc1 = n.doc(
      n.blockquote(
        { variant: 'variant-0' },
        n.paragraph('paragraph-0'),
      ),
      n.blockquote(
        { variant: 'variant-1' },
        n.paragraph('paragraph-1'),
        n.blockquote(
          { variant: 'variant-1.1' },
          n.paragraph('paragraph-1.1<a>'),
        ),
      ),
      n.blockquote(
        { variant: 'variant-2' },
        n.paragraph('paragraph-2'),
      ),
      n.blockquote(
        { variant: 'variant-3' },
        n.paragraph('paragraph-3<b>'),
        n.blockquote(
          { variant: 'variant-3.1' },
          n.paragraph('paragraph-3.1'),
        ),
      ),
    )

    const doc2 = n.doc(
      n.blockquote(
        { variant: 'variant-0' },
        n.paragraph('paragraph-0'),
      ),
      n.blockquote(
        { variant: 'variant-X' },
        n.paragraph('paragraph-1'),
        n.blockquote(
          { variant: 'variant-X' },
          n.paragraph('paragraph-1.1'),
        ),
      ),
      n.blockquote(
        { variant: 'variant-X' },
        n.paragraph('paragraph-2'),
      ),
      n.blockquote(
        { variant: 'variant-X' },
        n.paragraph('paragraph-3'),
        n.blockquote(
          { variant: 'variant-3.1' },
          n.paragraph('paragraph-3.1'),
        ),
      ),
    )

    editor.set(doc1)

    const command = setNodeAttrsBetween({
      type: 'blockquote',
      attrs: { variant: 'variant-X' },
    })

    expect(editor.exec(command)).toBe(true)
    expect(editor.getDocJSON()).toEqual(doc2.toJSON())
  })
})
