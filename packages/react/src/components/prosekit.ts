import { type Editor } from '@prosekit/core'
import { ProsemirrorAdapterProvider } from '@prosemirror-adapter/react'
import React, { createElement, type ComponentType } from 'react'

import { editorContext } from '../contexts/editor-context'
import { useReactPayload } from '../hooks/use-react-payload'

export interface ProseKitProps {
  editor: Editor
  children?: React.ReactNode
}

export const ProseKit: ComponentType<ProseKitProps> = (props) => {
  const { editor, children } = props

  return createElement(
    ProsemirrorAdapterProvider,
    null,
    createElement(EditorContextProvider, { value: { editor } }, [
      children,
      createElement(ReactPayloadRegister),
    ]),
  )
}

function ReactPayloadRegister() {
  useReactPayload(null)
  return null
}

const EditorContextProvider = editorContext.Provider
