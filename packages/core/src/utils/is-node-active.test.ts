import { NodeSelection } from '@prosekit/pm/state'
import {
  beforeEach,
  describe,
  expect,
  it,
} from 'vitest'

import { setupTest } from '../testing'

import { isNodeActive } from './is-node-active'

describe('isNodeActive', () => {
  let editor: ReturnType<typeof setupTest>['editor']
  let n: ReturnType<typeof setupTest>['n']

  beforeEach(() => {
    const setup = setupTest()
    editor = setup.editor
    n = setup.n
  })

  it('should return true when cursor is in a node of the specified type', () => {
    const docNode = n.doc(n.p('Hello <a>world'))
    editor.set(docNode)

    const result = isNodeActive(editor.state, 'paragraph')
    expect(result).toBe(true)
  })

  it('should return false when cursor is not in a node of the specified type', () => {
    const docNode = n.doc(n.p('Hello <a>world'))
    editor.set(docNode)

    const result = isNodeActive(editor.state, 'codeBlock')
    expect(result).toBe(false)
  })

  it('should return true when cursor is in a nested node of the specified type', () => {
    const docNode = n.doc(n.blockquote(n.p('Hello <a>world')))
    editor.set(docNode)

    const result = isNodeActive(editor.state, 'blockquote')
    expect(result).toBe(true)
  })

  it('should return true when cursor is in a node with matching attributes', () => {
    const docNode = n.doc(n.codeBlock({ language: 'typescript' }, '<a>code'))
    editor.set(docNode)

    const result = isNodeActive(editor.state, 'codeBlock', { language: 'typescript' })
    expect(result).toBe(true)
  })

  it('should return false when cursor is in a node with non-matching attributes', () => {
    const docNode = n.doc(n.codeBlock({ language: 'typescript' }, '<a>code'))
    editor.set(docNode)

    const result = isNodeActive(editor.state, 'codeBlock', { language: 'javascript' })
    expect(result).toBe(false)
  })

  it('should return true when using NodeSelection with matching type', () => {
    const docNode = n.doc(n.p('Hello world'))
    editor.set(docNode)

    const $pos = editor.state.doc.resolve(0)
    const nodeSelection = NodeSelection.create(editor.state.doc, $pos.pos)
    const newState = editor.state.apply(
      editor.state.tr.setSelection(nodeSelection),
    )

    const result = isNodeActive(newState, 'paragraph')
    expect(result).toBe(true)
  })

  it('should return true when using NodeSelection with matching type and attributes', () => {
    const docNode = n.doc(n.codeBlock({ language: 'python' }, 'code'))
    editor.set(docNode)

    const $pos = editor.state.doc.resolve(0)
    const nodeSelection = NodeSelection.create(editor.state.doc, $pos.pos)
    const newState = editor.state.apply(
      editor.state.tr.setSelection(nodeSelection),
    )

    const result = isNodeActive(newState, 'codeBlock', { language: 'python' })
    expect(result).toBe(true)
  })

  it('should return false when using NodeSelection with non-matching attributes', () => {
    const docNode = n.doc(n.codeBlock({ language: 'python' }, 'code'))
    editor.set(docNode)

    const $pos = editor.state.doc.resolve(0)
    const nodeSelection = NodeSelection.create(editor.state.doc, $pos.pos)
    const newState = editor.state.apply(
      editor.state.tr.setSelection(nodeSelection),
    )

    const result = isNodeActive(newState, 'codeBlock', { language: 'javascript' })
    expect(result).toBe(false)
  })

  it('should work with NodeType instead of string', () => {
    const docNode = n.doc(n.p('Hello <a>world'))
    editor.set(docNode)

    const paragraphType = editor.state.schema.nodes.paragraph
    const result = isNodeActive(editor.state, paragraphType)
    expect(result).toBe(true)
  })

  it('should return true when node is at any depth in the hierarchy', () => {
    const docNode = n.doc(n.blockquote(n.p('Hello <a>world')))
    editor.set(docNode)

    const resultParagraph = isNodeActive(editor.state, 'paragraph')
    const resultBlockquote = isNodeActive(editor.state, 'blockquote')
    const resultDoc = isNodeActive(editor.state, 'doc')

    expect(resultParagraph).toBe(true)
    expect(resultBlockquote).toBe(true)
    expect(resultDoc).toBe(true)
  })

  it('should return true when attributes is null', () => {
    const docNode = n.doc(n.codeBlock({ language: 'typescript' }, '<a>code'))
    editor.set(docNode)

    const result = isNodeActive(editor.state, 'codeBlock', null)
    expect(result).toBe(true)
  })

  it('should match partial attributes', () => {
    const docNode = n.doc(n.codeBlock({ language: 'typescript', lineNumbers: true }, '<a>code'))
    editor.set(docNode)

    // Only checking language, should match even if there are other attrs
    const result = isNodeActive(editor.state, 'codeBlock', { language: 'typescript' })
    expect(result).toBe(true)
  })
})
