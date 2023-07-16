import { createComponent } from '@lit-labs/react'
import type { SimplifyUnion } from '@prosekit/core'
import { CommandPopover as CommandPopoverElement, type CommandPopoverProps as CommandPopoverElementProps } from '@prosekit/lit/components/command-popover'
import React, { ComponentType } from 'react'

export type CommandPopoverProps = SimplifyUnion<{
  className?: string,
  children?: React.ReactNode,
} & CommandPopoverElementProps>

const CommandPopoverComponent = createComponent({
  tagName: 'prosekit-command-popover',
  elementClass: CommandPopoverElement,
  react: React,
  displayName: 'CommandPopoverComponent',
})

export const CommandPopover: ComponentType<CommandPopoverProps> = (props) => {
  return <CommandPopoverComponent {...props} />  
}
