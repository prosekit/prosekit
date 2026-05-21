'use client'

import type { Editor } from 'prosekit/core'
import {
  clampColumnWidth,
  columnsPluginKey,
  findColumnBoundaryAtCoords,
  findParentColumn,
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

function getColumnsUiState(editor: Editor<EditorExtension>) {
  const runtime = getColumnsRuntimeState(editor.state)
  const currentColumn = findParentColumn(editor.state.selection.$anchor)
  const currentGap = currentColumn
    ? (editor.state.doc.nodeAt(currentColumn.containerPos)?.attrs.gap as number | null | undefined) ?? null
    : null

  return {
    runtime,
    currentColumn,
    currentGap,
    canAddBefore: editor.commands.addColumnBefore.canExec(),
    canAddAfter: editor.commands.addColumnAfter.canExec(),
    canRemove: editor.commands.removeColumn.canExec(),
    canDistribute: editor.commands.distributeColumns.canExec(),
  }
}

function getHandleRect(editor: Editor<EditorExtension>, handle: ColumnHandleInfo | null) {
  if (!handle) return null
  const dom = editor.view.nodeDOM(handle.columnPos)
  if (!(dom instanceof HTMLElement)) return null
  const rect = dom.getBoundingClientRect()
  return {
    x: rect.right,
    y: rect.top,
    height: rect.height,
  }
}

export default function ColumnsUi() {
  const editor = useEditor<EditorExtension>()
  const state = useEditorDerivedValue(getColumnsUiState)
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
      const runtime = getColumnsRuntimeState(view.state)
      if (runtime?.dragging) {
        const width = clampColumnWidth(runtime.dragging.startWidth + event.clientX - runtime.dragging.startX, {
          minColumnWidth: 160,
        })
        setColumnWidthAt(runtime.dragging.columnPos, width)(view.state, view.dispatch, view)
        return
      }

      const hit = findColumnBoundaryAtCoords(view, event)
      view.dispatch(view.state.tr.setMeta(columnsPluginKey, setActiveColumnHandle(hit)))
    }

    const handleMouseDown = (event: MouseEvent) => {
      const hit = findColumnBoundaryAtCoords(view, event)
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
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)

    return () => {
      root.removeEventListener('mousemove', handleMouseMove)
      root.removeEventListener('mouseleave', clearHandle)
      root.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [editor])

  const addColumnAfterAtHandle = () => {
    const handle = state.runtime?.activeHandle
    if (!handle) return
    editor.view.dispatch(
      editor.view.state.tr.setSelection(
        TextSelection.create(editor.view.state.doc, handle.columnPos + 1),
      ),
    )
    editor.commands.addColumnAfter()
  }

  return (
    <>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '8px',
          marginTop: '12px',
          alignItems: 'center',
        }}
      >
        <button type="button" onClick={() => editor.commands.insertColumns({ count: 2 })}>
          Insert 2 Columns
        </button>
        <button type="button" onClick={() => editor.commands.insertColumns({ count: 3 })}>
          Insert 3 Columns
        </button>
        <button type="button" disabled={!state.canAddBefore} onClick={() => editor.commands.addColumnBefore()}>
          Add Before
        </button>
        <button type="button" disabled={!state.canAddAfter} onClick={() => editor.commands.addColumnAfter()}>
          Add After
        </button>
        <button type="button" disabled={!state.canRemove} onClick={() => editor.commands.removeColumn()}>
          Remove Column
        </button>
        <button type="button" disabled={!state.canDistribute} onClick={() => editor.commands.distributeColumns()}>
          Equalize Widths
        </button>
        <label style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
          Gap
          <input
            type="range"
            min={0}
            max={48}
            step={4}
            value={state.currentGap ?? 20}
            disabled={!state.currentColumn}
            onChange={(event) => editor.commands.setColumnsGap(Number(event.target.value))}
          />
          <span style={{ minWidth: '2ch', textAlign: 'right' }}>{state.currentGap ?? 20}</span>
        </label>
      </div>
      {handleRect && (
        <>
          <div
            style={{
              position: 'fixed',
              left: `${handleRect.x - 1}px`,
              top: `${handleRect.y}px`,
              width: '2px',
              height: `${handleRect.height}px`,
              background: '#0f766e',
              pointerEvents: 'none',
              zIndex: 20,
            }}
          />
          <button
            type="button"
            style={{
              position: 'fixed',
              left: `${handleRect.x - 10}px`,
              top: `${handleRect.y - 14}px`,
              width: '20px',
              height: '20px',
              borderRadius: '9999px',
              border: '1px solid #0f766e',
              background: 'white',
              color: '#0f766e',
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
      )}
    </>
  )
}
