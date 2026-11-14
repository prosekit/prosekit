import { defineCustomElement, defineProps, registerCustomElement, type HostElement, type State } from '@aria-ui/core'
import { createEditor, definePlugin, union, type Editor } from '@prosekit/core'
import { defineDoc } from '@prosekit/extensions/doc'
import { defineParagraph } from '@prosekit/extensions/paragraph'
import { defineText } from '@prosekit/extensions/text'
import { Plugin, PluginKey } from '@prosekit/pm/state'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { useEditorExtension } from './use-editor-extension.ts'

interface TestProps {
  editor: Editor | null
}

const key = new PluginKey('use-editor-extension-test')

function setup(host: HostElement, props: State<TestProps>): void {
  useEditorExtension(host, props.editor.get, definePlugin(new Plugin({ key })))
}

const TestElement = defineCustomElement<TestProps>(
  setup,
  defineProps<TestProps>({
    editor: { default: null, attribute: false, type: 'json' },
  }),
)

registerCustomElement('test-use-editor-extension', TestElement)

function nextTask(): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve))
}

describe('useEditorExtension', () => {
  const cleanups: VoidFunction[] = []

  afterEach(() => {
    for (const cleanup of cleanups.splice(0)) {
      cleanup()
    }
  })

  function setupEditor() {
    const editor = createEditor({ extension: union(defineDoc(), defineText(), defineParagraph()) })
    const place = document.createElement('div')
    document.body.append(place)
    editor.mount(place)

    const element = document.createElement('test-use-editor-extension') as HostElement & TestProps
    element.editor = editor

    cleanups.push(() => {
      element.remove()
      editor.unmount()
      place.remove()
    })

    const hasPlugin = () => key.get(editor.state) != null
    return { editor, element, hasPlugin }
  }

  it('adds the extension at once and removes it in the next task', async () => {
    const { element, hasPlugin } = setupEditor()

    document.body.append(element)
    expect(hasPlugin()).toBe(true)

    element.remove()
    expect(hasPlugin()).toBe(true)
    await nextTask()
    expect(hasPlugin()).toBe(false)
  })

  it('does not update the editor view when the element is disconnected', async () => {
    const { editor, element } = setupEditor()

    document.body.append(element)

    const updateState = vi.spyOn(editor.view, 'updateState')
    element.remove()
    expect(updateState).not.toHaveBeenCalled()
    await nextTask()
    expect(updateState).toHaveBeenCalled()
  })

  it('keeps the extension when the element is moved', async () => {
    const { element, hasPlugin } = setupEditor()

    document.body.append(element)
    expect(hasPlugin()).toBe(true)

    const container = document.createElement('div')
    document.body.append(container)
    cleanups.push(() => container.remove())
    container.append(element)

    await nextTask()
    expect(hasPlugin()).toBe(true)

    element.remove()
    await nextTask()
    expect(hasPlugin()).toBe(false)
  })
})
