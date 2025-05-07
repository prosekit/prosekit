import type { ResizableHandleElement, ResizableHandleProps as Props, ResizableHandleEvents as Events } from '@prosekit/web/resizable'    
import type { SvelteComponent } from 'svelte'
import type { HTMLAttributes } from 'svelte/elements'

import type { CreateProps } from '../create-props'

import Component from './resizable-handle.gen.svelte'

/**
 * Props for the {@link ResizableHandle} component.
 */
export interface ResizableHandleProps extends Partial<CreateProps<Props, Events>> {}

export const ResizableHandle = Component as typeof SvelteComponent<ResizableHandleProps & HTMLAttributes<ResizableHandleElement>>
