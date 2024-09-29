import type { TableHandleRowTriggerElement, TableHandleRowTriggerProps, TableHandleRowTriggerEvents } from '@prosekit/web/table-handle'    
import type { SvelteComponent } from 'svelte'
import type { HTMLAttributes } from 'svelte/elements'

import type { CreateProps } from '../create-props'

import Component from './table-handle-row-trigger.gen.svelte'

export const TableHandleRowTrigger = Component as typeof SvelteComponent<Partial<CreateProps<TableHandleRowTriggerProps, TableHandleRowTriggerEvents>> & HTMLAttributes<TableHandleRowTriggerElement>>
