import type { CodeBlockMenuPopoverProps as CodeBlockMenuPopoverElementProps } from '@prosekit/lit/components/code-block-menu-popover'
import type { SvelteComponent } from 'svelte'

import CodeBlockMenuPopoverComponent from './code-block-menu-popover.gen.svelte'

export type CodeBlockMenuPopoverProps = {
  class?: string
} & CodeBlockMenuPopoverElementProps

export const CodeBlockMenuPopover = CodeBlockMenuPopoverComponent as typeof SvelteComponent<any> as typeof SvelteComponent<CodeBlockMenuPopoverProps>
