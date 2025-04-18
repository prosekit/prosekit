import { defineUpdateHandler } from '@prosekit/core'
import type { EditorState } from '@prosekit/pm/state'
import { readable } from 'svelte/store'

import {
  useExtension,
  type UseExtensionOptions,
} from './use-extension'

/**
 * Calls the given handler whenever the editor state changes.
 *
 * @public
 */
export function useStateUpdate(
  handler: (state: EditorState) => void,
  options?: UseExtensionOptions,
): void {
  const extension = defineUpdateHandler((view) => handler(view.state))
  useExtension(readable(extension), options)
}
