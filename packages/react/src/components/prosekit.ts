import { type Editor } from '@prosekit/core'
import { createElement, type ComponentType, type ReactNode } from 'react'

import { EditorContextProvider } from '../contexts/editor-context'
import { ReactViewsConsumer } from '../views/react-views-consumer'
import { ReactViewsProvider } from '../views/react-views-provider'

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
    ReactViewsProvider,
    null,
    createElement(
      EditorContextProvider,
      { value: editor },
      createElement(ReactViewsConsumer),
      children,
    ),
  )
}
