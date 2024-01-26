import type { Editor } from '@prosekit/core'
import { h, type ComponentChildren, type ComponentType } from 'preact'

import { EditorContextProvider } from '../contexts/editor-context'

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

  return h(EditorContextProvider, { value: editor, children })
}
