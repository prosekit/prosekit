import type { Component } from 'svelte'

import type { ProseKitProps } from './props'
import ProseKitComponent from './prosekit.svelte'

export type { ProseKitProps }

/**
 * The root component for a ProseKit editor.
 *
 * @public
 */
export const ProseKit: Component<ProseKitProps> = ProseKitComponent
