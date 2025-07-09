import type { Editor } from '@prosekit/core'
import type { EditorView } from '@prosekit/pm/view'

/**
 * @internal
 */
export function getSafeEditorView(editor?: Editor | null): EditorView | undefined {
  if (!editor || !editor.mounted) return
  return editor.view
}
