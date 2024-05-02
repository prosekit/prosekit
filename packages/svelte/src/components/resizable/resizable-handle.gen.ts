import type { ResizableHandleProps } from '@prosekit/web/resizable'    
import type { SvelteComponent } from 'svelte'

import Component from './resizable-handle.gen.svelte'

export const ResizableHandle = Component as typeof SvelteComponent<any> as typeof SvelteComponent<Partial<ResizableHandleProps> & {class?: string}>
