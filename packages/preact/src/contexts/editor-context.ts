import type { Editor } from '@prosekit/core'
import { createContext } from 'preact'

export interface EditorContext {
  editor: Editor
}

export const editorContext = createContext<EditorContext | null>(null)
