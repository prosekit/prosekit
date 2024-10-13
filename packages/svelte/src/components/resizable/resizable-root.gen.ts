import type { ResizableRootElement, ResizableRootProps as Props, ResizableRootEvents as Events } from '@prosekit/web/resizable'    
import type { SvelteComponent } from 'svelte'
import type { HTMLAttributes } from 'svelte/elements'

import type { CreateProps } from '../create-props'

import Component from './resizable-root.gen.svelte'

/**
 * Props for the {@link ResizableRoot} component.
 */
export interface ResizableRootProps extends Partial<CreateProps<Props, Events>> {}

export const ResizableRoot = Component as typeof SvelteComponent<ResizableRootProps & HTMLAttributes<ResizableRootElement>>
