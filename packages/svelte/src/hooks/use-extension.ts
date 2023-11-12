import { type Extension } from '@prosekit/core'

import { useEditor } from './use-editor'

export function useExtension<T extends Extension = Extension>(
  extension: T,
): VoidFunction {
  const editorStore = useEditor()

  let cleanup: VoidFunction | null = null

  editorStore.subscribe((editor) => {
    cleanup?.()
    cleanup = editor.use(extension)
  })

  return () => {
    cleanup?.()
    cleanup = null
  }
}
