import { definePlugin, type PlainExtension } from '@prosekit/core'
import type { ProseMirrorPlugin } from '@prosekit/pm/state'
import type { EditorView } from '@prosekit/pm/view'
import { yUndoPlugin as originalYUndoPlugin, yUndoPluginKey, type UndoPluginState } from 'y-prosemirror'
import type { UndoManager as YjsUndoManager } from 'yjs'

type UndoManager = YjsUndoManager & { restore: () => void }

/**
 * @see https://github.com/yjs/y-prosemirror/issues/114 and https://github.com/yjs/y-prosemirror/issues/102
 */
function fixYUndoPlugin(yUndoPluginInstance: ProseMirrorPlugin) {
  const originalUndoPluginView = yUndoPluginInstance.spec.view
  yUndoPluginInstance.spec.view = (view: EditorView) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- The type definition in y-prosemirror is not correct. A explicit file extension should be added to this line: https://npmx.dev/package-code/y-prosemirror/v/1.3.7/dist%2Fsrc%2Fplugins%2Fkeys.d.ts#L13
    const pluginState: UndoPluginState | undefined = yUndoPluginKey.getState(view.state)
    if (!pluginState) {
      return {}
    }

    const undoManager = pluginState.undoManager as UndoManager

    if (undoManager.restore) {
      undoManager.restore()
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
export function defineYjsUndoPlugin(options: YjsUndoOptions): PlainExtension {
  return definePlugin(yUndoPlugin(options))
}
