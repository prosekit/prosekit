import { useEditor, useEditorRef } from 'prosekit/vue'

import type { ExampleExtension } from './extension'

export const useExampleEditor = useEditor<ExampleExtension>
export const useExampleEditorRef = useEditorRef<ExampleExtension>
