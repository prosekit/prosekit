import type { Editor } from '@prosekit/core'
import { createComponent, type Component, type ParentProps } from 'solid-js'

import { EditorContextProvider } from '../contexts/editor-context'

export type ProseKitProps = ParentProps<{
  editor: Editor
}>

/**
 * The root component for a ProseKit editor.
 *
 * @public
 */
export const ProseKit: Component<ProseKitProps> = (props) => {
  return createComponent(EditorContextProvider, {
    get value() {
      return props.editor
    },
    get children() {
      return props.children
    },
  })
}
