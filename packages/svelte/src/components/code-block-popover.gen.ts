import type { CodeBlockPopoverProps as CodeBlockPopoverElementProps } from '@prosekit/lit/code-block-popover'
import type { SvelteComponent } from 'svelte'

import CodeBlockPopoverComponent from './code-block-popover.gen.svelte'

export type CodeBlockPopoverProps = {
  class?: string
} & CodeBlockPopoverElementProps

export const CodeBlockPopover = CodeBlockPopoverComponent as typeof SvelteComponent<any> as typeof SvelteComponent<CodeBlockPopoverProps>
