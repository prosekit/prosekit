import { createContext, useContext } from 'react'
import type { Extension } from '@prosekit/core'
import type { Provider } from 'react'

import type { ReactBindingEditor } from '../editor/react-binding-editor.ts'

const EditorContext = createContext<ReactBindingEditor | null>(null)

/**
 * @internal
 */
export function useEditorContext<E extends Extension = any>(): ReactBindingEditor<E> | null {
  return useContext(EditorContext) as ReactBindingEditor<E> | null
}

/**
 * @internal
 */
export const EditorContextProvider: Provider<ReactBindingEditor | null> = EditorContext.Provider
