import type { Editor } from '@prosekit/core'
import { ProsemirrorAdapterProvider } from '@prosemirror-adapter/preact'
import {
  h,
  type ComponentChildren,
  type ComponentType,
} from 'preact'

import { EditorContextProvider } from '../contexts/editor-context'
import { PreactMarkViewConsumer } from '../extensions/preact-mark-view'
import { PreactNodeViewConsumer } from '../extensions/preact-node-view'

export interface ProseKitProps {
  editor: Editor
  children?: ComponentChildren
}

/**
 * The root component for a ProseKit editor.
 *
 * @public
 */
export const ProseKit: ComponentType<ProseKitProps> = (props) => {
  const { editor, children } = props

  return h(
    ProsemirrorAdapterProvider,
    null,
    h(
      EditorContextProvider,
      { value: editor },
      h(PreactNodeViewConsumer, null),
      h(PreactMarkViewConsumer, null),
      children,
    ),
  )
}
