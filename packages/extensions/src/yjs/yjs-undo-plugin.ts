import {
  definePlugin,
  type PlainExtension,
} from '@prosekit/core'
import type {
  Command,
  ProseMirrorPlugin,
} from '@prosekit/pm/state'
import type { EditorView } from '@prosekit/pm/view'
import {
  redo as yRedo,
  undo as yUndo,
  yUndoPlugin as originalYUndoPlugin,
  yUndoPluginKey,
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
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      undoManager.restore = () => {}
    }

    const viewRet = originalUndoPluginView
      ? originalUndoPluginView(view)
      : undefined

    return {
      destroy: () => {
        const hasUndoManSelf = undoManager.trackedOrigins.has(undoManager)

        const observers = undoManager._observers

        undoManager.restore = () => {
          if (hasUndoManSelf) {
            undoManager.trackedOrigins.add(undoManager)
          }

          undoManager.doc.on(
            'afterTransaction',
            undoManager.afterTransactionHandler,
          )

          undoManager._observers = observers
        }

        if (viewRet?.destroy) {
          viewRet.destroy()
        }
      },
    }
  }
}

/**
 * Options for the `y-prosemirror`'s `yUndoPlugin`.
 */
export type YjsUndoPluginOptions = NonNullable<
  Parameters<typeof originalYUndoPlugin>[0]
>

export interface YjsUndoOptions extends YjsUndoPluginOptions {}

/**
 * @internal
 */
function yUndoPlugin(options?: YjsUndoOptions) {
  const yUndoPluginInstance = originalYUndoPlugin(options)
  fixYUndoPlugin(yUndoPluginInstance)
  return yUndoPluginInstance
}

/**
 * @internal
 */
export const undo: Command = (state, dispatch) => {
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

/**
 * @internal
 */
export function defineYjsUndoPlugin(options: YjsUndoOptions): PlainExtension {
  return definePlugin(yUndoPlugin(options))
}
