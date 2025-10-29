import { createEditor } from '@prosekit/core'
import {
  describe,
  expect,
  it,
} from 'vitest'

import { defineModClickPrevention } from './index'

describe('defineModClickPrevention', () => {
  it('creates an extension', () => {
    const extension = defineModClickPrevention()
    expect(extension).toBeDefined()
  })

  it('can be used in an editor', () => {
    const editor = createEditor({
      extensions: [defineModClickPrevention()],
    })
    expect(editor).toBeDefined()
    editor.unmount()
  })

  it('registers plugin with correct key', () => {
    const editor = createEditor({
      extensions: [defineModClickPrevention()],
    })
    const plugin = editor.view.state.plugins.find(
      (p) => (p as any).key && (p as any).key.startsWith?.('prosekit-mod-click-prevention'),
    )
    expect(plugin).toBeDefined()
    editor.unmount()
  })
})
