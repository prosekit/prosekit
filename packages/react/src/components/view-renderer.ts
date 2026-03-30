import { union, type Editor } from '@prosekit/core'
import { useReactRenderer } from '@prosemirror-adapter/react'
import { createElement, Fragment, useMemo, type ComponentType, type ReactNode } from 'react'

import { defineReactMarkViewFactory } from '../extensions/react-mark-view.ts'
import { defineReactNodeViewFactory } from '../extensions/react-node-view.ts'
import { useEditorExtension } from '../hooks/use-editor-extension.ts'

interface ViewRendererProps {
  editor: Editor
  children: ReactNode
}

export const ViewRenderer: ComponentType<ViewRendererProps> = ({ editor, children }): ReactNode => {
  const { renderReactRenderer, removeReactRenderer, render } = useReactRenderer()

  const extension = useMemo(() => {
    return union([
      defineReactMarkViewFactory(renderReactRenderer, removeReactRenderer),
      defineReactNodeViewFactory(renderReactRenderer, removeReactRenderer),
    ])
  }, [renderReactRenderer, removeReactRenderer])

  useEditorExtension(editor, extension)

  return createElement(Fragment, null, createElement(Fragment, null, children), createElement(Fragment, null, render()))
}
