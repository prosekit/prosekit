'use client'

import type { Editor } from 'prosekit/core'
import {
  clampColumnWidth,
  columnsPluginKey,
  findColumnBoundaryAtCoords,
  getColumnsRuntimeState,
  setActiveColumnHandle,
  setColumnWidthAt,
  startColumnDragging,
  stopColumnDragging,
  type ColumnHandleInfo,
} from 'prosekit/extensions/columns'
import { TextSelection } from 'prosekit/pm/state'
import { useEditor, useEditorDerivedValue } from 'prosekit/react'
import { useEffect, useMemo } from 'react'

import type { EditorExtension } from './extension'

interface HandleRect {
  x: number
  y: number
  height: number
}

function getHandleRect(
  editor: Editor<EditorExtension>,
  handle: ColumnHandleInfo | null,
): HandleRect | null {
  if (!handle) return null
  const dom = editor.view.nodeDOM(handle.columnPos)
  if (!(dom instanceof HTMLElement)) return null

  const rect = dom.getBoundingClientRect()
  const next = dom.nextElementSibling
  const nextRect = next instanceof HTMLElement ? next.getBoundingClientRect() : null
  const x = nextRect ? rect.right + (nextRect.left - rect.right) / 2 : rect.right

  return {
    x,
    y: rect.top,
    height: rect.height,
  }
}

export default function ColumnsUi() {
  const editor = useEditor<EditorExtension>()
  const handleRect = useEditorDerivedValue(useMemo(() => {
    return (currentEditor: Editor<EditorExtension>) => getHandleRect(
      currentEditor,
      getColumnsRuntimeState(currentEditor.state)?.activeHandle ?? null,
    )
  }, []))

  useEffect(() => {
    const view = editor.view
    const root = view.dom

    const clearHandle = () => {
      view.dispatch(view.state.tr.setMeta(columnsPluginKey, setActiveColumnHandle(null)))
    }

    const handleMouseMove = (event: MouseEvent) => {
      const hit = findColumnBoundaryAtCoords(view, event, { handleWidth: 8 })
      view.dispatch(view.state.tr.setMeta(columnsPluginKey, setActiveColumnHandle(hit)))
    }

    const handleDragMove = (event: MouseEvent) => {
      const runtime = getColumnsRuntimeState(view.state)
      if (!runtime?.dragging) return
      const width = clampColumnWidth(
        runtime.dragging.startWidth + event.clientX - runtime.dragging.startX,
        { minColumnWidth: 160 },
      )
      setColumnWidthAt(runtime.dragging.columnPos, width)(view.state, view.dispatch, view)
    }

    const handleMouseDown = (event: MouseEvent) => {
      const hit = findColumnBoundaryAtCoords(view, event, { handleWidth: 8 })
      if (!hit) return
      const dom = view.nodeDOM(hit.columnPos)
      if (!(dom instanceof HTMLElement)) return
      view.dispatch(view.state.tr.setMeta(columnsPluginKey, startColumnDragging({
        handlePos: hit.pos,
        columnPos: hit.columnPos,
        startX: event.clientX,
        startWidth: dom.getBoundingClientRect().width,
      })))
      event.preventDefault()
    }

    const handleMouseUp = () => {
      const runtime = getColumnsRuntimeState(view.state)
      if (!runtime?.dragging) return
      view.dispatch(view.state.tr.setMeta(columnsPluginKey, stopColumnDragging()))
    }

    root.addEventListener('mousemove', handleMouseMove)
    root.addEventListener('mouseleave', clearHandle)
    root.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mousemove', handleDragMove)
    window.addEventListener('mouseup', handleMouseUp)

    return () => {
      root.removeEventListener('mousemove', handleMouseMove)
      root.removeEventListener('mouseleave', clearHandle)
      root.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mousemove', handleDragMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [editor])

  const addColumnAfterAtHandle = () => {
    const handle = getColumnsRuntimeState(editor.state)?.activeHandle
    if (!handle) return
    editor.view.dispatch(
      editor.view.state.tr.setSelection(
        TextSelection.create(editor.view.state.doc, handle.columnPos + 1),
      ),
    )
    editor.commands.addColumnAfter()
  }

  if (!handleRect) return null

  return (
    <>
      <div
        style={{
          position: 'fixed',
          left: `${handleRect.x - 1}px`,
          top: `${handleRect.y}px`,
          width: '2px',
          height: `${handleRect.height}px`,
          background: '#9ca3af',
          pointerEvents: 'none',
          zIndex: 20,
        }}
      />
      <button
        type="button"
        aria-label="Add column"
        style={{
          position: 'fixed',
          left: `${handleRect.x - 10}px`,
          top: `${handleRect.y - 10}px`,
          width: '20px',
          height: '20px',
          borderRadius: '9999px',
          border: '1px solid #d1d5db',
          background: '#ffffff',
          color: '#374151',
          fontSize: '14px',
          lineHeight: 1,
          zIndex: 21,
        }}
        onMouseDown={(event) => event.preventDefault()}
        onClick={addColumnAfterAtHandle}
      >
        +
      </button>
    </>
  )
}
