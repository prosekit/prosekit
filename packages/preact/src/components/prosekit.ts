import type { Editor } from '@prosekit/core'
import { h, type ComponentChildren, type ComponentType } from 'preact'

import { editorContext } from '../contexts/editor-context'

export interface ProseKitProps {
  editor: Editor
  children?: ComponentChildren
}

export const ProseKit: ComponentType<ProseKitProps> = (props) => {
  const { editor, children } = props

  return h(EditorContextProvider, { value: { editor }, children })
}

const EditorContextProvider = editorContext.Provider
