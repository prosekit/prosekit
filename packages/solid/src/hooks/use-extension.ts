import { type Extension } from '@prosekit/core'
import { createEffect, onCleanup } from 'solid-js'

import { useEditor } from './use-editor'

export function useExtension<T extends Extension = Extension>(extension: T) {
  const editor = useEditor()

  createEffect(() => {
    onCleanup(editor().use(extension))
  })
}
