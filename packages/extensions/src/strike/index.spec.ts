import {
  createEditor,
  union,
} from '@prosekit/core'
import {
  describe,
  expect,
  it,
} from 'vitest'

import { defineDoc } from '../doc'
import { defineParagraph } from '../paragraph'
import { defineText } from '../text'

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
    const extension = union(
      defineDoc(),
      defineParagraph(),
      defineText(),
      defineStrike(),
    )
    const editor = createEditor({
      extension,
    })
    expect(editor).toBeDefined()
    expect(editor.commands.toggleStrike).toBeDefined()
    editor.unmount()
  })

  it('toggleStrike command works', () => {
    const extension = union(
      defineDoc(),
      defineParagraph(),
      defineText(),
      defineStrike(),
    )
    const editor = createEditor({
      extension,
    })
    const result = editor.commands.toggleStrike()
    expect(typeof result).toBe('boolean')
    editor.unmount()
  })
})
