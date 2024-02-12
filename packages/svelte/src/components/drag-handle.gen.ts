import type { DragHandleProps as DragHandleElementProps } from '@prosekit/lit/drag-handle'
import type { SvelteComponent } from 'svelte'

import type { PropsWithClass } from '../types'

import DragHandleComponent from './drag-handle.gen.svelte'

export type DragHandleProps = PropsWithClass<DragHandleElementProps>

export const DragHandle = DragHandleComponent as typeof SvelteComponent<any> as typeof SvelteComponent<DragHandleProps>
