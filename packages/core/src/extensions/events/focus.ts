import type { PlainExtension } from '../../types/extension.ts'

import { defineDomEventFacetPayload } from './dom-event.ts'

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
export function defineFocusChangeHandler(
  handler: FocusChangeHandler,
): PlainExtension {
  const handleFocus = () => handler(true)
  const handleBlur = () => handler(false)
  return defineDomEventFacetPayload(
    ['focus', handleFocus],
    ['blur', handleBlur],
  )
}
