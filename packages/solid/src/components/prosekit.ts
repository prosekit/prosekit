import type { Editor } from '@prosekit/core'
import { createComponent, type Component, type ParentProps } from 'solid-js'

import { editorContext } from '../contexts/editor-context'

export type ProseKitProps = ParentProps<{
  editor: Editor
}>

export const ProseKit: Component<ProseKitProps> = (props) => {
  return createComponent(editorContext.Provider, {
    get value() {
      return {
        editor: props.editor,
      }
    },
    get children() {
      return props.children
    },
  })
}
