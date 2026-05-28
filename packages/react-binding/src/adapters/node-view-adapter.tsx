import type { NodeViewComponentProps as ReactProseMirrorNodeViewComponentProps } from '@handlewithcare/react-prosemirror'
import { useIsNodeSelected } from '@handlewithcare/react-prosemirror'
import { EditorNotFoundError } from '@prosekit/core'
import type { EditorView } from '@prosekit/pm/view'
import type { ComponentType } from 'react'
import { createElement, useMemo } from 'react'

import { useEditorContext } from '../contexts/editor-context.ts'
import type { ReactBindingEditor } from '../editor/react-binding-editor.ts'

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

function createEditorViewProxy(editor: ReactBindingEditor): EditorView {
  return new Proxy({} as EditorView, {
    get(_target, prop) {
      const view = editor.view
      const value = Reflect.get(view, prop)

      if (typeof value === 'function') {
        return value.bind(view)
      }

      return value
    },
    has(_target, prop) {
      return prop in editor.view
    },
    ownKeys() {
      return Reflect.ownKeys(editor.view)
    },
    getOwnPropertyDescriptor(_target, prop) {
      return Object.getOwnPropertyDescriptor(editor.view, prop)
    },
  })
}

export function adaptNodeView(
  ProsekitComponent: ReactNodeViewComponent,
): ComponentType<ReactProseMirrorNodeViewComponentProps> {
  return function AdaptedNodeView(props: ReactProseMirrorNodeViewComponentProps) {
    const { nodeProps } = props
    const editor = useEditorContext()

    if (!editor) {
      throw new EditorNotFoundError()
    }

    const selected = useIsNodeSelected()
    const editorView = useMemo(() => createEditorViewProxy(editor), [editor])

    const adaptedProps: ReactNodeViewProps = {
      contentRef: nodeProps.contentDOMRef as (element: HTMLElement | null) => void,
      view: editorView,
      getPos: nodeProps.getPos,
      setAttrs: (attrs: Record<string, any>) => {
        const tr = editor.state.tr.setNodeMarkup(nodeProps.getPos(), undefined, attrs)
        editor.dispatch(tr)
      },
      node: nodeProps.node,
      selected,
      decorations: nodeProps.decorations,
      innerDecorations: nodeProps.innerDecorations,
    }

    return createElement(ProsekitComponent, adaptedProps)
  }
}
