import type { SvelteComponent } from 'svelte'

import type { ResizableHandleProps } from '@prosekit/primitives/resizable'
import type { ResizableRootProps } from '@prosekit/primitives/resizable'
import { ResizableHandleComponent } from './resizable-handle.gen.svelte'
import { ResizableRootComponent } from './resizable-root.gen.svelte'

export const ResizableHandle = ResizableHandleComponent as typeof SvelteComponent<any> as typeof SvelteComponent<Partial<ResizableHandleProps> & {class?: number}>
export const ResizableRoot = ResizableRootComponent as typeof SvelteComponent<any> as typeof SvelteComponent<Partial<ResizableRootProps> & {class?: number}>