import type { TableHandleRowRootElement, TableHandleRowRootProps } from '@prosekit/web/table-handle'    
import type { SvelteComponent } from 'svelte'
import type { HTMLAttributes } from 'svelte/elements'

import Component from './table-handle-row-root.gen.svelte'

export const TableHandleRowRoot = Component as typeof SvelteComponent<Partial<TableHandleRowRootProps> & HTMLAttributes<TableHandleRowRootElement>>
