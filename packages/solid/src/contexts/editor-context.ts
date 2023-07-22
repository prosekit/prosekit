import type { Editor } from '@prosekit/core'
import { createContext } from 'solid-js'

export interface EditorContext {
  editor: Editor
}

export const editorContext = createContext<EditorContext | null>(null)
