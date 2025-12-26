import { NodeSelection } from '@prosekit/pm/state'
import {
  describe,
  expect,
  it,
} from 'vitest'

import { setupTest } from '../testing'

import { isNodeActive } from './is-node-active'

describe('isNodeActive', () => {
  it('should return true when cursor is in a node of the specified type', () => {
    const { editor, n } = setupTest()
    editor.set(n.doc(n.p('Hello <a>world')))

    expect(isNodeActive(editor.state, 'paragraph')).toBe(true)
  })

  it('should return false when cursor is not in a node of the specified type', () => {
    const { editor, n } = setupTest()
    editor.set(n.doc(n.p('Hello <a>world')))

    expect(isNodeActive(editor.state, 'codeBlock')).toBe(false)
  })

  it('should return true when cursor is in a nested node of the specified type', () => {
    const { editor, n } = setupTest()
    editor.set(n.doc(n.blockquote(n.p('Hello <a>world'))))

    expect(isNodeActive(editor.state, 'blockquote')).toBe(true)
  })

  it('should return true when cursor is in a node with matching attributes', () => {
    const { editor, n } = setupTest()
    editor.set(n.doc(n.codeBlock({ language: 'typescript' }, '<a>code')))

    expect(isNodeActive(editor.state, 'codeBlock', { language: 'typescript' })).toBe(true)
  })

  it('should return false when cursor is in a node with non-matching attributes', () => {
    const { editor, n } = setupTest()
    editor.set(n.doc(n.codeBlock({ language: 'typescript' }, '<a>code')))

    expect(isNodeActive(editor.state, 'codeBlock', { language: 'javascript' })).toBe(false)
  })

  it('should return true when using NodeSelection with matching type', () => {
    const { editor, n } = setupTest()
    editor.set(n.doc(n.p('Hello world')))

    const $pos = editor.state.doc.resolve(0)
    const state = editor.state.apply(
      editor.state.tr.setSelection(NodeSelection.create(editor.state.doc, $pos.pos)),
    )

    expect(isNodeActive(state, 'paragraph')).toBe(true)
  })

  it('should return true when using NodeSelection with matching type and attributes', () => {
    const { editor, n } = setupTest()
    editor.set(n.doc(n.codeBlock({ language: 'python' }, 'code')))

    const $pos = editor.state.doc.resolve(0)
    const state = editor.state.apply(
      editor.state.tr.setSelection(NodeSelection.create(editor.state.doc, $pos.pos)),
    )

    expect(isNodeActive(state, 'codeBlock', { language: 'python' })).toBe(true)
  })

  it('should return false when using NodeSelection with non-matching attributes', () => {
    const { editor, n } = setupTest()
    editor.set(n.doc(n.codeBlock({ language: 'python' }, 'code')))

    const $pos = editor.state.doc.resolve(0)
    const state = editor.state.apply(
      editor.state.tr.setSelection(NodeSelection.create(editor.state.doc, $pos.pos)),
    )

    expect(isNodeActive(state, 'codeBlock', { language: 'javascript' })).toBe(false)
  })

  it('should work with NodeType instead of string', () => {
    const { editor, n } = setupTest()
    editor.set(n.doc(n.p('Hello <a>world')))

    expect(isNodeActive(editor.state, editor.state.schema.nodes.paragraph)).toBe(true)
  })

  it('should return true when node is at any depth in the hierarchy', () => {
    const { editor, n } = setupTest()
    editor.set(n.doc(n.blockquote(n.p('Hello <a>world'))))

    expect(isNodeActive(editor.state, 'paragraph')).toBe(true)
    expect(isNodeActive(editor.state, 'blockquote')).toBe(true)
    expect(isNodeActive(editor.state, 'doc')).toBe(true)
  })

  it('should return true when attributes is null', () => {
    const { editor, n } = setupTest()
    editor.set(n.doc(n.codeBlock({ language: 'typescript' }, '<a>code')))

    expect(isNodeActive(editor.state, 'codeBlock', null)).toBe(true)
  })

  it('should match partial attributes', () => {
    const { editor, n } = setupTest()
    editor.set(n.doc(n.codeBlock({ language: 'typescript', lineNumbers: true }, '<a>code')))

    expect(isNodeActive(editor.state, 'codeBlock', { language: 'typescript' })).toBe(true)
  })
})
