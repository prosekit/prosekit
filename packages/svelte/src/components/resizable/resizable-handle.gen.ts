import type { ResizableHandleElement, ResizableHandleProps, ResizableHandleEvents } from '@prosekit/web/resizable'    
import type { SvelteComponent } from 'svelte'
import type { HTMLAttributes } from 'svelte/elements'

import type { CreateProps } from '../create-props'

import Component from './resizable-handle.gen.svelte'

export const ResizableHandle = Component as typeof SvelteComponent<Partial<CreateProps<ResizableHandleProps, ResizableHandleEvents>> & HTMLAttributes<ResizableHandleElement>>
