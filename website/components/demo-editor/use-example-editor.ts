import { useEditor, useEditorRef } from 'prosekit/vue'

import type { ExampleExtension } from './extension'

export function useExampleEditor() {
  return useEditor<ExampleExtension>()
}

export function useExampleEditorRef() {
  return useEditorRef<ExampleExtension>()
}
