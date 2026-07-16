'use client'

import type { ReactNodeViewProps } from 'prosekit/react'

export function NestedEditableView(props: ReactNodeViewProps) {
  return (
    <div data-testid="nested-editable" style={{ border: '1px solid currentColor', padding: '0.75rem' }}>
      <div contentEditable={false}>
        <button type="button">Non-editable NodeView control</button>
      </div>
      <div ref={props.contentRef}></div>
    </div>
  )
}
