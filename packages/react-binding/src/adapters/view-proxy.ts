import type { EditorView } from '@prosekit/pm/view'
import type { ReactBindingEditor } from '../editor/react-binding-editor.ts'

/**
 * Creates a Proxy that lazily forwards all property access to the
 * current EditorView held by the ReactBindingEditor. This ensures
 * node/mark view components always see the latest view, even if the
 * underlying view changes.
 */
export function createEditorViewProxy(
  editor: ReactBindingEditor,
): EditorView {
  return new Proxy({} as EditorView, {
    get(_target, prop) {
      const view = editor.view
      const value = Reflect.get(view, prop)

      if (typeof value === 'function') {
        return value.bind(view)
      }

      return value
    },
    has(_target, prop) {
      return prop in editor.view
    },
    ownKeys() {
      return Reflect.ownKeys(editor.view)
    },
    getOwnPropertyDescriptor(_target, prop) {
      return Object.getOwnPropertyDescriptor(editor.view, prop)
    },
  })
}
