import { Editor, type Extension } from '@prosekit/core'
import { type MaybeRefOrGetter } from 'vue'

import { useEditorExtension } from './use-editor-extension'

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
  options?: {
    /**
     * The editor to add the extension to. If not provided, it will use the
     * editor from the nearest `ProseKit` component.
     */
    editor?: MaybeRefOrGetter<Editor>
  },
) {
  useEditorExtension(options?.editor, extension)
}
