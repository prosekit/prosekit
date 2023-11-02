import { useEditor, useEditorRef } from 'prosekit/vue'

import type { EditorExtension } from './extension'

export const useTypedEditor = useEditor<EditorExtension>
export const useTypedEditorRef = useEditorRef<EditorExtension>
