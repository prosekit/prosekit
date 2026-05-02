import type { Editor } from '@prosekit/core'
import type { Component, Snippet } from 'svelte'

import Comp from './prosekit.svelte'

export interface ProseKitProps {
  editor: Editor
  children?: Snippet
}

/**
 * The root component for a ProseKit editor.
 *
 * @public
 */
export const ProseKit = Comp as Component<ProseKitProps>
