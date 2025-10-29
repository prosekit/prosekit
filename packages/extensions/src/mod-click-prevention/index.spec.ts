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

import { defineModClickPrevention } from './index'

describe('defineModClickPrevention', () => {
  it('creates an extension', () => {
    const extension = defineModClickPrevention()
    expect(extension).toBeDefined()
  })

  it('can be used in an editor', () => {
    const extension = union(
      defineDoc(),
      defineParagraph(),
      defineText(),
      defineModClickPrevention(),
    )
    const editor = createEditor({
      extension,
    })
    expect(editor).toBeDefined()
    editor.unmount()
  })

  it('registers plugin with correct key', () => {
    const extension = union(
      defineDoc(),
      defineParagraph(),
      defineText(),
      defineModClickPrevention(),
    )
    const editor = createEditor({
      extension,
    })
    const div = document.body.appendChild(document.createElement('div'))
    editor.mount(div)
    const plugin = editor.view.state.plugins.find(
      (p) =>
        (p as any).key &&
        String((p as any).key).includes('prosekit-mod-click-prevention'),
    )
    expect(plugin).toBeDefined()
    editor.unmount()
    document.body.removeChild(div)
  })
})
