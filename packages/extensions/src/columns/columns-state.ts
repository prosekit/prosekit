import type { Transaction } from '@prosekit/pm/state'

import type { ColumnDragState, ColumnsRuntimeState } from './columns-types.ts'

export type ColumnsMetaAction =
  | { type: 'setActiveHandle'; pos: number | null }
  | { type: 'startDragging'; pos: number; state: ColumnDragState }
  | { type: 'stopDragging' }

function isValidColumn(doc: Transaction['doc'], pos: number): boolean {
  try {
    return doc.nodeAt(pos)?.type.name === 'column'
  } catch {
    return false
  }
}

function remapActiveHandle(
  pos: number | null,
  tr: Transaction,
): number | null {
  if (pos == null) return null
  const result = tr.mapping.mapResult(pos)
  if (result.deleted) return null
  const mapped = result.pos
  return isValidColumn(tr.doc, mapped) ? mapped : null
}

export function applyColumnsMetaAction(
  prev: ColumnsRuntimeState,
  tr: Transaction,
  action: ColumnsMetaAction | undefined,
): ColumnsRuntimeState {
  if (action?.type === 'setActiveHandle') {
    return {
      activeHandle: action.pos,
      dragging: prev.dragging,
    }
  }
  if (action?.type === 'startDragging') {
    return {
      activeHandle: action.pos,
      dragging: action.state,
    }
  }
  if (action?.type === 'stopDragging') {
    return {
      activeHandle: prev.activeHandle,
      dragging: null,
    }
  }

  // No explicit meta action — remap positions when the document changes.
  if (!tr.docChanged) return prev

  // Cancel the drag if the document changes during a drag gesture.
  const dragging = prev.dragging && tr.docChanged ? null : prev.dragging

  return {
    activeHandle: remapActiveHandle(prev.activeHandle, tr),
    dragging,
  }
}
