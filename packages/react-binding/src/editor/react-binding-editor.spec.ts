import { describe, expect, it } from 'vitest'

import { type NodeJSON } from '@prosekit/core'
import { defineTestExtension } from '../../../testing/src/index.ts'
import { createReactBindingEditor } from './react-binding-editor.ts'

describe('ReactBindingEditor', () => {
  const initialContent: NodeJSON = {
    type: 'doc',
    content: [{
      type: 'paragraph',
      content: [{ type: 'text', text: 'Hi' }],
    }],
  }

  it('returns a stable snapshot until state changes', () => {
    const editor = createReactBindingEditor({
      extension: defineTestExtension(),
      defaultContent: initialContent,
    })

    const snapshot1 = editor.getSnapshot()
    const snapshot2 = editor.getSnapshot()

    expect(snapshot1).toBe(snapshot2)

    editor.onTransaction(editor.state.tr.insertText('!', 3))

    const snapshot3 = editor.getSnapshot()
    expect(snapshot3).not.toBe(snapshot2)
    expect(snapshot3.state.doc.textContent).toBe('Hi!')
  })

  it('can export document json and html', () => {
    const editor = createReactBindingEditor({
      extension: defineTestExtension(),
      defaultContent: initialContent,
    })

    expect(editor.getDocJSON()).toEqual(initialContent)
    expect(editor.getDocHTML()).toBe('<div><p>Hi</p></div>')
  })
})
