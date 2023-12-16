import { type Editor } from '@prosekit/core'
import { createElement, type ComponentType, type ReactNode } from 'react'

import { editorContext } from '../contexts/editor-context'
import { ReactViewsConsumer } from '../views/react-views-consumer'
import { ReactViewsProvider } from '../views/react-views-provider'

export interface ProseKitProps {
  editor: Editor
  children?: ReactNode
}

export const ProseKit: ComponentType<ProseKitProps> = (props) => {
  const { editor, children } = props

  return createElement(
    ReactViewsProvider,
    null,
    createElement(
      editorContext.Provider,
      { value: { editor } },
      createElement(ReactViewsConsumer),
      children,
    ),
  )
}
