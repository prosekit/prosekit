import type { Editor } from '@prosekit/core'
import { ProsemirrorAdapterProvider } from '@prosemirror-adapter/react'
import { createElement, type ComponentType, type ReactNode } from 'react'

import { EditorContextProvider } from '../contexts/editor-context.ts'
import { ReactMarkViewConsumer } from '../extensions/react-mark-view.ts'
import { ReactNodeViewConsumer } from '../extensions/react-node-view.ts'

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
