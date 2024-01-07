import type { ResizableProps as ResizableElementProps } from '@prosekit/lit/resizable'
import type { SvelteComponent } from 'svelte'

import type { PropsWithClass } from '../types'

import ResizableComponent from './resizable.gen.svelte'

export type ResizableProps = PropsWithClass<ResizableElementProps>

export const Resizable = ResizableComponent as typeof SvelteComponent<any> as typeof SvelteComponent<ResizableProps>
