import { createComponent } from '@lit-labs/react'
import type { SimplifyUnion } from '@prosekit/core'
import { CommandItem as CommandItemElement, type CommandItemProps as CommandItemElementProps } from '@prosekit/lit/components/command-item'
import React, { ComponentType } from 'react'

export type CommandItemProps = SimplifyUnion<{
  className?: string,
  children?: React.ReactNode,
} & CommandItemElementProps>

const CommandItemComponent = createComponent({
  tagName: 'prosekit-command-item',
  elementClass: CommandItemElement,
  react: React,
  displayName: 'CommandItemComponent',
})

export const CommandItem: ComponentType<CommandItemProps> = (props) => {
  return <CommandItemComponent {...props} />  
}
