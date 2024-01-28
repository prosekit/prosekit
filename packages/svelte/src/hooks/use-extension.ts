import { Editor, type Extension } from '@prosekit/core'
import { type Readable } from 'svelte/store'

import { useEditorExtension } from './use-editor-extension'

export interface UseExtensionOptions {
  /**
   * The editor to add the extension to. If not provided, it will use the
   * editor from the nearest `ProseKit` component.
   */
  editor?: Editor
}

/**
 * Add an extension to the editor.
 */
export function useExtension<T extends Extension = Extension>(
  /**
   * The store to an extension to add to the editor. If it changes, the previous
   * extension will be removed and the new one (if not null) will be added.
   */
  extensionStore: Readable<T | null>,
  options?: UseExtensionOptions,
): void {
  useEditorExtension(options?.editor, extensionStore)
}
