import { defineNodeAttr, union } from '@prosekit/core'
import { describe, expect, it } from 'vitest'

import { defineDoc } from '../doc/index.ts'
import { defineParagraph } from '../paragraph/index.ts'
import { setupTestFromExtension } from '../testing/index.ts'
import { defineText } from '../text/index.ts'

import { defineHorizontalRule } from './horizontal-rule.ts'

function defineMarkerAttr() {
  return defineNodeAttr<'horizontalRule', 'marker', string | null>({
    type: 'horizontalRule',
    attr: 'marker',
    default: null,
    toDOM: (value) => (value ? ['data-hr-marker', value] : null),
    parseDOM: (node: HTMLElement) => node.getAttribute('data-hr-marker'),
  })
}

function setup() {
  const extension = union(
    defineDoc(),
    defineText(),
    defineParagraph(),
    defineHorizontalRule(),
    defineMarkerAttr(),
  )
  return setupTestFromExtension(extension)
}

describe('defineHorizontalRuleSpec', () => {
  it('persists a node attribute through a DOM round-trip', () => {
    const { editor } = setup()
    const withMarker = {
      type: 'doc',
      content: [{ type: 'horizontalRule', attrs: { marker: '***' } }],
    }

    // The attribute lives on the rendered `<div>`, where `defineNodeAttr` writes it.
    editor.setContent('<div class="prosekit-horizontal-rule" data-hr-marker="***"><hr></div>')
    expect(editor.getDocJSON()).toEqual(withMarker)

    // It survives a serialize/parse round-trip through the editor's own HTML.
    editor.setContent(editor.getDocHTML())
    expect(editor.getDocJSON()).toEqual(withMarker)
  })

  it('parses a bare <hr> as a horizontal rule', () => {
    const { editor } = setup()
    editor.setContent('<hr>')
    expect(editor.getDocJSON()).toEqual({
      type: 'doc',
      content: [{ type: 'horizontalRule', attrs: { marker: null } }],
    })
  })
})
