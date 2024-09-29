import type { TableHandleColumnTriggerElement, TableHandleColumnTriggerProps, TableHandleColumnTriggerEvents } from '@prosekit/web/table-handle'    
import type { SvelteComponent } from 'svelte'
import type { HTMLAttributes } from 'svelte/elements'

import type { CreateProps } from '../create-props'

import Component from './table-handle-column-trigger.gen.svelte'

export const TableHandleColumnTrigger = Component as typeof SvelteComponent<Partial<CreateProps<TableHandleColumnTriggerProps, TableHandleColumnTriggerEvents>> & HTMLAttributes<TableHandleColumnTriggerElement>>
