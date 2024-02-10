import { union } from '../../editor/union'

import { defineDOMEventHandler } from './dom-event'

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
  return union([
    defineDOMEventHandler('focus', handleFocus),
    defineDOMEventHandler('blur', handleBlur),
  ])
}
