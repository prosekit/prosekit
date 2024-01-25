import {
  defineFocusChangeHandler,
  type FocusChangeHandler,
} from '@prosekit/core'
import type { ReactiveControllerHost } from 'lit'

import type { WithEditor } from '../types/with-editor'

import { useEditorExtension } from './use-editor-extension'

/**
 * @internal
 */
export function useEditorFocusChangeEvent(
  host: WithEditor<ReactiveControllerHost>,
  handler: FocusChangeHandler,
) {
  const extension = defineFocusChangeHandler(handler)
  useEditorExtension(host, extension)
}
