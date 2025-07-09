import {
  Priority,
  union,
  withPriority,
  type PlainExtension,
} from '@prosekit/core'
import type { ProseMirrorNode } from '@prosekit/pm/model'
import {
  Fragment,
  Slice,
} from '@prosekit/pm/model'
import {
  describe,
  expect,
  it,
} from 'vitest'

import {
  defineTestExtension,
  setupTestFromExtension,
} from '../testing'

import { definePasteRule } from './paste-rule'

function replaceTextInSlice(slice: Slice, from: string, to: string): Slice {
  return new Slice(
    replaceTextInFragment(slice.content, from, to),
    slice.openStart,
    slice.openEnd,
  )
}

function replaceTextInFragment(fragment: Fragment, from: string, to: string): Fragment {
  return Fragment.fromArray(fragment.content.map(node => replaceTextInNode(node, from, to)))
}

function replaceTextInNode(node: ProseMirrorNode, from: string, to: string): ProseMirrorNode {
  const text = node.text
  if (text != null) {
    return node.type.schema.text(text.replaceAll(from, to))
  }
  return node.copy(replaceTextInFragment(node.content, from, to))
}

function defineTextReplacePasteRule(from: string, to: string): PlainExtension {
  return definePasteRule({
    handler: ({ slice }) => {
      return replaceTextInSlice(slice, from, to)
    },
  })
}

describe('paste rule', () => {
  it('can transform pasted HTML', () => {
    const extension = union(
      defineTestExtension(),
      defineTextReplacePasteRule('Foo', 'Bar'),
    )
    const { editor } = setupTestFromExtension(extension)
    editor.view.pasteHTML('<div>Foo</div>')
    expect(editor.getDocHTML()).not.toContain(`Foo`)
    expect(editor.getDocHTML()).toContain(`Bar`)
  })

  it('can transform pasted text', () => {
    const extension = union(
      defineTestExtension(),
      defineTextReplacePasteRule('Foo', 'Bar'),
    )
    const { editor } = setupTestFromExtension(extension)
    editor.view.pasteText('Foo')
    expect(editor.getDocHTML()).not.toContain(`Foo`)
    expect(editor.getDocHTML()).toContain(`Bar`)
  })

  it('can order multiple paste rules', () => {
    const extension = union(
      defineTestExtension(),
      withPriority(defineTextReplacePasteRule('Foo', 'Bar'), Priority.high),
      withPriority(defineTextReplacePasteRule('Foo', 'Baz'), Priority.low),
    )
    const { editor } = setupTestFromExtension(extension)
    editor.view.pasteText('Foo')
    expect(editor.getDocHTML()).not.toContain(`Foo`)
    expect(editor.getDocHTML()).toContain(`Bar`)
    expect(editor.getDocHTML()).not.toContain(`Baz`)

    editor.use(defineTextReplacePasteRule('Bar', 'Qux'))
    editor.setContent('')
    editor.view.pasteText('Foo')
    expect(editor.getDocHTML()).not.toContain(`Foo`)
    expect(editor.getDocHTML()).not.toContain(`Bar`)
    expect(editor.getDocHTML()).not.toContain(`Baz`)
    expect(editor.getDocHTML()).toContain(`Qux`)
  })
})
