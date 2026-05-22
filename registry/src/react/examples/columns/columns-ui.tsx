'use client'

import type { Editor } from 'prosekit/core'
import {
  addColumnAfter,
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
import { useEffect, useMemo, useRef, useState } from 'react'

import { Button } from '../../ui/button'

import type { EditorExtension } from './extension'

interface BoundaryHandleRect {
  x: number
  y: number
  height: number
}

interface ColumnMenuRect {
  x: number
  y: number
}

interface ColumnMenuState {
  rect: ColumnMenuRect
  addBefore: {
    canExec: boolean
    command: () => void
  }
  addAfter: {
    canExec: boolean
    command: () => void
  }
  remove: {
    canExec: boolean
    command: () => void
  }
  distribute: {
    canExec: boolean
    command: () => void
  }
}

function getColumnElement(
  editor: Editor<EditorExtension>,
  columnPos: number,
): HTMLElement | null {
  const dom = editor.view.nodeDOM(columnPos)
  return dom instanceof HTMLElement ? dom : null
}

function getBoundaryHandleRect(
  editor: Editor<EditorExtension>,
  handle: ColumnHandleInfo | null,
): BoundaryHandleRect | null {
  if (!handle) return null
  const dom = getColumnElement(editor, handle.columnPos)
  if (!dom) return null

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

function getColumnMenuState(
  editor: Editor<EditorExtension>,
): ColumnMenuState | null {
  const found = findParentColumn(editor.state.selection.$anchor)
  if (!found) return null

  const dom = getColumnElement(editor, found.pos)
  if (!dom) return null

  const rect = dom.getBoundingClientRect()

  return {
    rect: {
      x: rect.left + rect.width / 2,
      y: rect.top,
    },
    addBefore: {
      canExec: editor.commands.addColumnBefore.canExec(),
      command: () => {
        editor.commands.addColumnBefore()
        editor.focus()
      },
    },
    addAfter: {
      canExec: editor.commands.addColumnAfter.canExec(),
      command: () => {
        editor.commands.addColumnAfter()
        editor.focus()
      },
    },
    remove: {
      canExec: editor.commands.removeColumn.canExec(),
      command: () => {
        editor.commands.removeColumn()
        editor.focus()
      },
    },
    distribute: {
      canExec: editor.commands.distributeColumns.canExec(),
      command: () => {
        editor.commands.distributeColumns()
        editor.focus()
      },
    },
  }
}

function getStateAtHandleSelection(
  editor: Editor<EditorExtension>,
  handle: ColumnHandleInfo,
) {
  return editor.view.state.apply(editor.view.state.tr.setSelection(
    TextSelection.create(editor.view.state.doc, handle.columnPos + 1),
  ))
}

function runCommandAtHandle(
  editor: Editor<EditorExtension>,
  handle: ColumnHandleInfo,
  command: () => boolean,
) {
  editor.view.dispatch(editor.view.state.tr.setSelection(
    TextSelection.create(editor.view.state.doc, handle.columnPos + 1),
  ))
  command()
  editor.focus()
}

export default function ColumnsUi() {
  const editor = useEditor<EditorExtension>()
  const handleButtonRef = useRef<HTMLButtonElement | null>(null)
  const inlineMenuRef = useRef<HTMLDivElement | null>(null)
  const [focused, setFocused] = useState(() => editor.focused)

  const handleRect = useEditorDerivedValue(useMemo(() => {
    return (currentEditor: Editor<EditorExtension>) => getBoundaryHandleRect(
      currentEditor,
      getColumnsRuntimeState(currentEditor.state)?.activeHandle ?? null,
    )
  }, []))

  const handleActions = useEditorDerivedValue(useMemo(() => {
    return (currentEditor: Editor<EditorExtension>) => {
      const handle = getColumnsRuntimeState(currentEditor.state)?.activeHandle
      if (!handle) return null

      const stateAtHandle = getStateAtHandleSelection(currentEditor, handle)
      return {
        canAddAfter: addColumnAfter()(stateAtHandle),
        addAfter: () => {
          runCommandAtHandle(currentEditor, handle, () => currentEditor.commands.addColumnAfter())
        },
      }
    }
  }, []))

  const menuState = useEditorDerivedValue(useMemo(() => {
    return (currentEditor: Editor<EditorExtension>) => getColumnMenuState(currentEditor)
  }, []))

  useEffect(() => {
    if (!editor.mounted) return

    const view = editor.view
    const root = view.dom

    const shouldKeepHandle = (target: EventTarget | null) => {
      return target instanceof Node
        && (
          handleButtonRef.current?.contains(target)
          || inlineMenuRef.current?.contains(target)
        )
    }

    const clearHandle = () => {
      const runtime = getColumnsRuntimeState(view.state)
      if (runtime?.dragging) return
      view.dispatch(view.state.tr.setMeta(columnsPluginKey, setActiveColumnHandle(null)))
    }

    const handleMouseMove = (event: MouseEvent) => {
      const runtime = getColumnsRuntimeState(view.state)
      if (runtime?.dragging) return
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
      const dom = getColumnElement(editor, hit.columnPos)
      if (!dom) return
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

    const handleRootMouseLeave = (event: MouseEvent) => {
      if (shouldKeepHandle(event.relatedTarget)) return
      clearHandle()
    }

    const handleFocusIn = () => {
      setFocused(true)
    }

    const handleFocusOut = () => {
      queueMicrotask(() => {
        setFocused(editor.focused)
      })
    }

    root.addEventListener('mousemove', handleMouseMove)
    root.addEventListener('mouseleave', handleRootMouseLeave)
    root.addEventListener('mousedown', handleMouseDown)
    root.addEventListener('focusin', handleFocusIn)
    root.addEventListener('focusout', handleFocusOut)
    window.addEventListener('mousemove', handleDragMove)
    window.addEventListener('mouseup', handleMouseUp)

    return () => {
      root.removeEventListener('mousemove', handleMouseMove)
      root.removeEventListener('mouseleave', handleRootMouseLeave)
      root.removeEventListener('mousedown', handleMouseDown)
      root.removeEventListener('focusin', handleFocusIn)
      root.removeEventListener('focusout', handleFocusOut)
      window.removeEventListener('mousemove', handleDragMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [editor])

  return (
    <>
      {focused && menuState && (
        <div
          ref={inlineMenuRef}
          style={{
            position: 'fixed',
            left: `${menuState.rect.x}px`,
            top: `${Math.max(menuState.rect.y - 40, 8)}px`,
            transform: 'translate(-50%, -100%)',
            zIndex: 21,
          }}
        >
          <div className="CSS_INLINE_MENU_MAIN_POPUP">
            <Button
              pressed={false}
              disabled={!menuState.addBefore.canExec}
              onClick={menuState.addBefore.command}
              tooltip="Add column before"
            >
              <div className="CSS_ICON_ARROW_LEFT"></div>
            </Button>
            <Button
              pressed={false}
              disabled={!menuState.addAfter.canExec}
              onClick={menuState.addAfter.command}
              tooltip="Add column after"
            >
              <div className="CSS_ICON_PLUS"></div>
            </Button>
            <Button
              pressed={false}
              disabled={!menuState.distribute.canExec}
              onClick={menuState.distribute.command}
              tooltip="Equalize columns"
            >
              <span className="text-sm leading-none">=</span>
            </Button>
            <Button
              pressed={false}
              disabled={!menuState.remove.canExec}
              onClick={menuState.remove.command}
              tooltip="Remove column"
            >
              <div className="CSS_ICON_MINUS"></div>
            </Button>
          </div>
        </div>
      )}

      {handleRect && (
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
            ref={handleButtonRef}
            type="button"
            aria-label="Add column"
            disabled={!handleActions?.canAddAfter}
            style={{
              position: 'fixed',
              left: `${handleRect.x - 10}px`,
              top: `${Math.max(handleRect.y - 10, 8)}px`,
              width: '20px',
              height: '20px',
              borderRadius: '9999px',
              border: '1px solid #d1d5db',
              background: '#ffffff',
              color: '#374151',
              fontSize: '14px',
              lineHeight: 1,
              zIndex: 21,
              opacity: handleActions?.canAddAfter ? 1 : 0.5,
            }}
            onMouseDown={(event) => event.preventDefault()}
            onMouseLeave={(event) => {
              const relatedTarget = event.relatedTarget
              if (
                relatedTarget instanceof Node
                && (
                  editor.view.dom.contains(relatedTarget)
                  || inlineMenuRef.current?.contains(relatedTarget)
                )
              ) {
                return
              }
              editor.view.dispatch(editor.view.state.tr.setMeta(columnsPluginKey, setActiveColumnHandle(null)))
            }}
            onClick={() => handleActions?.addAfter()}
          >
            +
          </button>
        </>
      )}
    </>
  )
}
