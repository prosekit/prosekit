import type {
  Editor,
  Extension,
} from '@prosekit/core'
import {
  createContext,
  type Provider,
} from 'preact'
import { useContext } from 'preact/hooks'

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
export const EditorContextProvider: Provider<Editor | null> = editorContext.Provider
