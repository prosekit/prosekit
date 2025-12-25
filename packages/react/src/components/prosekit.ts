import type { Editor } from '@prosekit/core'
import { ProsemirrorAdapterProvider } from '@prosemirror-adapter/react'
import {
  createElement,
  type ComponentType,
  type ReactNode,
} from 'react'

import { EditorContextProvider } from '../contexts/editor-context'
import { ReactMarkViewConsumer } from '../extensions/react-mark-view'
import { ReactNodeViewConsumer } from '../extensions/react-node-view'

export interface ProseKitProps {
  editor: Editor
  children?: ReactNode
}

/**
 * The root component for a ProseKit editor.
 *
 * @public
 */
export const ProseKit: ComponentType<ProseKitProps> = (props) => {
  const { editor, children } = props

  return createElement(
    EditorContextProvider,
    { value: editor },
    createElement(
      ProsemirrorAdapterProvider,
      null,
      createElement(ReactNodeViewConsumer),
      createElement(ReactMarkViewConsumer),
      children,
    ),
  )
}
