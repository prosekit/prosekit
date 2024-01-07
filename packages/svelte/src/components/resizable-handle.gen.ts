import type { ResizableHandleProps as ResizableHandleElementProps } from '@prosekit/lit/resizable-handle'
import type { SvelteComponent } from 'svelte'

import type { PropsWithClass } from '../types'

import ResizableHandleComponent from './resizable-handle.gen.svelte'

export type ResizableHandleProps = PropsWithClass<ResizableHandleElementProps>

export const ResizableHandle = ResizableHandleComponent as typeof SvelteComponent<any> as typeof SvelteComponent<ResizableHandleProps>
