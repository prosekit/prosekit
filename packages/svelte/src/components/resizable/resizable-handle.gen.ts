import type { ResizableHandleElement, ResizableHandleProps } from '@prosekit/web/resizable'    
import type { SvelteComponent } from 'svelte'
import type { HTMLAttributes } from 'svelte/elements'

import Component from './resizable-handle.gen.svelte'

export const ResizableHandle = Component as typeof SvelteComponent<Partial<ResizableHandleProps> & HTMLAttributes<ResizableHandleElement>>
