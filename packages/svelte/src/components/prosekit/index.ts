import type { Editor } from '@prosekit/core'
import type { SvelteComponent } from 'svelte'

import Comp from './prosekit.svelte'

export interface ProseKitProps {
  editor: Editor
}

/**
 * The root component for a ProseKit editor.
 *
 * @public
 */
export const ProseKit = Comp as typeof SvelteComponent<any> as typeof SvelteComponent<ProseKitProps>
