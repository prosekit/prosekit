import { definePlugin, type PlainExtension } from '@prosekit/core'
import { Plugin, PluginKey, type EditorState } from '@prosekit/pm/state'

import { applyColumnsMetaAction, type ColumnsMetaAction } from './columns-state.ts'
import type { ColumnDragSession, ColumnHandleInfo, ColumnsRuntimeState } from './columns-types.ts'

export const columnsPluginKey: PluginKey<ColumnsRuntimeState> = new PluginKey<ColumnsRuntimeState>('columns')

/**
 * @internal
 */
export type ColumnsPluginExtension = PlainExtension

/**
 * Read the runtime state used by the columns plugin.
 */
export function getColumnsRuntimeState(state: EditorState): ColumnsRuntimeState | undefined {
  return columnsPluginKey.getState(state)
}

/**
 * Create a transaction meta action that marks a column handle as active.
 */
export function setActiveColumnHandle(handle: ColumnHandleInfo | null): ColumnsMetaAction {
  return { type: 'setActiveHandle', handle }
}

/**
 * Create a transaction meta action that starts a column drag session.
 */
export function startColumnDragging(dragging: ColumnDragSession): ColumnsMetaAction {
  return { type: 'startDragging', dragging }
}

/**
 * Create a transaction meta action that updates the current column drag
 * session.
 */
export function updateColumnDragging(dragging: ColumnDragSession): ColumnsMetaAction {
  return { type: 'updateDragging', dragging }
}

/**
 * Create a transaction meta action that clears the current column drag
 * session.
 */
export function stopColumnDragging(): ColumnsMetaAction {
  return { type: 'stopDragging' }
}

/**
 * Register the columns runtime plugin.
 */
export function defineColumnsPlugin(): ColumnsPluginExtension {
  return definePlugin(
    new Plugin<ColumnsRuntimeState>({
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
    }),
  )
}
