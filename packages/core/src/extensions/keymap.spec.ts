import type { Command } from '@prosekit/pm/state'
import {
  describe,
  expect,
  it,
  vi,
} from 'vitest'

import { union } from '../editor/union'
import { withPriority } from '../editor/with-priority'
import { setupTest } from '../testing'
import { Priority } from '../types/priority'

import {
  defineKeymap,
  type Keymap,
} from './keymap'

describe('keymap', () => {
  it('can register and unregister keymap', () => {
    const { editor } = setupTest()

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
    const { editor } = setupTest()

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

  it('respects priority and calls highest priority first', () => {
    const { editor } = setupTest()

    const callOrder: string[] = []

    const command1: Command = vi.fn(() => {
      callOrder.push('default')
      return false
    })
    const command2: Command = vi.fn(() => {
      callOrder.push('highest')
      return false
    })
    const command3: Command = vi.fn(() => {
      callOrder.push('lowest')
      return false
    })

    const keymap1: Keymap = { ArrowUp: command1 }
    const keymap2: Keymap = { ArrowUp: command2 }
    const keymap3: Keymap = { ArrowUp: command3 }

    const extension1 = defineKeymap(keymap1)
    const extension2 = withPriority(defineKeymap(keymap2), Priority.highest)
    const extension3 = withPriority(defineKeymap(keymap3), Priority.lowest)

    const combinedExtension = union(extension1, extension2, extension3)
    editor.use(combinedExtension)

    editor.view.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp' }))

    // All commands should be called since none returns true
    expect(command1).toHaveBeenCalledTimes(1)
    expect(command2).toHaveBeenCalledTimes(1)
    expect(command3).toHaveBeenCalledTimes(1)

    // Highest priority should be called first
    expect(callOrder).toEqual(['highest', 'default', 'lowest'])
  })
})
