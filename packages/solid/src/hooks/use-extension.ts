import { Editor, type Extension } from '@prosekit/core'
import { type Accessor } from 'solid-js'

import type { MaybeAccessor } from '../types'

import { useEditorExtension } from './use-editor-extension'

/**
 * Add an extension to the editor.
 */
export function useExtension(
  /**
   * The accessor to an extension to add to the editor. If it changes, the previous
   * extension will be removed and the new one (if not null) will be added.
   */
  extension: Accessor<Extension | null>,
  options?: {
    /**
     * The editor to add the extension to. If not provided, it will use the
     * editor from the nearest `ProseKit` component.
     */
    editor?: MaybeAccessor<Editor>
  },
): void {
  useEditorExtension(options?.editor, extension)
}
