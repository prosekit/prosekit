import type { Editor } from '@prosekit/core'
import { createContext } from 'react'

export interface EditorContext {
  editor: Editor
}

export const editorContext = createContext<EditorContext | null>(null)
