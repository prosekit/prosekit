import { defineUpdateHandler, type UpdateHandler } from '@prosekit/core'
import type { ReactiveControllerHost } from 'lit'

import type { WithEditor } from '../types/with-editor'

import { useEditorExtension } from './use-editor-extension'

/**
 * @internal 
 */
export function useEditorUpdateEvent(
  host: WithEditor<ReactiveControllerHost>,
  handler: UpdateHandler,
) {
  const extension = defineUpdateHandler(handler)
  useEditorExtension(host, extension)
}
