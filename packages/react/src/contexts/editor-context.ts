import type { Editor, Extension } from '@prosekit/core'
import { createContext, useContext, type Provider } from 'react'

const EditorContext = createContext<Editor | null>(null)

/**
 * @internal
 */
export function useEditorContext<E extends Extension>(): Editor<E> | null {
  return useContext(EditorContext)
}

/**
 * @internal
 */
export const EditorContextProvider: Provider<Editor | null> = EditorContext.Provider
