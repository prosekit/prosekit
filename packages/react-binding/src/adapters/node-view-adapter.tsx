import type { NodeViewComponentProps as ReactProseMirrorNodeViewComponentProps } from '@handlewithcare/react-prosemirror'
import { useIsNodeSelected } from '@handlewithcare/react-prosemirror'
import type { EditorView } from '@prosekit/pm/view'
import type { ComponentType } from 'react'
import { createElement } from 'react'

import { useEditor } from '../hooks/use-editor.ts'

export interface ReactNodeViewProps {
  contentRef: (element: HTMLElement | null) => void
  view: EditorView
  getPos: () => number | undefined
  setAttrs: (attrs: Record<string, any>) => void
  node: any
  selected: boolean
  decorations: readonly any[]
  innerDecorations: any
}

export type ReactNodeViewComponent = ComponentType<ReactNodeViewProps>

export function adaptNodeView(
  ProsekitComponent: ReactNodeViewComponent,
): ComponentType<ReactProseMirrorNodeViewComponentProps> {
  return function AdaptedNodeView(props: ReactProseMirrorNodeViewComponentProps) {
    const { nodeProps } = props
    const editor = useEditor()
    const selected = useIsNodeSelected()
    const editorView = editor.view as EditorView

    const adaptedProps: ReactNodeViewProps = {
      contentRef: nodeProps.contentDOMRef as (element: HTMLElement | null) => void,
      view: editorView,
      getPos: nodeProps.getPos,
      setAttrs: (attrs: Record<string, any>) => {
        const tr = editorView.state.tr.setNodeMarkup(nodeProps.getPos(), undefined, attrs)
        editorView.dispatch(tr)
      },
      node: nodeProps.node,
      selected,
      decorations: nodeProps.decorations,
      innerDecorations: nodeProps.innerDecorations,
    }

    return createElement(ProsekitComponent, adaptedProps)
  }
}
