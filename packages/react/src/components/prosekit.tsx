import { Editor } from '@prosekit/core'
import React, { type ComponentType } from 'react'

import { editorContext } from '../contexts/editor-context'

export interface ProseKitProps {
  editor: Editor
  children?: React.ReactNode
}

export const ProseKit: ComponentType<ProseKitProps> = (props) => {
  const editor = props.editor

  return (
    <EditorContextProvider value={{ editor }}>
      {props.children}
    </EditorContextProvider>
  )
}

const EditorContextProvider = editorContext.Provider
