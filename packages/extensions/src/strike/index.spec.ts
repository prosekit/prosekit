import { createEditor } from '@prosekit/core'
import {
  describe,
  expect,
  it,
} from 'vitest'

import {
  defineStrike,
  defineStrikeCommands,
  defineStrikeInputRule,
  defineStrikeKeymap,
  defineStrikeSpec,
} from './index'

describe('strike extension', () => {
  it('defineStrikeSpec creates a mark spec extension', () => {
    const extension = defineStrikeSpec()
    expect(extension).toBeDefined()
  })

  it('defineStrikeCommands creates commands extension', () => {
    const extension = defineStrikeCommands()
    expect(extension).toBeDefined()
  })

  it('defineStrikeKeymap creates keymap extension', () => {
    const extension = defineStrikeKeymap()
    expect(extension).toBeDefined()
  })

  it('defineStrikeInputRule creates input rule extension', () => {
    const extension = defineStrikeInputRule()
    expect(extension).toBeDefined()
  })

  it('defineStrike creates combined extension', () => {
    const extension = defineStrike()
    expect(extension).toBeDefined()
  })

  it('can be used in an editor', () => {
    const editor = createEditor({
      extensions: [defineStrike()],
    })
    expect(editor).toBeDefined()
    expect(editor.commands.toggleStrike).toBeDefined()
    editor.unmount()
  })

  it('toggleStrike command works', () => {
    const editor = createEditor({
      extensions: [defineStrike()],
    })
    const result = editor.commands.toggleStrike()
    expect(typeof result).toBe('boolean')
    editor.unmount()
  })
})
