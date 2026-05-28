'use client'

import type { ReactNodeViewProps } from '@prosekit/react-binding'
import { useEffect, useState } from 'react'

export function InputBlockView(props: ReactNodeViewProps) {
  const value = String(props.node.attrs.value ?? '')

  return (
    <label
      data-input-block-view="react-binding"
      className="my-4 flex flex-col gap-2 rounded-lg border border-black/10 bg-white p-3 shadow-sm"
    >
      <span className="text-sm font-medium">`react-binding` node view</span>
      <input
        data-testid="react-binding-input-view-input"
        className="rounded border px-3 py-2"
        onKeyDown={(event) => {
          if (event.key === 'Escape') {
            event.currentTarget.blur()
          }
        }}
        value={value}
        onChange={(event) => {
          const nextValue = event.currentTarget.value
          // setDraft(nextValue)
          props.setAttrs({ value: nextValue })
        }}
        onMouseDown={(event) => {
          event.stopPropagation()
        }}
        onInput={(event) => {
          event.stopPropagation()
        }}
      />
      <span className="text-xs text-neutral-600">
        attrs.value: {value}
      </span>
    </label>
  )
}
