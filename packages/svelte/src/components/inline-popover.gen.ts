import type { InlinePopoverProps as InlinePopoverElementProps } from '@prosekit/lit/inline-popover'
import type { SvelteComponent } from 'svelte'

import InlinePopoverComponent from './inline-popover.gen.svelte'

export type InlinePopoverProps = {
  class?: string
} & InlinePopoverElementProps

export const InlinePopover = InlinePopoverComponent as typeof SvelteComponent<any> as typeof SvelteComponent<InlinePopoverProps>
