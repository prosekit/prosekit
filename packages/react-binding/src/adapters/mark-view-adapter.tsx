import type { MarkViewComponentProps as ReactProseMirrorMarkViewComponentProps } from '@handlewithcare/react-prosemirror'
import type { EditorView } from '@prosekit/pm/view'
import type { ComponentType } from 'react'
import { createElement } from 'react'

import { useEditor } from '../hooks/use-editor.ts'

export interface ReactMarkViewProps {
  contentRef: (element: HTMLElement | null) => void
  view: EditorView
  mark: any
}

export type ReactMarkViewComponent = ComponentType<ReactMarkViewProps>

export function adaptMarkView(
  ProsekitComponent: ReactMarkViewComponent,
): ComponentType<ReactProseMirrorMarkViewComponentProps> {
  return function AdaptedMarkView(props: ReactProseMirrorMarkViewComponentProps) {
    const { markProps } = props
    const editor = useEditor()

    const adaptedProps: ReactMarkViewProps = {
      contentRef: markProps.contentDOMRef as (element: HTMLElement | null) => void,
      view: editor.view as EditorView,
      mark: markProps.mark,
    }

    return createElement(ProsekitComponent, adaptedProps)
  }
}
