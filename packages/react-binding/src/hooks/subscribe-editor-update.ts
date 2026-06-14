import type { ReactBindingEditor } from '../editor/react-binding-editor.ts'

function isRenderUpdateEvent(event: string): boolean {
  return event === 'mount' || event === 'unmount' || event === 'state'
}

export function subscribeEditorUpdate(
  editor: ReactBindingEditor,
  onChange: VoidFunction,
): VoidFunction {
  const unsubscribe = editor.subscribe((event) => {
    if (isRenderUpdateEvent(event)) {
      onChange()
    }
  })

  return unsubscribe
}
