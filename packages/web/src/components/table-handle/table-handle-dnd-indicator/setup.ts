import { createComputed, useEffect, type ConnectableElement, type SignalState } from "@aria-ui/core";
import type { EditorView } from "@prosekit/pm/view";

import { tableHandleDndContext, tableHandleRootContext } from "../context";

import type { TableHandleDndIndicatorProps } from "./types";

export function useTableHandleDndIndicator(host: ConnectableElement, { state }: { state: SignalState<TableHandleDndIndicatorProps> }): void {
  const { editor } = state
  const dndContext = tableHandleDndContext.consume(host)
  const rootContext = tableHandleRootContext.consume(host)

  const clientXSignal = createComputed(() => {
    const context = dndContext.get()
    return context.x;
  })

  const clientYSignal = createComputed(() => {
    const context = dndContext.get()
    return context.y;
  })

  const directionSignal = createComputed(() => {
    const context = dndContext.get()
    return context.direction;
  })

  const draggingSingal = createComputed(() => {
    const context = dndContext.get()
    return context.dragging;
  })

  const draggingIndexSignal = createComputed(() => {
    const context = dndContext.get()
    return context.draggingIndex;
  })

  useEffect(host, () => {
    const editorInstance = editor.get();
    if (!editorInstance) return;

    const dragging = draggingSingal.get()
    const direction = directionSignal.get()

    host.dataset.direction = direction
    host.dataset.dragging = dragging.toString()

    Object.assign(host.style, {
      display: dragging ? 'block' : 'none',
    })
    if (!dragging) return;
    
    const draggingIndex = draggingIndexSignal.get()
    const { view } = editorInstance

    const cellPos = rootContext.peek()?.cellPos
    if (cellPos == null) return;
    const table = getTableDOMByPos(view, cellPos)
    if (!table) return;
    const cell = getTargetFirstCellDOM(table, draggingIndex, direction)
    if (!cell) return;

    const tableRect = table.getBoundingClientRect()
    const cellRect = cell.getBoundingClientRect()

    host.style.backgroundColor = 'red'

    if (direction === 'vertical') {
      Object.assign(host.style, {
        width: `${cellRect.width}px`,
        height: `${tableRect.height}px`,
      })
    } else {
      Object.assign(host.style, {
        width: `${tableRect.width}px`,
        height: `${cellRect.height}px`,
      })
    }
  })

  useEffect(host, () => {
    const editorInstance = editor.get();
    if (!editorInstance) return;
    if (!draggingSingal.get()) return;
    
    const { view } = editorInstance
    const { draggingIndex, direction } = dndContext.peek();
    const x = clientXSignal.get();
    const y = clientYSignal.get();
  })
}

function getTableDOMByPos(view: EditorView, pos: number): HTMLTableElement | undefined {
  const dom = view.domAtPos(pos).node
  if (!dom) return;
  const element = dom instanceof HTMLElement ? dom : dom.parentElement
  const table = element?.closest('table')
  return table ?? undefined
}

function getTargetFirstCellDOM(table: HTMLTableElement, index: number, direction: 'horizontal' | 'vertical'): HTMLElement | undefined {
  const rows = table.querySelectorAll('tr')
  if (direction === 'horizontal') {
    const row = rows[index]
    const cell = row.querySelector('td')
    return cell ?? undefined
  }

  const row = rows[0]
  const cell = row.querySelectorAll('td')[index]
  return cell ?? undefined
}