import type {
  Editor,
  Extension,
  Priority,
} from '@prosekit/core'
import type { MaybeRefOrGetter } from 'vue'

import { useEditorExtension } from './use-editor-extension'
import { usePriorityExtension } from './use-priority-extension'

export interface UseExtensionOptions {
  /**
   * The editor to add the extension to. If not provided, it will use the
   * editor from the nearest `ProseKit` component.
   */
  editor?: MaybeRefOrGetter<Editor>

  /**
   * Optional priority to add the extension with.
   */
  priority?: Priority
}

/**
 * Add an extension to the editor.
 *
 * @public
 */
export function useExtension(
  /**
   * The ref to an extension to add to the editor. If it changes, the previous
   * extension will be removed and the new one (if not null) will be added.
   */
  extension: MaybeRefOrGetter<Extension | null>,
  options?: UseExtensionOptions,
): void {
  useEditorExtension(
    options?.editor,
    usePriorityExtension(extension, options?.priority),
  )
}
