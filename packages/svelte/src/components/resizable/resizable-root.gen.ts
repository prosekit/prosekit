import type { ResizableRootElement, ResizableRootProps, ResizableRootEvents } from '@prosekit/web/resizable'    
import type { SvelteComponent } from 'svelte'
import type { HTMLAttributes } from 'svelte/elements'

import type { CreateProps } from '../create-props'

import Component from './resizable-root.gen.svelte'

export const ResizableRoot = Component as typeof SvelteComponent<Partial<CreateProps<ResizableRootProps, ResizableRootEvents>> & HTMLAttributes<ResizableRootElement>>
