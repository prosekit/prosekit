import type { Extension, Priority } from '@prosekit/core'

import { useEditorContext } from '../contexts/editor-context.ts'
import type { ReactBindingEditor } from '../editor/react-binding-editor.ts'

import { useEditorExtension } from './use-editor-extension.ts'
import { usePriorityExtension } from './use-priority-extension.ts'

export interface UseExtensionOptions {
  editor?: ReactBindingEditor
  priority?: Priority
}

export function useExtension(
  extension: Extension | null,
  options?: UseExtensionOptions,
): void {
  const editorContext = useEditorContext()
  useEditorExtension(
    options?.editor || editorContext,
    usePriorityExtension(extension, options?.priority),
  )
}
