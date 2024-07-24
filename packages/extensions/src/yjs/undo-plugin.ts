import type { Command, ProseMirrorPlugin } from '@prosekit/pm/state'
import type { EditorView } from '@prosekit/pm/view'
import {
  yUndoPluginKey,
  yUndoPlugin as originalYUndoPlugin,
  undo as yUndo,
  redo as yRedo,
} from 'y-prosemirror'
import type { UndoManager as YjsUndoManager } from 'yjs'

type UndoManager = YjsUndoManager & { restore: () => void }

/**
 * @see https://github.com/yjs/y-prosemirror/issues/114 and https://github.com/yjs/y-prosemirror/issues/102
 */
function fixYUndoPlugin(yUndoPluginInstance: ProseMirrorPlugin) {
  const originalUndoPluginView = yUndoPluginInstance.spec.view
  yUndoPluginInstance.spec.view = (view: EditorView) => {
    const { undoManager } = yUndoPluginKey.getState(view.state) as {
      undoManager: UndoManager
    }

    if (undoManager.restore) {
      undoManager.restore()
      // eslint-disable-next-line
      undoManager.restore = () => {}
    }

    const viewRet = originalUndoPluginView
      ? originalUndoPluginView(view)
      : undefined

    return {
      destroy: () => {
        const hasUndoManSelf = undoManager.trackedOrigins.has(undoManager)
        // eslint-disable-next-line
        const observers = undoManager._observers

        undoManager.restore = () => {
          if (hasUndoManSelf) {
            undoManager.trackedOrigins.add(undoManager)
          }

          undoManager.doc.on(
            'afterTransaction',
            undoManager.afterTransactionHandler,
          )
          // eslint-disable-next-line
          undoManager._observers = observers
        }

        if (viewRet?.destroy) {
          viewRet.destroy()
        }
      },
    }
  }
}

export type YUndoOpts = Parameters<typeof originalYUndoPlugin>[0]

/**
 * @internal
 */
export function yUndoPlugin(opts?: YUndoOpts) {
  const yUndoPluginInstance = originalYUndoPlugin(opts)
  fixYUndoPlugin(yUndoPluginInstance)
  return yUndoPluginInstance
}

/**
 * @internal
 */
export const undo: Command = (state, dispatch) => {
  const { tr } = state
  tr.setMeta('preventDispatch', true)

  const { undoManager } = yUndoPluginKey.getState(state) as {
    undoManager: UndoManager
  }
  if (undoManager.undoStack.length === 0) {
    return false
  }

  if (!dispatch) {
    return true
  }

  return yUndo(state)
}

/**
 * @internal
 */
export const redo: Command = (state, dispatch) => {
  const { tr } = state

  tr.setMeta('preventDispatch', true)

  const { undoManager } = yUndoPluginKey.getState(state) as {
    undoManager: UndoManager
  }

  if (undoManager.redoStack.length === 0) {
    return false
  }

  if (!dispatch) {
    return true
  }

  return yRedo(state)
}
