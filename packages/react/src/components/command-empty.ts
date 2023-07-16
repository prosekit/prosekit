/**
 * @module @prosekit/react/components/command-empty
 */

import '@prosekit/lit/components/command-empty'
import React, { ComponentType, createElement } from 'react'

export const CommandEmpty: ComponentType<{
  className?: string
  children: React.ReactNode
}> = ({ className, children }) => {
  return createElement('prosekit-command-empty', { class: className }, children)
}
