import type { Command } from '@prosekit/pm/state'
import { describe, expect, it, vi } from 'vitest'

import { createEditor } from '../editor/editor'
import { union } from '../editor/union'

import { defineDoc } from './doc'
import { defineKeymap, type Keymap } from './keymap'
import { defineParagraph } from './paragraph'
import { defineText } from './text'

describe('keymap', () => {
  it('can register and unregister keymap', () => {
    const div = document.body.appendChild(document.createElement('div'))
    const editor = createEditor({
      extension: union(defineDoc(), defineText(), defineParagraph()),
    })
    editor.mount(div)

    const command1: Command = vi.fn(() => false)
    const command2: Command = vi.fn(() => false)

    const keymap1: Keymap = { Enter: command1 }
    const keymap2: Keymap = { Enter: command2 }

    const extension1 = defineKeymap(keymap1)
    const extension2 = defineKeymap(keymap2)

    const dispose1 = editor.use(extension1)

    editor.view.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }))
    expect(command1).toHaveBeenCalledTimes(1)
    expect(command2).toHaveBeenCalledTimes(0)

    const dispose2 = editor.use(extension2)

    editor.view.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }))
    expect(command1).toHaveBeenCalledTimes(2)
    expect(command2).toHaveBeenCalledTimes(1)

    dispose1()

    editor.view.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }))
    expect(command1).toHaveBeenCalledTimes(2)
    expect(command2).toHaveBeenCalledTimes(2)

    dispose2()

    editor.view.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }))
    expect(command1).toHaveBeenCalledTimes(2)
    expect(command2).toHaveBeenCalledTimes(2)
  })

  it('can skip unnecessary plugin update', () => {
    const div = document.body.appendChild(document.createElement('div'))
    const editor = createEditor({
      extension: union(defineDoc(), defineText(), defineParagraph()),
    })
    editor.mount(div)

    const command1: Command = vi.fn(() => false)
    const command2: Command = vi.fn(() => false)

    const keymap1: Keymap = { Enter: command1 }
    const keymap2: Keymap = { Enter: command2 }

    const extension1 = defineKeymap(keymap1)
    const extension2 = defineKeymap(keymap2)

    const dispose1 = editor.use(extension1)
    const plugins1 = [...editor.view.state.plugins]

    const dispose2 = editor.use(extension2)
    const plugins2 = [...editor.view.state.plugins]

    dispose2()
    const plugins3 = [...editor.view.state.plugins]

    dispose1()
    const plugins4 = [...editor.view.state.plugins]

    expect(plugins1).toEqual(plugins2)
    expect(plugins2).toEqual(plugins3)
    expect(plugins3).toEqual(plugins4)
  })
})
