import { describe, expect, it } from 'vitest'

import { toggleMark } from './toggle-mark'
import { createTestEditor } from '../test/test-editor'

describe('toggleMark', () => {
  it('creates a command', () => {
    const editor = createTestEditor()
    const command = toggleMark({ type: 'bold' })
    expect(typeof command).toBe('function')
    editor.unmount()
  })

  it('toggles mark with default options', () => {
    const editor = createTestEditor()
    const command = toggleMark({ type: 'bold' })
    command(editor.state, editor.view.dispatch, editor.view)
    editor.unmount()
  })

  it('toggles mark with custom attributes', () => {
    const editor = createTestEditor()
    const command = toggleMark({ type: 'bold', attrs: { class: 'custom' } })
    command(editor.state, editor.view.dispatch, editor.view)
    editor.unmount()
  })

  it('toggles mark with removeWhenPresent option', () => {
    const editor = createTestEditor()
    const command = toggleMark({ type: 'bold', removeWhenPresent: true })
    command(editor.state, editor.view.dispatch, editor.view)
    editor.unmount()
  })

  it('toggles mark with enterInlineAtoms option', () => {
    const editor = createTestEditor()
    const command = toggleMark({ type: 'bold', enterInlineAtoms: false })
    command(editor.state, editor.view.dispatch, editor.view)
    editor.unmount()
  })
})
