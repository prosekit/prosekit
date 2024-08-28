import type { TableHandleColumnRootElement, TableHandleColumnRootProps } from '@prosekit/web/table-handle'    
import type { SvelteComponent } from 'svelte'
import type { HTMLAttributes } from 'svelte/elements'

import Component from './table-handle-column-root.gen.svelte'

export const TableHandleColumnRoot = Component as typeof SvelteComponent<Partial<TableHandleColumnRootProps> & HTMLAttributes<TableHandleColumnRootElement>>
