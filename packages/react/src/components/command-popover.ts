/**
 * @module @prosekit/react/components/command-popover
 */

import '@prosekit/lit/components/command-popover'
import type { Editor } from '@prosekit/core'
import type {
  CommandPopover as CommandPopoverElement,
  QueryBuilder,
} from '@prosekit/lit/components/command-popover'
import React, {
  ComponentType,
  createElement,
  useLayoutEffect,
  useRef,
} from 'react'

export const CommandPopover: ComponentType<{
  editor: Editor
  regex: RegExp
  regexAfter?: RegExp
  queryBuilder: QueryBuilder
  className?: string
  children: React.ReactNode
}> = ({ editor, regex, regexAfter, queryBuilder, className, children }) => {
  const ref = useRef<CommandPopoverElement | null>(null)

  useLayoutEffect(() => {
    const element = ref.current
    if (!element) return

    element.editor = editor
    element.regex = regex
    element.regexAfter = regexAfter ?? null
    element.queryBuilder = queryBuilder
  }, [editor, queryBuilder, regex, regexAfter])

  return createElement(
    'prosekit-command-popover',
    { ref, class: className },
    children,
  )
}
