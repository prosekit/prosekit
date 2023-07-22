import { type Editor } from '@prosekit/core'
import React, { createElement, type ComponentType } from 'react'

import { editorContext } from '../contexts/editor-context'

export interface ProseKitProps {
  editor: Editor
  children?: React.ReactNode
}

export const ProseKit: ComponentType<ProseKitProps> = (props) => {
  const { editor, children } = props
  return createElement(EditorContextProvider, { value: { editor } }, children)
}

const EditorContextProvider = editorContext.Provider
