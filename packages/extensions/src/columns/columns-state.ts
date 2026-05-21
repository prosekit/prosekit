import type { Transaction } from '@prosekit/pm/state'

import type {
  ColumnDragSession,
  ColumnHandleInfo,
  ColumnsRuntimeState,
} from './columns-types.ts'

export type ColumnsMetaAction =
  | { type: 'setActiveHandle', handle: ColumnHandleInfo | null }
  | { type: 'startDragging', dragging: ColumnDragSession }
  | { type: 'updateDragging', dragging: ColumnDragSession }
  | { type: 'stopDragging' }

function remapHandle(
  handle: ColumnHandleInfo | null,
  tr: Transaction,
): ColumnHandleInfo | null {
  if (!handle) return null
  const handleResult = tr.mapping.mapResult(handle.pos)
  const columnResult = tr.mapping.mapResult(handle.columnPos)
  const containerResult = tr.mapping.mapResult(handle.containerPos)
  if (handleResult.deleted || columnResult.deleted || containerResult.deleted) {
    return null
  }
  return {
    ...handle,
    pos: handleResult.pos,
    columnPos: columnResult.pos,
    containerPos: containerResult.pos,
  }
}

function remapDragging(
  dragging: ColumnDragSession | null,
  tr: Transaction,
): ColumnDragSession | null {
  if (!dragging) return null
  const handleResult = tr.mapping.mapResult(dragging.handlePos)
  const columnResult = tr.mapping.mapResult(dragging.columnPos)
  if (handleResult.deleted || columnResult.deleted) {
    return null
  }
  return {
    ...dragging,
    handlePos: handleResult.pos,
    columnPos: columnResult.pos,
  }
}

export function applyColumnsMetaAction(
  prev: ColumnsRuntimeState,
  tr: Transaction,
  action: ColumnsMetaAction | undefined,
): ColumnsRuntimeState {
  if (action?.type === 'setActiveHandle') {
    return {
      activeHandle: action.handle,
      dragging: prev.dragging,
    }
  }
  if (action?.type === 'startDragging' || action?.type === 'updateDragging') {
    return {
      activeHandle: prev.activeHandle,
      dragging: action.dragging,
    }
  }
  if (action?.type === 'stopDragging') {
    return {
      activeHandle: prev.activeHandle,
      dragging: null,
    }
  }
  if (!tr.docChanged) return prev
  return {
    activeHandle: remapHandle(prev.activeHandle, tr),
    dragging: remapDragging(prev.dragging, tr),
  }
}
