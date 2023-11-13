/** @jsxImportSource solid-js */

import type { ParentProps } from 'solid-js'

export default function ToggleButton({
  active,
  available,
  onChange,
  children,
}: ParentProps<{
  active?: boolean
  available: boolean
  onChange: () => void
}>) {
  return (
    <button
      data-state={active ? 'on' : 'off'}
      onMouseDown={(event) => event.preventDefault()}
      onClick={() => onChange()}
      disabled={!available}
      class="TOGGLE_BUTTON"
    >
      {children}
    </button>
  )
}
