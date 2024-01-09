import { PluginKey, ProseMirrorPlugin } from '@prosekit/pm/state'
import type { EditorView } from '@prosekit/pm/view'

import { definePlugin } from '../plugin'

/**
 * A function that is called when the editor gains or loses focus.
 *
 * @param hasFocus - Whether the editor has focus.
 *
 * @public
 */
export type FocusChangeHandler = (hasFocus: boolean) => void

/**
 * Registers a event handler that is called when the editor gains or loses focus.
 *
 * @public
 */
export function defineFocusChangeHandler(handler: FocusChangeHandler) {
  const handleFocus = () => handler(true)
  const handleBlur = () => handler(false)

  const plugin = new ProseMirrorPlugin({
    key: new PluginKey('prosekit-focus-handler'),
    view: (view: EditorView) => {
      const dom = view.dom
      dom.addEventListener('focus', handleFocus)
      dom.addEventListener('blur', handleBlur)
      return {
        destroy: () => {
          dom.removeEventListener('focus', handleFocus)
          dom.removeEventListener('blur', handleBlur)
        },
      }
    },
  })
  return definePlugin(plugin)
}
