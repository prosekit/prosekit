import type { ResizableRootElement, ResizableRootProps } from '@prosekit/web/resizable'    
import type { SvelteComponent } from 'svelte'
import type { HTMLAttributes } from 'svelte/elements'

import Component from './resizable-root.gen.svelte'

export const ResizableRoot = Component as typeof SvelteComponent<Partial<ResizableRootProps> & HTMLAttributes<ResizableRootElement>>
