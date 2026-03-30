import { union, type Editor } from '@prosekit/core'
import { usePreactRenderer } from '@prosemirror-adapter/preact'
import { createElement, Fragment, type ComponentChildren, type ComponentType } from 'preact'
import { useMemo } from 'preact/hooks'

import { definePreactMarkViewFactory } from '../extensions/preact-mark-view.ts'
import { definePreactNodeViewFactory } from '../extensions/preact-node-view.ts'
import { useEditorExtension } from '../hooks/use-editor-extension.ts'

interface ViewRendererProps {
  editor: Editor
  children: ComponentChildren
}

export const ViewRenderer: ComponentType<ViewRendererProps> = ({ editor, children }) => {
  const { renderPreactRenderer, removePreactRenderer, render } = usePreactRenderer()

  const extension = useMemo(() => {
    return union([
      definePreactMarkViewFactory(renderPreactRenderer, removePreactRenderer),
      definePreactNodeViewFactory(renderPreactRenderer, removePreactRenderer),
    ])
  }, [renderPreactRenderer, removePreactRenderer])

  useEditorExtension(editor, extension)

  return createElement(Fragment, null, createElement(Fragment, null, children), createElement(Fragment, null, render()))
}
