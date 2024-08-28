import type { TableHandleRowTriggerElement, TableHandleRowTriggerProps } from '@prosekit/web/table-handle'    
import type { SvelteComponent } from 'svelte'
import type { HTMLAttributes } from 'svelte/elements'

import Component from './table-handle-row-trigger.gen.svelte'

export const TableHandleRowTrigger = Component as typeof SvelteComponent<Partial<TableHandleRowTriggerProps> & HTMLAttributes<TableHandleRowTriggerElement>>
