import type { MarkViewComponentProps as ReactProseMirrorMarkViewComponentProps } from '@handlewithcare/react-prosemirror'
import { useIgnoreMutation, useStopEvent } from '@handlewithcare/react-prosemirror'
import { EditorNotFoundError } from '@prosekit/core'
import type { Mark } from '@prosekit/pm/model'
import type { EditorView } from '@prosekit/pm/view'
import type { ViewMutationRecord } from 'prosemirror-view'
import type { ComponentType, HTMLAttributes, ReactNode, Ref } from 'react'
import { createElement, useMemo } from 'react'

import { useEditorContext } from '../contexts/editor-context.ts'
import { createEditorViewProxy } from './view-proxy.ts'

/**
 * Event handlers that control how the editor reacts to DOM events and mutations
 * originating inside a React mark view. These mirror the native ProseMirror
 * `NodeView.stopEvent` and `NodeView.ignoreMutation` hooks.
 */
export interface ReactMarkViewEventOptions {
  /**
   * Events for which this returns `true` are not handled by the editor.
   */
  stopEvent?: (event: Event) => boolean
  /**
   * Mutations for which this returns `true` are not handled by the editor.
   */
  ignoreMutation?: (mutation: ViewMutationRecord) => boolean
}

export interface ReactMarkViewProps {
  contentRef: (element: HTMLElement | null) => void
  view: EditorView
  mark: Mark
  /**
   * The start position of the mark in the document. This is the position
   * of the first character that carries this mark within the current
   * contiguous stretch.
   */
  getPos: () => number
  /**
   * Whether the mark is inline. Marks on inline content have this set to
   * `true`; marks on block content have it set to `false`.
   */
  inline: boolean
  /**
   * Update the attributes of the mark at the current position.
   *
   * Because marks span ranges rather than single positions, this replaces
   * the mark at the position returned by `getPos()` with a new mark that
   * carries the merged attributes.
   */
  setAttrs: (attrs: Record<string, any>) => void
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

export function adaptMarkView(
  ProsekitComponent: ReactMarkViewComponent,
  options?: ReactMarkViewEventOptions,
): ComponentType<ReactProseMirrorMarkViewComponentProps> {
  return function AdaptedMarkView(props: ReactProseMirrorMarkViewComponentProps) {
    const { markProps, ref, children, ...domProps } = props
    const editor = useEditorContext()
    if (!editor) {
      throw new EditorNotFoundError()
    }
    const editorView = useMemo(() => createEditorViewProxy(editor), [editor])

    // Bridge the prosekit-style stopEvent / ignoreMutation options to
    // react-prosemirror's hook-based API.
    const stopEvent = options?.stopEvent
    const ignoreMutation = options?.ignoreMutation
    useStopEvent((_view, event) => (stopEvent ? stopEvent(event) : false))
    useIgnoreMutation((_view, mutation) => (ignoreMutation ? ignoreMutation(mutation) : false))

    const adaptedProps: ReactMarkViewProps = {
      contentRef: markProps.contentDOMRef as (element: HTMLElement | null) => void,
      view: editorView,
      mark: markProps.mark,
      getPos: markProps.getPos,
      inline: markProps.inline,
      setAttrs: (attrs: Record<string, any>) => {
        const pos = markProps.getPos()
        const $pos = editor.state.doc.resolve(pos)
        const resolvedMark = $pos.marks().find(
          (m) => m.type === markProps.mark.type,
        )
        if (!resolvedMark) return
        const newMark = markProps.mark.type.create({
          ...resolvedMark.attrs,
          ...attrs,
        })
        const tr = editor.state.tr
        // Find the contiguous range of this mark around pos
        let from = $pos.pos
        let to = $pos.pos
        if ($pos.textOffset != null) {
          // The position is inside a text node — find the mark's range
          const textNode = $pos.parent
          const text = textNode.textContent
          // Search backwards
          let start = $pos.textOffset
          while (
            start > 0
            && textNode.marksAcross($pos.pos - start - 1)?.some(
              (m) => m.eq(resolvedMark),
            )
          ) {
            start--
          }
          // Search forwards
          let end = $pos.textOffset
          while (
            end < text.length
            && textNode.marksAcross($pos.pos - $pos.textOffset + end)?.some(
              (m) => m.eq(resolvedMark),
            )
          ) {
            end++
          }
          from = $pos.pos - $pos.textOffset + start
          to = $pos.pos - $pos.textOffset + end
        }
        tr.removeMark(from, to, resolvedMark.type)
        tr.addMark(from, to, newMark)
        editor.dispatch(tr)
      },
      viewRef: ref,
      domProps: domProps as HTMLAttributes<HTMLElement>,
    }

    return createElement(ProsekitComponent, adaptedProps, children)
  }
}
