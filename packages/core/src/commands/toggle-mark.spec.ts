import {
  describe,
  expect,
  it,
} from 'vitest'

import { setupTest } from '../testing'
import { toggleMark } from './toggle-mark'

describe('toggleMark', () => {
  it('creates a command', () => {
    const { editor } = setupTest()
    const command = toggleMark({ type: 'bold' })
    expect(typeof command).toBe('function')
    editor.unmount()
  })

  it('toggles mark with default options', () => {
    const { editor } = setupTest()
    const command = toggleMark({ type: 'bold' })
    command(editor.state, editor.view.dispatch, editor.view)
    editor.unmount()
  })

  it('toggles mark with custom attributes', () => {
    const { editor } = setupTest()
    const command = toggleMark({ type: 'bold', attrs: { class: 'custom' } })
    command(editor.state, editor.view.dispatch, editor.view)
    editor.unmount()
  })

  it('toggles mark with removeWhenPresent option', () => {
    const { editor } = setupTest()
    const command = toggleMark({ type: 'bold', removeWhenPresent: true })
    command(editor.state, editor.view.dispatch, editor.view)
    editor.unmount()
  })

  it('toggles mark with enterInlineAtoms option', () => {
    const { editor } = setupTest()
    const command = toggleMark({ type: 'bold', enterInlineAtoms: false })
    command(editor.state, editor.view.dispatch, editor.view)
    editor.unmount()
  })
})
