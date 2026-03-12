import { union, type Editor } from '@prosekit/core'
import { useReactRenderer } from '@prosemirror-adapter/react'
import { createElement, Fragment, useMemo, type ComponentType, type ReactNode } from 'react'

import { EditorContextProvider } from '../contexts/editor-context.ts'
import { defineReactMarkViewFactory } from '../extensions/react-mark-view.ts'
import { defineReactNodeViewFactory } from '../extensions/react-node-view.ts'
import { useEditorExtension } from '../hooks/use-editor-extension.ts'

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
      ProsemirrorAdapterComponent,
      { editor, children },
    ),
  )
}

function ProsemirrorAdapterComponent({ editor, children }: { editor: Editor; children: ReactNode }): ReactNode {
  const { renderReactRenderer, removeReactRenderer, render } = useReactRenderer()

  const extension = useMemo(() => {
    return union([
      defineReactMarkViewFactory(renderReactRenderer, removeReactRenderer),
      defineReactNodeViewFactory(renderReactRenderer, removeReactRenderer),
    ])
  }, [renderReactRenderer, removeReactRenderer])

  useEditorExtension(editor, extension)

  return createElement(Fragment, null, 
    createElement(Fragment, null, children),
    createElement(Fragment, null, render()),
  )
}
