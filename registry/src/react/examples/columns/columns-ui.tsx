'use client'

import type { Editor } from 'prosekit/core'
import {
  addColumnAfter,
  columnsPluginKey,
  findColumnBoundaryAtCoords,
  findParentColumn,
  getColumnsRuntimeState,
  setActiveColumnHandle,
  startColumnDragging,
  stopColumnDragging,
  updateColumnDragging,
  type ColumnDragSession,
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

interface ResizeColumn {
  pos: number
  width: number
}

interface ColumnResizeSession {
  startX: number
  leftIndex: number
  minColumnPercent: number
  totalWidth: number
  columns: ResizeColumn[]
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

interface OverlayBounds {
  left: number
  top: number
  right: number
  bottom: number
}

const TOTAL_COLUMN_PERCENT = 100
const MIN_COLUMN_PERCENT = 4
const COLUMN_PERCENT_PRECISION = 1000

function getColumnElement(
  editor: Editor<EditorExtension>,
  columnPos: number,
): HTMLElement | null {
  const dom = editor.view.nodeDOM(columnPos)
  return dom instanceof HTMLElement ? dom : null
}

function isColumnElement(element: Element): element is HTMLElement {
  return element instanceof HTMLElement && element.classList.contains('prosekit-column')
}

function isColumnsElement(element: Element | null): element is HTMLElement {
  return element instanceof HTMLElement && element.classList.contains('prosekit-columns')
}

function getColumnPos(editor: Editor<EditorExtension>, element: HTMLElement): number | null {
  const pos = editor.view.posAtDOM(element, 0)
  if (pos == null) return null

  const found = findParentColumn(editor.state.doc.resolve(pos + 1))
  return found?.pos ?? null
}

function getColumnElements(
  editor: Editor<EditorExtension>,
  handle: ColumnHandleInfo,
): { container: HTMLElement, columns: HTMLElement[], leftIndex: number } | null {
  const column = getColumnElement(editor, handle.columnPos)
  const container = column?.parentElement
  if (!column || !isColumnsElement(container)) return null

  const columns = Array.from(container.children).filter(isColumnElement)
  const leftIndex = columns.indexOf(column)
  if (leftIndex < 0) return null

  return { container, columns, leftIndex }
}

function getColumnElementsInContainer(
  editor: Editor<EditorExtension>,
  containerPos: number,
): { container: HTMLElement, columns: HTMLElement[] } | null {
  const container = editor.view.nodeDOM(containerPos)
  if (!isColumnsElement(container)) return null

  const columns = Array.from(container.children).filter(isColumnElement)
  return { container, columns }
}

function roundColumnPercent(width: number): number {
  return Math.round(width * COLUMN_PERCENT_PRECISION) / COLUMN_PERCENT_PRECISION
}

function finishColumnPercents(widths: number[]): number[] {
  if (widths.length === 0) return []
  const rounded = widths.map(roundColumnPercent)
  const total = rounded.reduce((sum, width) => sum + width, 0)
  rounded[rounded.length - 1] = roundColumnPercent(rounded[rounded.length - 1] + TOTAL_COLUMN_PERCENT - total)
  return rounded
}

function getEqualColumnWidths(columnCount: number): number[] {
  if (columnCount <= 0) return []
  return finishColumnPercents(Array.from({ length: columnCount }, () => TOTAL_COLUMN_PERCENT / columnCount))
}

function normalizeColumnPercents(widths: number[]): number[] {
  if (widths.length === 0) return []
  const total = widths.reduce((sum, width) => sum + Math.max(0, width), 0)
  if (total <= 0) return getEqualColumnWidths(widths.length)

  return finishColumnPercents(widths.map((width) => Math.max(0, width) / total * TOTAL_COLUMN_PERCENT))
}

function getMinColumnPercent(columnCount: number): number {
  if (columnCount <= 0) return 0
  return Math.min(MIN_COLUMN_PERCENT, TOTAL_COLUMN_PERCENT / columnCount / 2)
}

function getRenderedColumnsWidth(elements: HTMLElement[]): number {
  return elements.reduce((sum, element) => sum + element.getBoundingClientRect().width, 0)
}

function getResizeColumns(
  editor: Editor<EditorExtension>,
  elements: HTMLElement[],
): ResizeColumn[] | null {
  const measured: ResizeColumn[] = []
  const totalWidth = getRenderedColumnsWidth(elements)

  for (const element of elements) {
    const pos = getColumnPos(editor, element)
    if (pos == null) return null
    measured.push({
      pos,
      width: element.getBoundingClientRect().width,
    })
  }

  if (totalWidth <= 0) {
    const equalWidths = getEqualColumnWidths(measured.length)
    return measured.map((column, index) => ({
      pos: column.pos,
      width: equalWidths[index],
    }))
  }

  const widths = normalizeColumnPercents(measured.map((column) => column.width))
  return measured.map((column, index) => ({
    pos: column.pos,
    width: widths[index],
  }))
}

function getOverlayBounds(editor: Editor<EditorExtension>): OverlayBounds | null {
  if (!editor.mounted) return null
  const scrolling = editor.view.dom.parentElement
  if (!(scrolling instanceof HTMLElement)) return null

  const rect = scrolling.getBoundingClientRect()
  return {
    left: rect.left,
    top: rect.top,
    right: rect.right,
    bottom: rect.bottom,
  }
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
        if (editor.commands.addColumnBefore()) {
          fitColumnsInContainer(editor, found.containerPos, { equalize: true })
        }
        editor.focus()
      },
    },
    addAfter: {
      canExec: editor.commands.addColumnAfter.canExec(),
      command: () => {
        if (editor.commands.addColumnAfter()) {
          fitColumnsInContainer(editor, found.containerPos, { equalize: true })
        }
        editor.focus()
      },
    },
    remove: {
      canExec: editor.commands.removeColumn.canExec(),
      command: () => {
        if (editor.commands.removeColumn()) {
          fitColumnsInContainer(editor, found.containerPos)
        }
        editor.focus()
      },
    },
    distribute: {
      canExec: editor.commands.distributeColumns.canExec(),
      command: () => {
        fitColumnsInContainer(editor, found.containerPos, { equalize: true })
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
): boolean {
  editor.view.dispatch(editor.view.state.tr.setSelection(
    TextSelection.create(editor.view.state.doc, handle.columnPos + 1),
  ))
  const executed = command()
  editor.focus()
  return executed
}

function startDraggingAtHandle(
  editor: Editor<EditorExtension>,
  handle: ColumnHandleInfo,
  startX: number,
) {
  const dom = getColumnElement(editor, handle.columnPos)
  if (!dom) return

  editor.view.dispatch(editor.view.state.tr.setMeta(columnsPluginKey, startColumnDragging({
    handlePos: handle.pos,
    columnPos: handle.columnPos,
    startX,
    startWidth: dom.getBoundingClientRect().width,
  })))
}

function createColumnResizeSession(
  editor: Editor<EditorExtension>,
  handle: ColumnHandleInfo,
  startX: number,
): ColumnResizeSession | null {
  const result = getColumnElements(editor, handle)
  if (!result) return null

  const nextColumn = result.columns[result.leftIndex + 1]
  if (!nextColumn) return null

  const columns = getResizeColumns(editor, result.columns)
  if (!columns) return null
  const totalWidth = getRenderedColumnsWidth(result.columns)
  if (totalWidth <= 0) return null

  return {
    startX,
    leftIndex: result.leftIndex,
    minColumnPercent: getMinColumnPercent(result.columns.length),
    totalWidth,
    columns,
  }
}

function getResizedColumns(session: ColumnResizeSession, clientX: number): ResizeColumn[] {
  const left = session.columns[session.leftIndex]
  const right = session.columns[session.leftIndex + 1]
  if (!left || !right) return session.columns

  const pairWidth = left.width + right.width
  const deltaPercent = (clientX - session.startX) / session.totalWidth * TOTAL_COLUMN_PERCENT
  const minColumnPercent = Math.min(session.minColumnPercent, pairWidth / 2)
  const maxLeftWidth = pairWidth - minColumnPercent
  const nextLeftWidth = roundColumnPercent(Math.min(
    maxLeftWidth,
    Math.max(minColumnPercent, left.width + deltaPercent),
  ))
  const nextRightWidth = roundColumnPercent(pairWidth - nextLeftWidth)
  const nextColumns = session.columns.map((column) => ({ ...column }))

  nextColumns[session.leftIndex].width = nextLeftWidth
  nextColumns[session.leftIndex + 1].width = nextRightWidth
  return finishColumnPercents(nextColumns.map((column) => column.width)).map((width, index) => ({
    ...nextColumns[index],
    width,
  }))
}

function setColumnWidths(
  editor: Editor<EditorExtension>,
  columns: ResizeColumn[],
  dragging?: ColumnDragSession,
) {
  const normalizedColumns = normalizeColumnPercents(columns.map((column) => column.width)).map(
    (width, index) => ({
      ...columns[index],
      width,
    }),
  )
  const tr = editor.state.tr
  let changed = false

  for (const column of normalizedColumns) {
    const node = editor.state.doc.nodeAt(column.pos)
    if (!node || node.type.name !== 'column') continue
    if (node.attrs.width === column.width) continue

    tr.setNodeMarkup(column.pos, undefined, {
      ...node.attrs,
      width: column.width,
    })
    changed = true
  }

  if (!changed) return

  if (dragging) {
    tr.setMeta(columnsPluginKey, updateColumnDragging(dragging))
  }

  editor.view.dispatch(tr)
}

function fitColumnsInContainer(
  editor: Editor<EditorExtension>,
  containerPos: number,
  options: { equalize?: boolean } = {},
) {
  const result = getColumnElementsInContainer(editor, containerPos)
  if (!result) return

  const columns = getResizeColumns(editor, result.columns)
  if (!columns) return

  const widths = options.equalize
    ? getEqualColumnWidths(columns.length)
    : normalizeColumnPercents(columns.map((column) => column.width))

  setColumnWidths(
    editor,
    columns.map((column, index) => ({
      pos: column.pos,
      width: widths[index],
    })),
  )
}

export default function ColumnsUi() {
  const editor = useEditor<EditorExtension>()
  const handleButtonRef = useRef<HTMLButtonElement | null>(null)
  const dragHandleRef = useRef<HTMLDivElement | null>(null)
  const inlineMenuRef = useRef<HTMLDivElement | null>(null)
  const resizeSessionRef = useRef<ColumnResizeSession | null>(null)
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
        handle,
        canAddAfter: addColumnAfter()(stateAtHandle),
        canResize: createColumnResizeSession(currentEditor, handle, 0) != null,
        addAfter: () => {
          if (runCommandAtHandle(currentEditor, handle, () => currentEditor.commands.addColumnAfter())) {
            fitColumnsInContainer(currentEditor, handle.containerPos, { equalize: true })
          }
        },
        startDragging: (clientX: number) => {
          resizeSessionRef.current = createColumnResizeSession(currentEditor, handle, clientX)
          if (!resizeSessionRef.current) return
          startDraggingAtHandle(currentEditor, handle, clientX)
        },
      }
    }
  }, []))

  const menuState = useEditorDerivedValue(useMemo(() => {
    return (currentEditor: Editor<EditorExtension>) => getColumnMenuState(currentEditor)
  }, []))

  const overlayBounds = useEditorDerivedValue(useMemo(() => {
    return (currentEditor: Editor<EditorExtension>) => getOverlayBounds(currentEditor)
  }, []))

  useEffect(() => {
    if (!editor.mounted) return

    const view = editor.view
    const root = view.dom
    let animationFrame: number | null = null
    let pendingResize: { dragging: ColumnDragSession, columns: ResizeColumn[] } | null = null

    const flushResize = () => {
      animationFrame = null
      const resize = pendingResize
      pendingResize = null
      if (!resize) return
      setColumnWidths(editor, resize.columns, resize.dragging)
    }

    const scheduleResize = (resize: { dragging: ColumnDragSession, columns: ResizeColumn[] }) => {
      pendingResize = resize
      if (animationFrame != null) return
      animationFrame = requestAnimationFrame(flushResize)
    }

    const shouldKeepHandle = (target: EventTarget | null) => {
      return target instanceof Node
        && (
          handleButtonRef.current?.contains(target)
          || dragHandleRef.current?.contains(target)
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
      const session = resizeSessionRef.current
      if (!session) return
      scheduleResize({
        dragging: runtime.dragging,
        columns: getResizedColumns(session, event.clientX),
      })
    }

    const handleMouseDown = (event: MouseEvent) => {
      const hit = findColumnBoundaryAtCoords(view, event, { handleWidth: 8 })
      if (!hit) return
      const session = createColumnResizeSession(editor, hit, event.clientX)
      if (!session) return
      resizeSessionRef.current = session
      startDraggingAtHandle(editor, hit, event.clientX)
      event.preventDefault()
    }

    const handleMouseUp = () => {
      const runtime = getColumnsRuntimeState(view.state)
      if (!runtime?.dragging) return
      if (animationFrame != null) {
        cancelAnimationFrame(animationFrame)
        flushResize()
      }
      resizeSessionRef.current = null
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
      if (animationFrame != null) {
        cancelAnimationFrame(animationFrame)
      }
      resizeSessionRef.current = null
    }
  }, [editor])

  return (
    <>
      {focused && menuState && overlayBounds && (
        <div
          ref={inlineMenuRef}
          style={{
            position: 'fixed',
            left: `${Math.min(
              Math.max(menuState.rect.x, overlayBounds.left + 72),
              overlayBounds.right - 72,
            )}px`,
            top: `${Math.max(menuState.rect.y - 40, overlayBounds.top + 8)}px`,
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

      {handleRect && overlayBounds && (
        <>
          <div
            ref={dragHandleRef}
            style={{
              position: 'fixed',
              left: `${Math.min(
                Math.max(handleRect.x - 6, overlayBounds.left + 2),
                overlayBounds.right - 14,
              )}px`,
              top: `${Math.max(handleRect.y, overlayBounds.top)}px`,
              width: '12px',
              height: `${Math.max(
                0,
                Math.min(handleRect.y + handleRect.height, overlayBounds.bottom)
                  - Math.max(handleRect.y, overlayBounds.top),
              )}px`,
              cursor: handleActions?.canResize ? 'col-resize' : 'default',
              zIndex: 20,
            }}
            onMouseDown={(event) => {
              if (!handleActions?.canResize) return
              event.preventDefault()
              event.stopPropagation()
              handleActions?.startDragging(event.clientX)
            }}
            onMouseLeave={(event) => {
              const relatedTarget = event.relatedTarget
              if (
                relatedTarget instanceof Node
                && (
                  editor.view.dom.contains(relatedTarget)
                  || handleButtonRef.current?.contains(relatedTarget)
                  || inlineMenuRef.current?.contains(relatedTarget)
                )
              ) {
                return
              }
              editor.view.dispatch(editor.view.state.tr.setMeta(columnsPluginKey, setActiveColumnHandle(null)))
            }}
          />
          <div
            style={{
              position: 'fixed',
              left: `${handleRect.x - 1}px`,
              top: `${Math.max(handleRect.y, overlayBounds.top)}px`,
              width: '2px',
              height: `${Math.max(
                0,
                Math.min(handleRect.y + handleRect.height, overlayBounds.bottom)
                  - Math.max(handleRect.y, overlayBounds.top),
              )}px`,
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
              left: `${Math.min(
                Math.max(handleRect.x - 10, overlayBounds.left + 4),
                overlayBounds.right - 24,
              )}px`,
              top: `${Math.max(handleRect.y - 10, overlayBounds.top + 8)}px`,
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
                  || dragHandleRef.current?.contains(relatedTarget)
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
