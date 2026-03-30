import type { Editor } from '@prosekit/core'
import { createElement, type ComponentChildren, type ComponentType } from 'preact'

import { EditorContextProvider } from '../contexts/editor-context.ts'

import { ViewRenderer } from './view-renderer.ts'

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

  return createElement(
    EditorContextProvider,
    { value: editor },
    createElement(
      ViewRenderer,
      { editor, children },
    ),
  )
}
