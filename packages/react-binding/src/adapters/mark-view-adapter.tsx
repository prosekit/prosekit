import type { MarkViewComponentProps as ReactProseMirrorMarkViewComponentProps } from '@handlewithcare/react-prosemirror'
import { EditorNotFoundError } from '@prosekit/core'
import type { Mark } from '@prosekit/pm/model'
import type { EditorView } from '@prosekit/pm/view'
import type { ComponentType, HTMLAttributes, ReactNode, Ref } from 'react'
import { createElement, useMemo } from 'react'

import { useEditorContext } from '../contexts/editor-context.ts'
import type { ReactBindingEditor } from '../editor/react-binding-editor.ts'

export interface ReactMarkViewProps {
  contentRef: (element: HTMLElement | null) => void
  view: EditorView
  mark: Mark
  children?: ReactNode
  /**
   * Must be forwarded (as `ref`) to the outermost DOM element rendered by the
   * mark view, so that react-prosemirror can track the mark's DOM.
   */
  viewRef: Ref<any>
  /**
   * DOM attributes injected by react-prosemirror. Spread these onto the
   * outermost DOM element.
   */
  domProps: HTMLAttributes<HTMLElement>
}

export type ReactMarkViewComponent = ComponentType<ReactMarkViewProps>

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

export function adaptMarkView(
  ProsekitComponent: ReactMarkViewComponent,
): ComponentType<ReactProseMirrorMarkViewComponentProps> {
  return function AdaptedMarkView(props: ReactProseMirrorMarkViewComponentProps) {
    const { markProps, ref, children, ...domProps } = props
    const editor = useEditorContext()
    if (!editor) {
      throw new EditorNotFoundError()
    }
    const editorView = useMemo(() => createEditorViewProxy(editor), [editor])

    const adaptedProps: ReactMarkViewProps = {
      contentRef: markProps.contentDOMRef as (element: HTMLElement | null) => void,
      view: editorView,
      mark: markProps.mark,
      viewRef: ref,
      domProps: domProps as HTMLAttributes<HTMLElement>,
    }

    return createElement(ProsekitComponent, adaptedProps, children)
  }
}
