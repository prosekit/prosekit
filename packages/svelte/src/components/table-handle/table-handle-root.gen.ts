import type { TableHandleRootElement, TableHandleRootProps, TableHandleRootEvents } from '@prosekit/web/table-handle'    
import type { SvelteComponent } from 'svelte'
import type { HTMLAttributes } from 'svelte/elements'

import type { CreateProps } from '../create-props'

import Component from './table-handle-root.gen.svelte'

export const TableHandleRoot = Component as typeof SvelteComponent<Partial<CreateProps<TableHandleRootProps, TableHandleRootEvents>> & HTMLAttributes<TableHandleRootElement>>
