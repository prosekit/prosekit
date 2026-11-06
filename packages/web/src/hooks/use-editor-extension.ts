import { useEffect, type HostElement } from '@aria-ui/core'
import type { Editor, Extension } from '@prosekit/core'

interface PendingDispose {
  editor: Editor
  dispose: VoidFunction
  timeout: ReturnType<typeof setTimeout>
}

export function useEditorExtension(
  host: HostElement,
  getEditor: () => Editor | null,
  extension: Extension,
): void {
  // The effect cleanup runs in `disconnectedCallback`. Removing the extension
  // there would update the editor view synchronously, for example in the
  // middle of a framework's DOM removal. So the removal runs in the next task.
  // If the element reconnects before that, for example when it is moved in the
  // DOM, the pending removal is canceled and the extension stays.
  let pending: PendingDispose | undefined

  useEffect(host, () => {
    const editor = getEditor()
    if (!editor) return

    let dispose: VoidFunction
    if (pending?.editor === editor) {
      clearTimeout(pending.timeout)
      dispose = pending.dispose
    } else {
      dispose = editor.use(extension)
    }
    pending = undefined

    return () => {
      const timeout = setTimeout(() => {
        if (pending?.timeout === timeout) {
          pending = undefined
        }
        dispose()
      })
      pending = { editor, dispose, timeout }
    }
  })
}
