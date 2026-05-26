import { describe, expect, it } from 'vitest'
import { defineBaseCommands, defineBaseKeymap, union } from '@prosekit/core'
import { userEvent } from 'vitest/browser'
import { defineDoc } from '../doc/index.ts'
import { defineParagraph } from '../paragraph/index.ts'
import { defineText } from '../text/index.ts'
import { defineBlockquote } from '../blockquote/index.ts'
import { setupTestFromExtension } from '../testing/index.ts'
import { defineCallout } from './callout.ts'

function setup() {
  const extension = union(
    defineDoc(),
    defineText(),
    defineParagraph(),
    defineBlockquote(),
    defineCallout(),
    defineBaseCommands(),
    defineBaseKeymap(),
  )
  return setupTestFromExtension(extension)
}

describe('callout input rule', () => {
  it('should convert > [!NOTE]  to callout with variant note', async () => {
    const { editor, n } = setup()
    editor.set(n.doc(n.paragraph('<a>')))

    // Type '> [!NOTE] ' with escaped brackets for userEvent keyboard
    await userEvent.keyboard('> {[}!NOTE{]} ')

    expect(editor.view.state.doc.toJSON()).toEqual(
      n.doc(n.callout({ variant: 'note' }, n.paragraph())).toJSON(),
    )
  })

  it('should convert > [!TIP]  to callout with variant tip', async () => {
    const { editor, n } = setup()
    editor.set(n.doc(n.paragraph('<a>')))

    await userEvent.keyboard('> {[}!TIP{]} ')

    expect(editor.view.state.doc.toJSON()).toEqual(
      n.doc(n.callout({ variant: 'tip' }, n.paragraph())).toJSON(),
    )
  })

  it('should convert > [!WARNING]  to callout with variant warning', async () => {
    const { editor, n } = setup()
    editor.set(n.doc(n.paragraph('<a>')))

    await userEvent.keyboard('> {[}!WARNING{]} ')

    expect(editor.view.state.doc.toJSON()).toEqual(
      n.doc(n.callout({ variant: 'warning' }, n.paragraph())).toJSON(),
    )
  })

  it('should be case insensitive', async () => {
    const { editor, n } = setup()
    editor.set(n.doc(n.paragraph('<a>')))

    await userEvent.keyboard('> {[}!caution{]} ')

    expect(editor.view.state.doc.toJSON()).toEqual(
      n.doc(n.callout({ variant: 'caution' }, n.paragraph())).toJSON(),
    )
  })
})
