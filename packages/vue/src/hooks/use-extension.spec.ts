import { createEditor, defineNodeSpec, definePlugin, union, type defineBaseCommands, type Editor } from '@prosekit/core'
import { Plugin, PluginKey } from '@prosekit/pm/state'
import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import { defineComponent } from 'vue'

import { useExtension } from './use-extension.ts'

function defineText() {
  return defineNodeSpec({ name: 'text', topNode: true })
}

describe('useExtension', () => {
  it('should register and dispose an extension', async () => {
    const editor = createEditor({
      extension: union(defineText()),
    }) as Editor<ReturnType<typeof defineBaseCommands>>

    editor.mount(document.createElement('div'))

    const pluginKey = new PluginKey('test-plugin-key')
    const extension = definePlugin(new Plugin({ key: pluginKey }))
    const hasPlugin = (): boolean => {
      const plugins = editor.state.plugins
      return plugins.some((plugin) => plugin.spec.key === pluginKey)
    }
    const usePlugin = () => useExtension(extension, { editor })

    const TestComponent = defineComponent({
      setup: () => {
        usePlugin()
      },
      render: () => null,
    })

    await vi.waitFor(() => expect(hasPlugin()).toBe(false))
    const wrapper = mount(TestComponent)
    await vi.waitFor(() => expect(hasPlugin()).toBe(true))
    wrapper.unmount()
    await vi.waitFor(() => expect(hasPlugin()).toBe(false))
  })

  it('should not print warning if the editor context is not available', () => {
    const editor = createEditor({
      extension: union(defineText()),
    }) as Editor<ReturnType<typeof defineBaseCommands>>
    editor.mount(document.createElement('div'))

    const pluginKey = new PluginKey('test-plugin-key')
    const extension = definePlugin(new Plugin({ key: pluginKey }))

    const TestComponent = defineComponent({
      setup: () => {
        useExtension(extension, { editor })
      },
      render: () => null,
    })

    const messages: string[] = []
    const warnHandler = vi.fn((message: string) => {
      messages.push(message)
    })

    const wrapper = mount(TestComponent, {
      global: {
        config: {
          warnHandler,
        },
      },
    })
    wrapper.unmount()

    expect(messages).toEqual([])
  })
})
