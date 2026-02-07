import type { Editor, Extension } from '@prosekit/core'
import { derived, readable, type Readable } from 'svelte/store'

import { useEditor } from './use-editor.ts'

export interface UseEditorDerivedOptions<E extends Extension = any> {
  /**
   * The editor to add the extension to. If not provided, it will use the
   * editor from the nearest `<ProseKit>` component.
   */
  editor?: Editor<E>
}

/**
 * Runs a function to derive a value from the editor instance after editor state
 * changes.
 *
 * This is useful when you need to render something based on the editor state,
 * for example, whether the selected text is wrapped in an italic mark.
 *
 * It returns a Svelte store that stores the derived value and updates whenever
 * the editor state changes.
 *
 * @public
 */
export function useEditorDerivedValue<E extends Extension, Derived>(
  /**
   * A function that receives the editor instance and returns a derived value.
   *
   * It will be called whenever the editor's document state changes, or when it
   * mounts.
   */
  derive: (editor: Editor<E>) => Derived,
  options?: UseEditorDerivedOptions<E>,
): Readable<Derived> {
  const initialEditor = options?.editor
  const editorStore: Readable<Editor<E>> = initialEditor
    ? readable(initialEditor)
    : useEditor<E>({ update: true })

  return derived(editorStore, derive)
}
