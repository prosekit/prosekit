import type { Editor } from '@prosekit/core'
import { ProsemirrorAdapterProvider } from '@prosemirror-adapter/solid'
import {
  createComponent,
  type Component,
  type ParentProps,
} from 'solid-js'

import { EditorContextProvider } from '../contexts/editor-context'
import { consumeSolidMarkViews } from '../extensions/solid-mark-view'
import { consumeSolidNodeViews } from '../extensions/solid-node-view'

export type ProseKitProps = ParentProps<{
  editor: Editor
}>

/**
 * The root component for a ProseKit editor.
 *
 * @public
 */
export const ProseKit: Component<ProseKitProps> = (props) => {
  return createComponent(ProsemirrorAdapterProvider, {
    get children() {
      return createComponent(EditorContextProvider, {
        get value() {
          return props.editor
        },
        get children() {
          consumeSolidNodeViews()
          consumeSolidMarkViews()
          return props.children
        },
      })
    },
  })
}
