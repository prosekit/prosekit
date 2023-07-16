import { createComponent } from '@lit-labs/react'
import type { SimplifyUnion } from '@prosekit/core'
import { CommandList as CommandListElement, type CommandListProps as CommandListElementProps } from '@prosekit/lit/components/command-list'
import React, { type ComponentType } from 'react'

export type CommandListProps = SimplifyUnion<{
  className?: string,
  children?: React.ReactNode,
} & CommandListElementProps>

const CommandListComponent = createComponent({
  tagName: 'prosekit-command-list',
  elementClass: CommandListElement,
  react: React,
  displayName: 'CommandListComponent',
})

export const CommandList: ComponentType<CommandListProps> = (props) => {
  return <CommandListComponent {...props} />  
}
