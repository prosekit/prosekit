/**
 * @module @prosekit/react/components/command-list
 */

import type { Editor } from '@prosekit/core'
import '@prosekit/lit/components/command-list'
import type { CommandList as CommandListElement } from '@prosekit/lit/components/command-list'
import React, {
  ComponentType,
  createElement,
  useLayoutEffect,
  useRef,
} from 'react'

export const CommandList: ComponentType<{
  editor: Editor
  className?: string
  children: React.ReactNode
}> = ({ editor, className, children }) => {
  const ref = useRef<CommandListElement | null>(null)

  useLayoutEffect(() => {
    const element = ref.current
    if (!element) return

    element.editor = editor
  }, [editor])

  return createElement(
    'prosekit-command-list',
    { ref, class: className },
    children,
  )
}
