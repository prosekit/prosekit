import { createComponent } from '@lit-labs/react'
import type { SimplifyUnion } from '@prosekit/core'
import { CommandEmpty as CommandEmptyElement, type CommandEmptyProps as CommandEmptyElementProps } from '@prosekit/lit/components/command-empty'
import React, { type ComponentType } from 'react'

export type CommandEmptyProps = SimplifyUnion<{
  className?: string,
  children?: React.ReactNode,
} & CommandEmptyElementProps>

const CommandEmptyComponent = createComponent({
  tagName: 'prosekit-command-empty',
  elementClass: CommandEmptyElement,
  react: React,
  displayName: 'CommandEmptyComponent',
})

export const CommandEmpty: ComponentType<CommandEmptyProps> = (props) => {
  return <CommandEmptyComponent {...props} />  
}
