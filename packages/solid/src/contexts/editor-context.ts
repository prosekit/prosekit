import type { Editor } from '@prosekit/core'
import { createContext } from 'solid-js'

interface EditorContext {
  editor: Editor
}

export const editorContext = createContext<EditorContext | null>(null)
