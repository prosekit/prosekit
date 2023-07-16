/**
 * @module @prosekit/react/components/command-item
 */

import '@prosekit/lit/components/command-item'

import type { CommandItem as CommandItemElement } from '@prosekit/lit/components/command-item'
import React, {
  ComponentType,
  createElement,
  useLayoutEffect,
  useRef,
} from 'react'

export const CommandItem: ComponentType<{
  onSelect: () => void
  className?: string
  children: React.ReactNode
}> = ({ onSelect, className, children }) => {
  const ref = useRef<CommandItemElement | null>(null)

  useLayoutEffect(() => {
    const element = ref.current
    if (!element) {
      return
    }
    element.onSelect = onSelect
  }, [onSelect])

  return createElement(
    'prosekit-command-item',
    { ref, class: className },
    children,
  )
}
