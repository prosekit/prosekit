import type { Editor } from '@prosekit/core'
import type { SvelteComponent } from 'svelte'

import ProseKitComponent from './prosekit.svelte'

export interface ProseKitProps {
  editor: Editor
}

/**
 * The root component for a ProseKit editor.
 *
 * @public
 */
export const ProseKit =
  ProseKitComponent as typeof SvelteComponent<any> as typeof SvelteComponent<ProseKitProps>
