import type { TableHandleRootElement, TableHandleRootProps } from '@prosekit/web/table-handle'    
import type { SvelteComponent } from 'svelte'
import type { HTMLAttributes } from 'svelte/elements'

import Component from './table-handle-root.gen.svelte'

export const TableHandleRoot = Component as typeof SvelteComponent<Partial<TableHandleRootProps> & HTMLAttributes<TableHandleRootElement>>
