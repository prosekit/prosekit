import type { NodeViewComponentProps as ReactProseMirrorNodeViewComponentProps } from '@handlewithcare/react-prosemirror'
import { useIgnoreMutation, useIsNodeSelected, useSelectNode, useStopEvent } from '@handlewithcare/react-prosemirror'
import { EditorNotFoundError } from '@prosekit/core'
import type { ProseMirrorNode } from '@prosekit/pm/model'
import type { EditorView } from '@prosekit/pm/view'
import type { ViewMutationRecord } from 'prosemirror-view'
import type { ComponentType, HTMLAttributes, Ref } from 'react'
import { createElement, useMemo } from 'react'

import { useEditorContext } from '../contexts/editor-context.ts'
import { createEditorViewProxy } from './view-proxy.ts'

/**
 * Event handlers that control how the editor reacts to DOM events and mutations
 * originating inside a React node view. These mirror the native ProseMirror
 * `NodeView.stopEvent` and `NodeView.ignoreMutation` hooks.
 */
export interface ReactNodeViewEventOptions {
  /**
   * Events for which this returns `true` are not handled by the editor. This is
   * required to keep interactive controls (e.g. `<input>`) usable inside a node
   * view.
   */
  stopEvent?: (event: Event) => boolean
  /**
   * Mutations for which this returns `true` are not handled by the editor.
   */
  ignoreMutation?: (mutation: ViewMutationRecord) => boolean
  /**
   * Called when the node is selected.
   */
  selectNode?: () => void
  /**
   * Called when the node is deselected.
   */
  deselectNode?: () => void
}

export interface ReactNodeViewProps {
  contentRef: (element: HTMLElement | null) => void
  view: EditorView
  getPos: () => number | undefined
  setAttrs: (attrs: Record<string, any>) => void
  node: ProseMirrorNode
  selected: boolean
  decorations: readonly any[]
  innerDecorations: any
  /**
   * Must be forwarded (as `ref`) to the outermost DOM element rendered by the
   * node view, so that react-prosemirror can track the node's DOM. Forgetting
   * to forward it breaks selection mapping for the node.
   */
  viewRef: Ref<any>
  /**
   * DOM attributes injected by react-prosemirror, such as `contentEditable`
   * (set to `false` for atom/leaf nodes) and `suppressContentEditableWarning`.
   * Spread these onto the outermost DOM element.
   */
  domProps: HTMLAttributes<HTMLElement>
}

export type ReactNodeViewComponent = ComponentType<ReactNodeViewProps>

export function adaptNodeView(
  ProsekitComponent: ReactNodeViewComponent,
  options?: ReactNodeViewEventOptions,
): ComponentType<ReactProseMirrorNodeViewComponentProps> {
  return function AdaptedNodeView(props: ReactProseMirrorNodeViewComponentProps) {
    const { nodeProps, ref, ...domProps } = props
    const editor = useEditorContext()

    if (!editor) {
      throw new EditorNotFoundError()
    }

    const selected = useIsNodeSelected()
    const editorView = useMemo(() => createEditorViewProxy(editor), [editor])

    // Bridge the prosekit-style stopEvent / ignoreMutation options to
    // react-prosemirror's hook-based API. Without this, events from interactive
    // controls inside the node view are handled by the editor and steal focus.
    const stopEvent = options?.stopEvent
    const ignoreMutation = options?.ignoreMutation
    useStopEvent((_view, event) => (stopEvent ? stopEvent(event) : false))
    useIgnoreMutation((_view, mutation) => (ignoreMutation ? ignoreMutation(mutation) : false))

    // Wire select/deselect callbacks via react-prosemirror's useSelectNode hook.
    const selectNode = options?.selectNode
    const deselectNode = options?.deselectNode
    useSelectNode(
      () => selectNode?.(),
      () => deselectNode?.(),
    )

    const adaptedProps: ReactNodeViewProps = {
      contentRef: nodeProps.contentDOMRef as (element: HTMLElement | null) => void,
      view: editorView,
      getPos: nodeProps.getPos,
      setAttrs: (attrs: Record<string, any>) => {
        const pos = nodeProps.getPos()
        if (typeof pos !== 'number') {
          return
        }
        const tr = editor.state.tr.setNodeMarkup(pos, undefined, {
          ...nodeProps.node.attrs,
          ...attrs,
        })
        editor.dispatch(tr)
      },
      node: nodeProps.node,
      selected,
      decorations: nodeProps.decorations,
      innerDecorations: nodeProps.innerDecorations,
      viewRef: ref,
      domProps: domProps as HTMLAttributes<HTMLElement>,
    }

    return createElement(ProsekitComponent, adaptedProps)
  }
}
