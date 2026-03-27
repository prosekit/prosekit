import type { Editor, Extension } from '@prosekit/core'
import { createMemo, type Accessor } from 'solid-js'

import type { MaybeAccessor } from '../types'
import { toValue } from '../utils/to-value'

import { useEditor } from './use-editor'

export interface UseEditorDerivedOptions<E extends Extension = any> {
  /**
   * The editor to add the extension to. If not provided, it will use the
   * editor from the nearest `<ProseKit>` component.
   */
  editor?: MaybeAccessor<Editor<E>>
}

/**
 * Runs a function to derive a value from the editor instance after editor state
 * changes.
 *
 * This is useful when you need to render something based on the editor state,
 * for example, whether the selected text is wrapped in an italic mark.
 *
 * It returns an accessor of the derived value that updates whenever the editor
 * state changes.
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
): Accessor<Derived> {
  const initialEditor = options?.editor
  const editorAccessor: Accessor<Editor<E>> = initialEditor
    ? () => toValue(initialEditor)
    : useEditor<E>({ update: true })

  return createMemo(() => derive(editorAccessor()))
}
