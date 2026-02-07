import type { DropIndicatorElement, DropIndicatorProps as Props, DropIndicatorEvents as Events } from '@prosekit/web/drop-indicator'    
import type { SvelteComponent } from 'svelte'
import type { HTMLAttributes } from 'svelte/elements'

import type { CreateProps } from '../create-props.ts'

import Component from './drop-indicator.gen.svelte'

/**
 * Props for the {@link DropIndicator} component.
 */
export interface DropIndicatorProps extends Partial<CreateProps<Props, Events>> {}

export const DropIndicator = Component as typeof SvelteComponent<DropIndicatorProps & HTMLAttributes<DropIndicatorElement>>
