import {
  Plugin,
  PluginKey,
} from '@prosekit/pm/state'
import {
  describe,
  expect,
  it,
  vi,
} from 'vitest'

import { union } from '../editor/union'
import { withPriority } from '../editor/with-priority'
import {
  defineDoc,
  defineParagraph,
  defineText,
  setupTestFromExtension,
} from '../testing'
import { Priority } from '../types/priority'

import { definePlugin } from './plugin'

describe('plugin', () => {
  it('maintains plugin order in state based on priority', () => {
    const plugin1 = new Plugin({ key: new PluginKey('plugin-key-1') })
    const plugin2 = new Plugin({ key: new PluginKey('plugin-key-2') })
    const plugin3 = new Plugin({ key: new PluginKey('plugin-key-3') })
    const plugin4 = new Plugin({ key: new PluginKey('plugin-key-4') })
    const plugin5 = new Plugin({ key: new PluginKey('plugin-key-5') })

    const extension1 = definePlugin(() => [plugin1, plugin5]) // default priority
    const extension2 = withPriority(definePlugin(plugin2), Priority.highest)
    const extension3 = withPriority(definePlugin([plugin3]), Priority.lowest)
    const extension4 = definePlugin(plugin4) // default priority

    const { editor } = setupTestFromExtension(union(
      defineDoc(),
      defineParagraph(),
      defineText(),
      extension1,
      extension2,
      extension3,
      extension4,
    ))

    const pluginKeys = editor.state.plugins.map((plugin): string | undefined => {
      if (plugin === plugin1) return 'plugin-key-1'
      if (plugin === plugin2) return 'plugin-key-2'
      if (plugin === plugin3) return 'plugin-key-3'
      if (plugin === plugin4) return 'plugin-key-4'
      if (plugin === plugin5) return 'plugin-key-5'
      return undefined
    }).filter(Boolean)

    // The plugins with the highest priority should be listed
    // first in state. The plugins with the same priority should be listed in
    // the order of the extensions.
    expect(pluginKeys).toEqual([
      'plugin-key-2',
      'plugin-key-1',
      'plugin-key-5',
      'plugin-key-4',
      'plugin-key-3',
    ])
  })

  it('calls handlers in priority order with highest priority first', () => {
    const callOrder: string[] = []

    const handleKeyDown1 = vi.fn(() => {
      callOrder.push('default')
      return false
    })
    const handleKeyDown2 = vi.fn(() => {
      callOrder.push('highest')
      return false
    })
    const handleKeyDown3 = vi.fn(() => {
      callOrder.push('lowest')
      return false
    })

    const plugin1 = new Plugin({ props: { handleKeyDown: handleKeyDown1 } })
    const plugin2 = new Plugin({ props: { handleKeyDown: handleKeyDown2 } })
    const plugin3 = new Plugin({ props: { handleKeyDown: handleKeyDown3 } })

    const extension1 = definePlugin(plugin1) // default priority
    const extension2 = withPriority(definePlugin(plugin2), Priority.highest)
    const extension3 = withPriority(definePlugin(plugin3), Priority.lowest)

    const { editor } = setupTestFromExtension(union(
      defineDoc(),
      defineParagraph(),
      defineText(),
      extension1,
      extension2,
      extension3,
    ))

    editor.view.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp' }))

    // All handlers should be called since none returns true
    expect(handleKeyDown1).toHaveBeenCalledTimes(1)
    expect(handleKeyDown2).toHaveBeenCalledTimes(1)
    expect(handleKeyDown3).toHaveBeenCalledTimes(1)

    // The event handlers of the plugins with the highest priority should be called first
    expect(callOrder).toEqual([
      'highest',
      'default',
      'lowest',
    ])
  })
})
