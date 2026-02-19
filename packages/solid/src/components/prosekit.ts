import type { Editor } from '@prosekit/core'
import { ProsemirrorAdapterProvider } from '@prosemirror-adapter/solid'
import { createComponent, type Component, type ParentProps } from 'solid-js'

import { EditorContextProvider } from '../contexts/editor-context.ts'
import { consumeSolidMarkViews } from '../extensions/solid-mark-view.ts'
import { consumeSolidNodeViews } from '../extensions/solid-node-view.ts'

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
      return createComponent(ProsemirrorAdapterProvider, {
        get children() {
          consumeSolidNodeViews()
          consumeSolidMarkViews()
          return props.children
        },
      })
    },
  })
}
