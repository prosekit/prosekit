import { describe, expect, it } from 'vitest'
import { defineBaseCommands, union } from '@prosekit/core'
import { defineDoc } from '../doc/index.ts'
import { defineParagraph } from '../paragraph/index.ts'
import { defineText } from '../text/index.ts'
import { setupTestFromExtension } from '../testing/index.ts'
import { defineCallout } from './callout.ts'

function setup() {
  const extension = union(
    defineDoc(),
    defineText(),
    defineParagraph(),
    defineCallout(),
    defineBaseCommands(),
  )
  return setupTestFromExtension(extension)
}

describe('callout commands', () => {
  it('should wrap paragraph with setCallout', () => {
    const { editor, n } = setup()
    editor.set(n.doc(n.paragraph('hello')))
    editor.commands.setCallout({ variant: 'tip' })
    expect(editor.state.doc.toJSON()).toEqual(
      n.doc(n.callout({ variant: 'tip' }, n.paragraph('hello'))).toJSON(),
    )
  })

  it('should insert empty callout after current block', () => {
    const { editor, n } = setup()
    editor.set(n.doc(n.paragraph('hello<a>')))
    editor.commands.insertCallout({ variant: 'warning' })
    expect(editor.state.doc.toJSON()).toEqual(
      n.doc(n.paragraph('hello'), n.callout({ variant: 'warning' }, n.paragraph())).toJSON(),
    )
  })

  it('should toggle callout on and off', () => {
    const { editor, n } = setup()
    editor.set(n.doc(n.paragraph('hello')))
    editor.commands.toggleCallout({ variant: 'note' })
    expect(editor.state.doc.toJSON()).toEqual(
      n.doc(n.callout({ variant: 'note' }, n.paragraph('hello'))).toJSON(),
    )

    editor.commands.toggleCallout()
    expect(editor.state.doc.toJSON()).toEqual(
      n.doc(n.paragraph('hello')).toJSON(),
    )
  })

  it('should update callout variant via updateCallout', () => {
    const { editor, n } = setup()
    editor.set(n.doc(n.callout({ variant: 'note' }, n.paragraph('hello'))))
    editor.commands.updateCallout({ variant: 'caution' })
    expect(editor.state.doc.toJSON()).toEqual(
      n.doc(n.callout({ variant: 'caution' }, n.paragraph('hello'))).toJSON(),
    )
  })
})
