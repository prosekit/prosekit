import type { InlinePopoverProps as InlinePopoverElementProps } from '@prosekit/lit/inline-popover'
import type { SvelteComponent } from 'svelte'

import type { PropsWithClass } from '../types'

import InlinePopoverComponent from './inline-popover.gen.svelte'

export type InlinePopoverProps = PropsWithClass<InlinePopoverElementProps>

export const InlinePopover = InlinePopoverComponent as typeof SvelteComponent<any> as typeof SvelteComponent<InlinePopoverProps>
