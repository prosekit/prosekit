import type {
  Editor,
  Extension,
} from '@prosekit/core'
import {
  createContext,
  useContext,
} from 'react'

const editorContext = createContext<Editor | null>(null)

/**
 * @internal
 */
export function useEditorContext<E extends Extension>(): Editor<E> | null {
  return useContext(editorContext)
}

/**
 * @internal
 */
export const EditorContextProvider = editorContext.Provider
