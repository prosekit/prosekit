import type { TableHandleColumnTriggerElement, TableHandleColumnTriggerProps } from '@prosekit/web/table-handle'    
import type { SvelteComponent } from 'svelte'
import type { HTMLAttributes } from 'svelte/elements'

import Component from './table-handle-column-trigger.gen.svelte'

export const TableHandleColumnTrigger = Component as typeof SvelteComponent<Partial<TableHandleColumnTriggerProps> & HTMLAttributes<TableHandleColumnTriggerElement>>
