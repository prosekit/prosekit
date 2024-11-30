import {
  describe,
  expect,
  it,
} from 'vitest'

import { union } from '../editor/union'
import { defineBaseCommands } from '../extensions/command'
import { defineDoc } from '../extensions/doc'
import { defineHistory } from '../extensions/history'
import { defineBaseKeymap } from '../extensions/keymap-base'
import { defineNodeSpec } from '../extensions/node-spec'
import { defineParagraph } from '../extensions/paragraph'
import { defineText } from '../extensions/text'
import { setupTestFromExtension } from '../testing'

describe('toggle-wrap', () => {
  const blockquoteExt = defineNodeSpec({
    name: 'blockquote',
    content: 'block+',
    group: 'block',
    defining: true,
    parseDOM: [{ tag: 'blockquote' }],
    toDOM() {
      return ['blockquote', 0]
    },
  })

  const extension = union(
    defineBaseCommands(),
    defineBaseKeymap(),
    defineDoc(),
    defineHistory(),
    defineParagraph(),
    defineText(),
    blockquoteExt,
  )

  it('adds the node wrapping the selection', () => {
    const { editor, n } = setupTestFromExtension(extension)

    const doc1 = n.doc(n.paragraph('<a>hello'))
    const doc2 = n.doc(n.blockquote(n.paragraph('<a>hello')))

    editor.set(doc1)
    expect(editor.state.doc.toJSON()).toEqual(doc1.toJSON())

    editor.commands.toggleWrap({ type: 'blockquote' })
    expect(editor.state.doc.toJSON()).toEqual(doc2.toJSON())
  })

  it('lift the wrapped node', () => {
    const { editor, n } = setupTestFromExtension(extension)

    const doc1 = n.doc(n.blockquote(n.paragraph('<a>hello')))
    const doc2 = n.doc(n.paragraph('<a>hello'))

    editor.set(doc1)
    expect(editor.state.doc.toJSON()).toEqual(doc1.toJSON())

    editor.commands.toggleWrap({ type: 'paragraph' })
    expect(editor.state.doc.toJSON()).toEqual(doc2.toJSON())
  })
})
