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
    const plugins = {
      a: new Plugin({ key: new PluginKey('a') }),
      b: new Plugin({ key: new PluginKey('b') }),
      c: new Plugin({ key: new PluginKey('c') }),
      d: new Plugin({ key: new PluginKey('d') }),
      e: new Plugin({ key: new PluginKey('e') }),
    }

    const extension1 = definePlugin(() => [plugins.a, plugins.d]) // default priority
    const extension2 = withPriority(definePlugin(plugins.b), Priority.highest)
    const extension3 = withPriority(definePlugin([plugins.c]), Priority.lowest)
    const extension4 = definePlugin(plugins.e) // default priority

    const { editor } = setupTestFromExtension(union(
      defineDoc(),
      defineParagraph(),
      defineText(),
      extension1,
      extension2,
      extension3,
      extension4,
    ))

    const pluginKeys = editor.state.plugins.map((plugin) => {
      for (const [key, value] of Object.entries(plugins)) {
        if (plugin === value) {
          return key
        }
      }
      return undefined
    }).filter(Boolean)

    // The plugins with the highest priority should be listed
    // first in state. The plugins with the same priority should be listed in
    // the order of the extensions.
    expect(pluginKeys).toEqual([
      // Highest priority
      'b',

      // Default priority, added in the last extension
      'e',

      // Default priority, added as the second plugin in the first extension
      'd',

      // Default priority, added as the first plugin in the first extension
      'a',

      // Lowest priority
      'c',
    ])
  })

  it('calls handlers in priority order with highest priority first', () => {
    const callOrder: string[] = []

    const handleKeyDownA = vi.fn(() => {
      callOrder.push('a')
      return false
    })
    const handleKeyDownB = vi.fn(() => {
      callOrder.push('b')
      return false
    })
    const handleKeyDownC = vi.fn(() => {
      callOrder.push('c')
      return false
    })
    const handleKeyDownD = vi.fn(() => {
      callOrder.push('d')
      return false
    })
    const handleKeyDownE = vi.fn(() => {
      callOrder.push('e')
      return false
    })

    const plugins = {
      a: new Plugin({ props: { handleKeyDown: handleKeyDownA } }),
      b: new Plugin({ props: { handleKeyDown: handleKeyDownB } }),
      c: new Plugin({ props: { handleKeyDown: handleKeyDownC } }),
      d: new Plugin({ props: { handleKeyDown: handleKeyDownD } }),
      e: new Plugin({ props: { handleKeyDown: handleKeyDownE } }),
    }

    const extension1 = definePlugin(() => [plugins.a, plugins.d]) // default priority
    const extension2 = withPriority(definePlugin(plugins.b), Priority.highest)
    const extension3 = withPriority(definePlugin([plugins.c]), Priority.lowest)
    const extension4 = definePlugin(plugins.e) // default priority

    const { editor } = setupTestFromExtension(union(
      defineDoc(),
      defineParagraph(),
      defineText(),
      extension1,
      extension2,
      extension3,
      extension4,
    ))

    editor.view.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp' }))

    // All handlers should be called since none returns true
    expect(handleKeyDownA).toHaveBeenCalledTimes(1)
    expect(handleKeyDownB).toHaveBeenCalledTimes(1)
    expect(handleKeyDownC).toHaveBeenCalledTimes(1)
    expect(handleKeyDownD).toHaveBeenCalledTimes(1)
    expect(handleKeyDownE).toHaveBeenCalledTimes(1)

    // The event handlers of the plugins with the highest priority should be called first
    expect(callOrder).toEqual([
      // Highest priority
      'b',

      // Default priority, added in the last extension
      'e',

      // Default priority, added as the second plugin in the first extension
      'd',

      // Default priority, added as the first plugin in the first extension
      'a',

      // Lowest priority
      'c',
    ])
  })
})
