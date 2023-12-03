import { type Extension } from '@prosekit/core'
import { type Accessor, createEffect, onCleanup } from 'solid-js'

import { useEditor } from './use-editor'

/**
 * Add an extension to the editor.
 *
 * It accepts an accessor to an optional extension. If the extension is changed,
 * the previous extension will be removed and the new one (if not null) will be
 * added.
 */
export function useExtension<T extends Extension = Extension>(
  extension: (T | null) | (() => T | null),
): void {
  if (typeof extension !== 'function') {
    console.warn(
      'useExtension should accept a function that returns an extension or null',
    )

    return useExtension(() => extension)
  }

  const extensionAccessor: Accessor<T | null> = extension

  const editor = useEditor()

  createEffect(() => {
    const extension = extensionAccessor()
    if (extension) {
      onCleanup(editor().use(extension))
    }
  })
}
