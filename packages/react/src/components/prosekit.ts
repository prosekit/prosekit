import { type Editor } from '@prosekit/core'
import {
  ProsemirrorAdapterProvider,
  useNodeViewFactory,
} from '@prosemirror-adapter/react'
import React, { createElement, useMemo, type ComponentType } from 'react'

import { editorContext } from '../contexts/editor-context'
import { defineReactNodeViewRenderer } from '../extensions/react-node-view'
import { useExtension } from '../hooks/use-extension'

export interface ProseKitProps {
  editor: Editor
  children?: React.ReactNode
}

export const ProseKit: ComponentType<ProseKitProps> = (props) => {
  const { editor, children } = props

  return createElement(
    ProsemirrorAdapterProvider,
    null,
    createElement(
      EditorContextProvider,
      { value: { editor } },
      children,
      createElement(RendererRegister),
    ),
  )
}

function RendererRegister() {
  const nodeViewFactory = useNodeViewFactory()
  const extension = useMemo(
    () => defineReactNodeViewRenderer({ nodeViewFactory }),
    [nodeViewFactory],
  )
  useExtension({ extension })

  return null
}

const EditorContextProvider = editorContext.Provider
