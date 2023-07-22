import type { Editor } from '@prosekit/core'
import type { Component, ParentProps } from 'solid-js'
import h from 'solid-js/h'

import { editorContext } from '../contexts/editor-context'

export type ProseKitProps = ParentProps<{
  editor: Editor
}>

export const ProseKit: Component<ProseKitProps> = (props) => {
  const { editor, children } = props

  return h(EditorContextProvider, { value: { editor } }, children)
}

const EditorContextProvider = editorContext.Provider
