import { definePlugin, type PlainExtension } from '@prosekit/core'
import { Plugin, PluginKey, type EditorState } from '@prosekit/pm/state'

import { applyColumnsMetaAction, type ColumnsMetaAction } from './columns-state.ts'
import type {
  ColumnDragSession,
  ColumnHandleInfo,
  ColumnsRuntimeState,
} from './columns-types.ts'

export const columnsPluginKey: PluginKey<ColumnsRuntimeState> = new PluginKey<ColumnsRuntimeState>('columns')

/**
 * @internal
 */
export type ColumnsPluginExtension = PlainExtension

/**
 * @internal
 */
export function getColumnsRuntimeState(state: EditorState): ColumnsRuntimeState | undefined {
  return columnsPluginKey.getState(state)
}

export function setActiveColumnHandle(handle: ColumnHandleInfo | null): ColumnsMetaAction {
  return { type: 'setActiveHandle', handle }
}

export function startColumnDragging(dragging: ColumnDragSession): ColumnsMetaAction {
  return { type: 'startDragging', dragging }
}

export function updateColumnDragging(dragging: ColumnDragSession): ColumnsMetaAction {
  return { type: 'updateDragging', dragging }
}

export function stopColumnDragging(): ColumnsMetaAction {
  return { type: 'stopDragging' }
}

/**
 * @internal
 */
export function defineColumnsPlugin(): ColumnsPluginExtension {
  return definePlugin(new Plugin<ColumnsRuntimeState>({
    key: columnsPluginKey,
    state: {
      init: () => ({
        activeHandle: null,
        dragging: null,
      }),
      apply(tr, prev) {
        const action = tr.getMeta(columnsPluginKey) as ColumnsMetaAction | undefined
        return applyColumnsMetaAction(prev, tr, action)
      },
    },
  }))
}
