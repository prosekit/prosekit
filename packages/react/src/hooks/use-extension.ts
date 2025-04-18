import type {
  Editor,
  Extension,
  Priority,
} from '@prosekit/core'

import { useEditorContext } from '../contexts/editor-context'

import { useEditorExtension } from './use-editor-extension'
import { usePriorityExtension } from './use-priority-extension'

export interface UseExtensionOptions {
  /**
   * The editor to add the extension to. If not provided, it will use the
   * editor from the nearest `ProseKit` component.
   */
  editor?: Editor

  /**
   * Optional priority to add the extension with.
   */
  priority?: Priority
}

/**
 * Add an extension to the editor.
 */
export function useExtension(
  /**
   * The extension to add to the editor. If it changes, the previous
   * extension will be removed and the new one (if not null) will be added.
   */
  extension: Extension | null,
  options?: UseExtensionOptions,
): void {
  const editorContext = useEditorContext()
  useEditorExtension(
    options?.editor || editorContext,
    usePriorityExtension(extension, options?.priority),
  )
}
