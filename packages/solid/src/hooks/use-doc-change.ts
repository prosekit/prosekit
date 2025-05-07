import { defineDocChangeHandler } from '@prosekit/core'
import type { ProseMirrorNode } from '@prosekit/pm/model'

import {
  useExtension,
  type UseExtensionOptions,
} from './use-extension'

/**
 * Calls the given handler whenever the editor document changes.
 *
 * @public
 */
export function useDocChange(
  handler: (doc: ProseMirrorNode) => void,
  options?: UseExtensionOptions,
): void {
  const extension = defineDocChangeHandler((view) => handler(view.state.doc))
  useExtension(() => extension, options)
}
