import type { ResizableRootProps } from '@prosekit/web/resizable'    
import type { SvelteComponent } from 'svelte'

import Component from './resizable-root.gen.svelte'

export const ResizableRoot = Component as typeof SvelteComponent<any> as typeof SvelteComponent<Partial<ResizableRootProps> & {class?: string}>
