import { createEditor, defineBaseCommands, defineMarkSpec, elementFromNode, union, type Editor } from '@prosekit/core'
import type { ProseMirrorNode } from '@prosekit/pm/model'
import { describe, expect, it } from 'vitest'

import { defineDoc } from '../doc/index.ts'
import { defineParagraph } from '../paragraph/index.ts'
import { defineText } from '../text/index.ts'

import { defineMarkRule } from './index.ts'

describe('defineMarkRule', () => {
  const editor = createEditor({
    extension: union(
      defineDoc(),
      defineText(),
      defineParagraph(),
      defineBaseCommands(),
      defineMarkSpec({
        name: 'tag' as const,
        toDOM: () => {
          return ['mark-tag', 0]
        },
      }),
      defineMarkRule({
        regex: /#\d+/g,
        type: 'tag',
      }),
      defineMarkSpec({
        name: 'link' as const,
        toDOM: () => {
          return ['mark-link', 0]
        },
      }),
      defineMarkRule({
        regex: /example\.com(#\d+)?/g,
        type: 'link',
      }),
      defineMarkSpec({
        name: 'email' as const,
        toDOM: () => {
          return ['mark-email', 0]
        },
      }),
      defineMarkRule({
        regex: /[a-z]+@example\.com/g,
        type: 'email',
      }),
    ),
  })

  const triggerMarkRule = (doc: ProseMirrorNode): string => {
    setDoc(editor, doc)
    editor.commands.insertText({ from: 1, text: ' ' })
    return elementFromNode(editor.state.doc).innerHTML
  }

  const n = { ...editor.nodes, p: editor.nodes.paragraph }

  it('can match tag', () => {
    const doc = n.doc(n.p('#12345'))
    const html = triggerMarkRule(doc)

    expect(html).toMatchInlineSnapshot(`"<p> <mark-tag>#12345</mark-tag></p>"`)
  })

  it('can match link', () => {
    const doc = n.doc(n.p('example.com'))
    const html = triggerMarkRule(doc)

    expect(html).toMatchInlineSnapshot(
      `"<p> <mark-link>example.com</mark-link></p>"`,
    )
  })

  it('can match link with anchor', () => {
    const doc = n.doc(n.p('example.com#12345'))
    const html = triggerMarkRule(doc)

    expect(html).toMatchInlineSnapshot(
      `"<p> <mark-link>example.com#12345</mark-link></p>"`,
    )
  })

  it('can match email', () => {
    const doc = n.doc(n.p('hello@example.com'))
    const html = triggerMarkRule(doc)

    expect(html).toMatchInlineSnapshot(
      `"<p> <mark-email>hello@example.com</mark-email></p>"`,
    )
  })

  it('can match email and tag', () => {
    const doc = n.doc(n.p('hello@example.com#12345'))
    const html = triggerMarkRule(doc)

    expect(html).toMatchInlineSnapshot(
      `"<p> <mark-email>hello@example.com</mark-email><mark-tag>#12345</mark-tag></p>"`,
    )
  })
})

function setDoc(editor: Editor, doc: ProseMirrorNode) {
  if (!editor.mounted) {
    const div = document.createElement('div')
    editor.mount(div)
  }

  const tr = editor.state.tr
  tr.replaceWith(0, tr.doc.content.size, doc.content)
  editor.view.dispatch(tr)
}
